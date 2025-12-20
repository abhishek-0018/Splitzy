import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, createJoiningRequest, getJoinedGroups, getGroup, handleJoiningRequest, addPayment } from "../controllers/group.controller.js";

const router=Router()

router.route("/createGroup").post(verifyJWT,createGroup)
router.route("/createJoiningRequest").post(verifyJWT,createJoiningRequest);
router.route("/getJoinedGroups").get(verifyJWT,getJoinedGroups);
router.route("/getGroup").get(getGroup);
router.route("/handleJoiningRequest").post(verifyJWT,handleJoiningRequest);
router.route("/addPayment").post(verifyJWT,addPayment);

export default router