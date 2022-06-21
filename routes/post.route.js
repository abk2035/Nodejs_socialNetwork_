const router=require('express').Router();
const postController = require('../controllers/post.controller');
const uploadController = require('../controllers/upload.controller')

router.get('/', postController.readPost);
router.post('/', uploadController.uploadPost, postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// comment post
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);





module.exports= router;