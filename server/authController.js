const bcrypt = require('bcryptjs');
let loggedInUser = {email: '', profile_pic: ''}

module.exports = {
    register: async(req, res) => {
        const {email, password, profile_pic} = req.body;
        loggedInUser.email = email;
        loggedInUser.profile_pic = profile_pic;
        const db = req.app.get('db');
        const {session} = req;

        let user = await db.check_user(email);
        user = user[0];
        if(user){
            return res.status(409).send('Email already exists');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        let newUser = await db.register_user(email, hash, profile_pic);
        newUser = newUser[0];
        // delete newUser.password; - if the db is returning the password
        session.user = newUser;
        loggedInUser = session.user;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password, profile_pic} = req.body;
        loggedInUser.email = email;
        loggedInUser.profile_pic = profile_pic;
        const db = req.app.get('db');
        const {session} = req;

        let user = await db.check_user(email);
        user = user[0];
        
        if(!user){
            return res.status(401).send('Email not found');
        }
        
        const authenticated = bcrypt.compareSync(password, user.password);
            
        if(authenticated){
            delete user.password;
            session.user = user;
            loggedInUser = session.user;
            res.status(202).send(session.user);
        } else {
            res.status(401).send("Incorrect Password");
        }
    },
    getUser: (req, res) => {
        res.status(200).send(loggedInUser)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}