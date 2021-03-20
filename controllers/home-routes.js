// contain all user facing routes such as homepage and login
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      res.render('homepage', dbPostData[0].get({ plain: true }));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  

module.exports = router;
