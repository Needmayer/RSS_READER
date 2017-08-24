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
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    categories: [{
        category_title: String,
        category_urls: Array
    }]
});

userSchema.pre("save", function(next){

    bcrypt.hash(this.password, 16.5, (err, hash) => {
        if(err){
            next(err);
            return;
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.passwordIsValid = function(password, callback){
    bcrypt.compare(password, this.password, function(err, result){
        if(err){
            callback(false);
            return;
        }
        callback(null, result);
    });
};

export {userSchema as userSchema};