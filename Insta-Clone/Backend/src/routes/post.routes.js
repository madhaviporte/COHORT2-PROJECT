const express = require("express")
const postRouter = express.Router() 
const postController = require("../constrollers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middlewear")

//@routes POST/api/posts/[protected]
//req.body = {caption, image-file}

postRouter.post("/",upload.single("image"), identifyUser , postController.createPostController)


//@routes GET /api/posts/[protected]
//@description Get all the posts created by the user that the request come from. all

postRouter.get("/",identifyUser, postController.getPostController)


// @routes GET/api/post/details/:postId
// @description return an detail about specific post with the id. also check wheather the post belongs to the user

postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)


//@routes POST/api/posts/like/:postid
//@description like a post with the id provided in the request params
postRouter.post("/like/:postId",identifyUser,postController.likePostController)
postRouter.post("/unlike/:postId",identifyUser,postController.unLikePostController)


//@route GET/api/posts/feed
//@description gget all the post created in the DB
//@access private
postRouter.get("/feed", identifyUser, postController.getFeedController)


module.exports = postRouter 