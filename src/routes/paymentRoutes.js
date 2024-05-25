import express from "express";
import { PaymentController } from "../controller/PaymentController.js";

const router = express.Router();
const paymentController = new PaymentController();

router.post("/webhook", paymentController.webhookKirvano);

export default router;