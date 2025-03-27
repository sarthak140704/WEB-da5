import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

// Admin routes
router.post('/admin/login', AuthController.adminLogin);

// Student routes
router.post('/student/login', AuthController.studentLogin);

// Common routes
router.post('/logout', AuthController.logout);
router.get('/check-auth', AuthController.checkAuth);

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Example of protected route
router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.session.user });
});

export default router;