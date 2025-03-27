// controllers/authController.js
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import bcrypt from 'bcrypt'; // For password hashing

class AuthController {
  // Admin Login
  static async adminLogin(req, res) {
    try {
      const { employee_id, password } = req.body;
      
      // Find admin
      const admin = await Admin.findByEmployeeId(employee_id);
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password (assuming passwords are hashed)
      const isMatch = await bcrypt.compare(password, admin.admin_password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Set session
      req.session.user = {
        id: admin.id,
        type: 'admin',
        employee_id: admin.employee_id,
        name: admin.admin_name
      };

      res.json({ message: 'Admin logged in successfully', user: req.session.user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Student Login
  static async studentLogin(req, res) {
    try {
      const { reg_no, password } = req.body;
      
      // Find student
      const student = await Student.findByRegNo(reg_no);
      if (!student) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, student.student_password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Set session
      req.session.user = {
        id: student.id,
        type: 'student',
        reg_no: student.reg_no,
        name: student.student_name
      };

      res.json({ message: 'Student logged in successfully', user: req.session.user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Logout (common for both admin and student)
  static async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Default session cookie name
        res.json({ message: 'Logged out successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Check authentication status
  static async checkAuth(req, res) {
    try {
      if (req.session.user) {
        res.json({ 
          isAuthenticated: true, 
          user: req.session.user 
        });
      } else {
        res.json({ isAuthenticated: false });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

export default AuthController;