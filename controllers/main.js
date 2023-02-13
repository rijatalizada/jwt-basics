require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  try {
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    
    return res.status(201).json({
      msg: "token created",
      token,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const dashboard = async (req, res) => {
  const user = req.user;

  const luckyNum = Math.floor(Math.random() * 100);
  return res.status(200).json({
    msg: `Hello, ${user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNum}`,
  });
};

module.exports = {
  login,
  dashboard,
};
