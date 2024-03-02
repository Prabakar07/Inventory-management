const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Attach the decoded token to the request for further use
    req.decodedToken = decodedToken;

    next();
  });
};

const isAdmin = (req, res, next) => {
  // Check if the decoded token exists and if the role is 'admin'
  if (req.decodedToken && req.decodedToken.role === 'admin'||'manager') {
    next();
  } else {
    res.status(403).json({ error: 'Permission Denied: Not an admin' });
  }
};

module.exports = {
  authenticateToken,
  isAdmin,
};
