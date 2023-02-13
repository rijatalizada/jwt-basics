require("dotenv").config();
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;
  if (!authorizationHeaders || !authorizationHeaders.startsWith("Bearer")) {
    throw new UnauthenticatedError("Bearer token does not provided ");
  }

  try {
    const token = authorizationHeaders.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;

    req.user = { id, username };
    next();
  } catch (error) {
    throw new Error('Not authorized to acces to access this route"');
  }
};

module.exports = authMiddleware;
