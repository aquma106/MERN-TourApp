import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
const router = express.Router()

//update new user
router.put("/:id", verifyUser, updateUser);

//delete new user
router.delete("/:id",verifyUser, deleteUser);

//get singel new user
router.get("/:id", verifyUser, getSingleUser);

//get all new user
router.get("/",verifyAdmin, getAllUser);
export default router