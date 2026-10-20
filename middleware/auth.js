const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access denied. No authorization token provided.' });
  }

  const token = authHeader.replace(/^Bearer\s+/, '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_ndassb_jwt_key_2026_defense_academy');
    req.admin = decoded;
    next();
  } catch (ex) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};
