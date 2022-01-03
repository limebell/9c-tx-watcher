import { Router } from "express";
import { getAddresses, getNextNonce, getTransactions } from "./Transactions";

// User-route
const transactionRouter = Router();
transactionRouter.get("/addresses", getAddresses);
transactionRouter.get("/nonce", getNextNonce);
transactionRouter.get("/all", getTransactions);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/transactions", transactionRouter);
export default baseRouter;
