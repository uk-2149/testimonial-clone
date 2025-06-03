import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TestUserModel from "../models/Test-user.model"; // Adjust the path and interface as per your project

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

async function handleRegister(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<any> {
  const { name, email, password } = req.body;

  try {
    let user = await TestUserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "TestUserModel already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new TestUserModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "cutittestimonialjwt",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}


async function handleLogin(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<any> {
  const { email, password } = req.body;
  try {
    const user = await TestUserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Inavlid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "cutittestimonialjwt", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { handleLogin, handleRegister };
