import express from "express";
import { getAccounts, createAccount, deleteAccount, updateAccount, getAccount } from "../controllers/accounts.js";

const account = express.Router();

account.get("/:userName", getAccounts);
account.get("/:userName/:name", getAccount);
account.post("/", createAccount);
account.delete("/:id", deleteAccount);
account.put("/:id", updateAccount);

export default account;