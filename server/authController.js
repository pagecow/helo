const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password, profile_pic} = req.body;
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
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        console.log(req.body)
        const {email, password} = req.body;
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
            res.status(202).send(session.user);
        } else {
            res.status(401).send("Incorrect Password");
        }
    },
    getUser: (req, res) => {
        const {user} = req.session;
        if(user){
            res.status(200).send(user)
        } else {
            res.status(500).send('User not on session');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}