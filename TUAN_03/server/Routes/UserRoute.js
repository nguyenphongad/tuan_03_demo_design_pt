const express  = require('express');
const authMiddleWare = require('../MiddleWare/AuthMiddleWare');
const { getUser, getAllUsers, deleteUser,updateUser, followUser, unFollowUser } = require('../Controller/UserController');

const router = express.Router()

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", authMiddleWare, updateUser);
router.delete(":id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unFollowUser);


module.exports = router;
