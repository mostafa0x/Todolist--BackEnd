const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token Not Found Plz Login !");
  }

  jwt.verify(token, process.env.key, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token Not working !");
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
