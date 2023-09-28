// ErrorHandler.js
const ErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
      }
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
      
      // Send an error response to the client
      res.status(statusCode).json({ error: message });
}

module.exports = ErrorHandler