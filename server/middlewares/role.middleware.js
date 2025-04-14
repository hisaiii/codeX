export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user?.role) {
        return res.status(403).json({ message: "No role assigned" });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: `Forbidden. Required roles: ${allowedRoles.join(', ')}`
        });
      }
  
      next();
    };
  };
  
  // Optional: Keep these for backward compatibility
  export const isUser = authorizeRole('user');
  export const isAuthority = authorizeRole('authority');
  export const isAdmin = authorizeRole('admin');