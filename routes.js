const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./Model/User');
const Organization = require('./Model/Organization');

const router = express.Router();

// Create a new user
router.post('/users/register', async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword,role });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Login User
router.post('/users/login', async (req, res) => {
    const { email,password } = req.body;
    try {
      const user = await User.findOne({email: email});
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
 
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const body = { _id: user._id, email: user.email, name: user.name, role: user.role, id:user.id };
      const token = jwt.sign(
        { user: body },
          process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.send({token:token});
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
});

const users = [];  
module.exports = { router, users };