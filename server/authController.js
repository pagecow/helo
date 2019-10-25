const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.check_email(email)
        foundUser = foundUser[0];
        if(foundUser){
            return res.status(409).send('Email already exists');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        let newUser = await db.register({email, password: hash});
        newUser = newUser[0];
        let accountBalance = await db.create_account(newUser.bank_user_id);
        accountBalance = accountBalance[0].account_balance;
        req.session.user = {...newUser, accountBalance};
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.check_email(email);
        foundUser = foundUser[0];
        if(!foundUser){
            res.status(401).send('Email does not exist')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.bank_user_password)

        if(authenticated){
            delete foundUser.bank_user_password;
            req.session.user = foundUser;
            res.status(202).send(req.session.user)
        } else {
            res.status(401).send('Password is incorrect')
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session_user)
        }
    },
}