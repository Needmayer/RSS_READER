import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    categories: [],
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.pre("save", function (next) {

    bcrypt.hash(this.password, 5, (err, hash) => {
        if (err) {
            next(err);
            return;
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.passwordIsValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

export { userSchema as userSchema };



let loginSchema = mongoose.Schema({
    identityKey: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    failedAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    timeout: {
        type: Date,
        required: true,
        default: Date.now
    },
    inProgress: {
        type: Boolean
    }
});

loginSchema.statics.canAuthenticate = async function (key) {
    const login = await this.findOne({ identityKey: key });
    if (!login || login.failedAttempts < 5) {
        return true;
    }
    const timeout = new Date() - addMinutes(new Date(login.timeout), 1);
    if (timeout >= 0) {
        await login.remove();
        return true;
    }
    return false;
};

loginSchema.statics.failedLoginAttempt = async function (key) {
    const query = { identityKey: key };
    const update = { $inc: { failedAttempts: 1 }, timeout: new Date(), inProgress: false };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    return await this.findOneAndUpdate(query, update, options).exec();
};

loginSchema.statics.succesfulLoginAttempt = async function (key) {
    const login = await this.findOne({ identityKey: key });
    if (login) {
        return await login.remove();
    }
};

loginSchema.statics.inProgress = async function (key) {
    const login = await this.findOne({ identityKey: key });
    const query = { identityKey: key };
    const update = { inProgress: true };
    const options = { upsert: true, setDefaultsOnInsert: true };
    await this.findOneAndUpdate(query, update, options, ).exec();
    return (login && login.inProgress);
};

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}



export { loginSchema as loginSchema };
