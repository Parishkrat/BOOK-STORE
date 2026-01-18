export const authorizeroles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user comes from isAuthenticated middleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};
