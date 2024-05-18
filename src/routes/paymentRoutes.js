import express from "express";
import { PaymentController } from "../controller/PaymentController";

const router = express.Router();
const paymentController = new PaymentController();

router.post("/webhook", paymentController.webhookGeneric);

export default router;