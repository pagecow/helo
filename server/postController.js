module.exports = {
    createPost: (req, res) => {
        console.log(req.body)
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
    }
}