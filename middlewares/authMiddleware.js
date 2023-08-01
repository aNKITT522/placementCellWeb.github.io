// authMiddleware.js
function isAuthenticated(req, res, next) {
    // Check if the user is authenticated (e.g., by checking session, tokens, etc.)
    if (req.session && req.session.user) {
      // User is authenticated, proceed to the next middleware/route handler
      return next();
    }
  
    // User is not authenticated, redirect to the login page or send an error response
    res.redirect('/login'); // Or res.status(401).send('Unauthorized') if you prefer sending an error response.
  }
  
  module.exports = isAuthenticated;
  