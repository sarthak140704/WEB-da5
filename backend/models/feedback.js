class Feedback {
  // Create a new feedback entry
  static async create({
    student_reg_no,
    student_name,
    block_name,
    room_number,
    mess_name,
    mess_type,
    category,
    feedback,
    comments,
    proof_path
  }) {
    const db = await connectDB();
    try {
      const [result] = await db.execute(
        `INSERT INTO feedback (
          student_reg_no, student_name, block_name, room_number, mess_name, 
          mess_type, category, feedback, comments, proof_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student_reg_no,
          student_name,
          block_name,
          room_number,
          mess_name,
          mess_type,
          category,
          feedback,
          comments || null, // Optional field
          proof_path || null // Optional field
        ]
      );
      return { id: result.insertId, student_reg_no, student_name, feedback };
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Find feedback by ID
  static async findById(id) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM feedback WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Get all feedback for a student by registration number
  static async findByStudentRegNo(student_reg_no) {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM feedback WHERE student_reg_no = ?', [student_reg_no]);
      return rows;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  // Get all feedback entries (e.g., for admin view)
  static async getAll() {
    const db = await connectDB();
    try {
      const [rows] = await db.execute('SELECT * FROM feedback ORDER BY submitted_at DESC');
      return rows;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}

export default Feedback;