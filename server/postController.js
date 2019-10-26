module.exports = {
    createPost: (req, res) => {
        const {post_title, post_image, post_content} = req.body
        const db = req.app.get('db');

        let createdPost = db.create_post(post_title, post_image, post_content)
        
        res.status(200).send(createdPost) 
    },
    getPost: (req, res) => {
        const db = req.app.get('db');
        
        db.get_posts()
            .then(results => res.status(200).send(results))
            .catch(err => console.log(err))
    },
    delete: (req, res) => {
        
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id)
        
        db.delete_post(id)
            .then(results => res.status(200).send(results))
            .catch(err => console.log(err))
        
    }
}