import express from "express"
import {protect} from "../middlewares/authMiddleware.js"

import {
getBalance,
transfer,
statement
} from "../controllers/accountController.js"

const router = express.Router()

router.get("/balance",protect,getBalance)
router.post("/transfer",protect,transfer)
router.get("/statement",protect,statement)

export default router