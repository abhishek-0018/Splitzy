import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGroup } from "../controllers/group.controller.js";

const router=Router()

router.route("/createGroup").post(verifyJWT,createGroup)

export default router