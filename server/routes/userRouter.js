import express from 'express';

let userRouter = function (User) {
    const userRouter = express.Router();

    userRouter.route("/:username")
        .get(function (req, res) {
            const { username, password } = req.body;
            if(!username || !password){
                return res.status(404).send("Username and password is required");                
            }
            User.findOne({ username: username}, function(err, user){
                if(err || !user){
                  return res.send({});    
                }else{
                  let resultUser = new User(user);
                  resultUser.passwordIsValid(password, function(err, result){
                    if(err){
                      return res.send({});    
                    }else if(!result){
                      return res.send({});    
                    }    
                    const userInfo = {
                      username: user.username,
                      categories: user.categories
                    };
                    return res.status(200).send(JSON.stringify(userInfo));
                  });
                }
              });


        })

}

export default userRouter;

app.post('/api/login', function (req, res) {
    
    
   
  });