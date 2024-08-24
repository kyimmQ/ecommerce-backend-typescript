"use strict";
import express from "express";
import accessRouter from "./access";
import { checkApiKey, checkPermission } from "../auth/checkAuth.middleware";

const router = express.Router();

// check apiKey ?
// router.use(checkApiKey);
// check permission
// router.use(checkPermission("0000"));

router.use("/v1/api", accessRouter);

export default router;
