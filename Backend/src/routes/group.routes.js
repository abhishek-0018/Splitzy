import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup, createJoiningRequest, getJoinedGroups, getGroup } from "../controllers/group.controller.js";

const router=Router()

router.route("/createGroup").post(verifyJWT,createGroup)
router.route("/createJoiningRequest").post(verifyJWT,createJoiningRequest);
router.route("/getJoinedGroups").get(verifyJWT,getJoinedGroups);
router.route("/getGroup").get(getGroup);

export default router