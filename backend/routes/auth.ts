import express from "express"; 
const router = express.Router();
import { handleLogin, handleRegister }  from "../controllers/handleAuth";

router.post("/register", handleRegister);

router.post("/login", handleLogin);

export default router;
