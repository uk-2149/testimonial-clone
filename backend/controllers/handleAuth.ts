import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import TestUserModel from "../models/Test-user.model";

async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  try {
    let user = await TestUserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "TestUserModel already exists" });

    user = new TestUserModel({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "cutittestimonialjwt", {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleLogin(req, res) {
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
