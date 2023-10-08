const rateLimit = require('express-rate-limit');

// Rate limiting for rate-limiting mechanism to restrict clients from making too many requests in a short period
const Limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 25, // Max 25 requests per IP per hour
  message:
    "Too many attempts from this IP. Please wait for 1 hour and then try again.",
});


module.exports = {Limiter};
