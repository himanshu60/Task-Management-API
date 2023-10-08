const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (decoded) {
          const userID = decoded.userID;
          req.body.userID = userID;
          next();
        } else {
          return res
            .status(401)
            .json({ message: "Invalid Token", error: err.message });
        }
      });
    } else {
      return res.status(503).json({ error: "Please Login First" });
    }
  } catch (error) {
    return res
      .status(502)
      .json({ error: `Error in Authenticating: ${error.message}` });
  }
};

module.exports = { auth };
