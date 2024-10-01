const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ username: email }); 

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role); 
      // console.log("Generated Token:", token); 
      return res.json({ 
        _id: user._id,
        username: user.username, 
        role: user.role,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' }); 
  }
};
