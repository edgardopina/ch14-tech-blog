//! *****************************************************************************************
//! This file will contain all of the user-facing routes, such as the homepage and login page
//! *****************************************************************************************
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//! GET all posts
router.get('/', (req, res) => {
   //* Previously, we used res.send() or res.sendFile() for the response. Because we've hooked up a template
   //* engine, we can now use res.render() and specify which template we want to use.
   //* res.render('homepage');

   Post.findAll({
      attributes: ['id', 'post_content', 'title', 'created_at'],
      include: [
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username'],
            },
         },
         {
            model: User,
            attributes: ['username'],
         },
      ],
   })
      .then(dbPostData => {
         // .get({ plain:true }) - serialize data and removes unnecessary attributes
         const posts = dbPostData.map(post => post.get({ plain: true })); // posts - full array of posts data

         //! wrap the array posts and pass it as an object to be able to add more properties to the template later
         res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            headerBox: 'The Tech Blog',
         });
      })
      .catch(err => {
         console.error(err);
         res.status(500).json(err);
      });
});

//! renders login page
router.get('/login', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }
   res.render('login'); // we do not need any variables to pass as variables in 2nd parameter
});

//! renders sign-up page
router.get('/signup', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/logout');
      return;
   }
   res.render('signup'); // we do not need any variables to pass as variables in 2nd parameter
});

//! GET one post
router.get('/post/:id', (req, res) => {
   Post.findOne({
      where: {
         id: req.params.id,
      },
      attributes: ['id', 'post_content', 'title', 'created_at'],
      include: [
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username'],
            },
         },
         {
            model: User,
            attributes: ['username'],
         },
      ],
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
         }

         const post = dbPostData.get({ plain: true }); // serialize the data
         //! pass data to template; loggedIN session variable to control what elements render and which ones not
         res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            headerBox: 'The Tech Blog',
         });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
