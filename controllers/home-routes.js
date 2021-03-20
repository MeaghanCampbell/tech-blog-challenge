// contain all user facing routes such as homepage and login
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.session);
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
      // plain: true serializes the data, so we only get the properties we need
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});
  

module.exports = router;
