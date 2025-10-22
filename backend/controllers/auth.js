const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Register attempt:', { name, email, role, password });
  if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
  const existing = await userModel.findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'Email exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  await userModel.createUser({ name, email, passwordHash, role });
  console.log('User registered:', email);
  res.status(201).json({ message: 'Registered' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });
  const user = await userModel.findUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    console.log('Login failed for:', email);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('Login successful for:', email);
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};

module.exports = { register, login };