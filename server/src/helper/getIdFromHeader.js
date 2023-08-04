const jwt = require('jsonwebtoken');

const getIdFromHeader = (header) => {
  if (!header) return Error('No header provided');
  const decoded = jwt.verify(header, process.env.JWT_SECRET);
  return decoded.id;
};

module.exports = { getIdFromHeader };
