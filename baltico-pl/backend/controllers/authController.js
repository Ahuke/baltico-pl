import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SALT_ROUNDS = 10;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /auth/register
export const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ 
        error: 'Email, password, first name, and last name are required' 
      });
    }

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM "Users" WHERE "Email" = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO "Users" ("Email", "Password", "First_name", "Last_name", "Phone") 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING "ID", "Email", "First_name", "Last_name", "Phone"`,
      [email, hashedPassword, first_name, last_name, phone || null]
    );

    const newUser = result.rows[0];
    const token = generateToken({
      id: newUser.ID,
      email: newUser.Email,
      first_name: newUser.First_name,
      last_name: newUser.Last_name
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.ID,
        email: newUser.Email,
        first_name: newUser.First_name,
        last_name: newUser.Last_name,
        phone: newUser.Phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const result = await pool.query(
      'SELECT * FROM "Users" WHERE "Email" = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken({
      id: user.ID,
      email: user.Email,
      first_name: user.First_name,
      last_name: user.Last_name
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.ID,
        email: user.Email,
        first_name: user.First_name,
        last_name: user.Last_name,
        phone: user.Phone
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/me
export const getCurrentUser = async (req, res) => {
  try {
    // req.user is set by authenticateToken middleware
    const result = await pool.query(
      'SELECT "ID", "Email", "First_name", "Last_name", "Phone" FROM "Users" WHERE "ID" = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.ID,
        email: user.Email,
        first_name: user.First_name,
        last_name: user.Last_name,
        phone: user.Phone
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
