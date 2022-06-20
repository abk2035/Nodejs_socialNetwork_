const router=require('express').Router();

const authController =require('../controllers/authController');
const userController=require('../controllers/userController');
const uploadController= require('../controllers/upload.controller.js'); 


// auth
router.post('/register',authController.signUp);
router.post('/login',authController.signIn);
router.get('/logout',authController.logout);

//user display 
router.get('/',userController.getAllUsers);
router.get('/:id',userController.userInfo);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

 
// upload
router.post("/upload",uploadController.uploadProfil,uploadController.uploadImageInDB);

 


module.exports =router;
