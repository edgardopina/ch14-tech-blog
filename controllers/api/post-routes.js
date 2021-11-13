const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts - GET ALL POSTS
router.get('/', (req, res) => {
   Post.findAll({
      attributes: [
         'id',
         'post_content',
         'title',
         'created_at',
      ],
      order: [['created_at', 'DESC']], // NEWEST POSTS AT THE TOP
      //! this include is a LEFT OUTER JOIN, it joins post with comment
      include: [
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //! this include is a LEFT OUTER JOIN, it joins comment with user
            include: {
               model: User,
               attributes: ['username'],
            },
         },
         //! this include is a LEFT OUTER JOIN, it joins post with user
         {
            model: User,
            attributes: ['username'],
         },
      ],
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET /api/posts/1 - GET ONE POST
router.get('/:id', (req, res) => {
   Post.findOne({
      where: {
         id: req.params.id,
      },
      attributes: [
         'id',
         'post_comntent ',
         'title',
         'created_at',
      ],
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
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/posts - CREATE ONE POST
router.post('/', withAuth, (req, res) => {
   Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});


// PUT /api/posts/1 - UPDATE ONE POST
router.put('/:id', withAuth, (req, res) => {
   Post.update(
      {
         title: req.body.title,
         post_content: req.body.post_content,
      },
      {
         where: {
            id: req.params.id,
         },
      }
   )
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE /api/posts/1 - DELETE ONE POST
router.delete('/:id', withAuth, (req, res) => {
   Post.destroy({
      where: {
         id: req.params.id,
      },
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
