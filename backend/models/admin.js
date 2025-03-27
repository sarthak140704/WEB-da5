class Admin {
  // Create a new admin
  static async create({ admin_name, employee_id, admin_password }) {
    const db = await connectDB();
    try {
      const [result] = await db.execute(
        'INSERT INTO admins (admin_name, employee_id, admin_password) VALUES (?, ?, ?)',
        [admin_name, employee_id, admin_password]
      );
      return { id: result.insertId, admin_name, employee_id };
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Find admin by employee ID
  static async findByEmployeeId(employee_id) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM admins WHERE employee_id = ?', [employee_id]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Find admin by ID
  static async findById(id) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM admins WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}

export default Admin;