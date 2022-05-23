const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'title',
        'post_body'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        //get full list of posts
        const rawPosts = dbPostData.map(post => post.get({ plain: true }));
        //reverse the posts, so that the newest posts display first
        const posts = rawPosts.reverse();
        //render the homepage
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })


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
// router.get('/', (req, res) => {

//     res.render('homepage')
// })

module.exports = router;
