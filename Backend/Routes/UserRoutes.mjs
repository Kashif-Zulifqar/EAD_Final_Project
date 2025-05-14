import express from "express";
import {
  Signup,
  Signin,
  getUser,
  GetAllUsers,
  deleteUser,
  updateUser,
} from "../Controller/User.Controller.mjs";
// import authMiddleware from "../authMiddleware.mjs";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/findUsers", GetAllUsers);
router.delete("/deleteUser", deleteUser);
router.patch("/updateUser", updateUser);
router.get("/:email", getUser);

export default router;
