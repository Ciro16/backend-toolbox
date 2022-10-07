import express from "express";
const router = express.Router();

import fileController from '../../controllers/fileController.js'

router
  .get("/", fileController.getAllFiles);

export default router;
