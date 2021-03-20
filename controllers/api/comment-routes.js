const router = require('express').Router();
const { Comment } = require('../../models');


// get all comments
router.get('/', (req, res) => {

});


// post a comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


// delete a comment
router.delete('/:id', (req, res) => {

});

module.exports = router