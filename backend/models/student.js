class Student {
  // Create a new student
  static async create({ student_name, reg_no, student_password }) {
    try {
      const [result] = await db.execute(
        'INSERT INTO students (student_name, reg_no, student_password) VALUES (?, ?, ?)',
        [student_name, reg_no, student_password]
      );
      return { id: result.insertId, student_name, reg_no };
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Find student by registration number
  static async findByRegNo(reg_no) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM students WHERE reg_no = ?', [reg_no]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Find student by ID
  static async findById(id) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM students WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}

export default Student;