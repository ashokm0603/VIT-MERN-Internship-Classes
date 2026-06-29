const jwt = require("jsonwebtoken");

const verifiedUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No Token Found" });
    }
    console.log(token);
    const decoded = await jwt.verify(token, process.env.secret_key);

    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "Token Still Not Active" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid Token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "token expired" });
    }
    res.status(500).json({message:"Token Not found"})
  }
};

module.exports = verifiedUser;
