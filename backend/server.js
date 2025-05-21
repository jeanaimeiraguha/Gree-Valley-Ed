import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "green_valley"
})
db.connect((err) => {
    if (err) {
        console.log("Failed")
    }
    else {
        console.log("Connected")
    }
})

app.get('/students', (req, res) => {
    db.query('SELECT * FROM student', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET single student by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM student WHERE S_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.json(result[0]);
    });
});

// CREATE new student
app.post('/students', (req, res) => {
    const { fname, lname, gender, dob } = req.body;
    db.query(
        'INSERT INTO student (fname, lname, gender, dob) VALUES (?, ?, ?, ?)',
        [fname, lname, gender, dob],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Student created', id: result.insertId });
        }
    );
});

// UPDATE student
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const { fname, lname, gender, dob } = req.body;
    db.query(
        'UPDATE student SET fname = ?, lname = ?, gender = ?, dob = ? WHERE S_id = ?',
        [fname, lname, gender, dob, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Student updated' });
        }
    );
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM student WHERE S_id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student deleted' });
    });
});

///////////////////////////COURSE TABLE /////////////////////////


app.post('/courses', (req, res) => {
    const { c_name, credit } = req.body;
    const sql = 'INSERT INTO course (c_name, credit) VALUES (?, ?)';
    db.query(sql, [c_name, credit], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ c_id: result.insertId, c_name, credit });
    });
});

// Get all courses
app.get('/courses', (req, res) => {
    const sql = 'SELECT * FROM course';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Get course by ID
app.get('/courses/:id', (req, res) => {
    const sql = 'SELECT * FROM course WHERE c_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'Course not found' });
        res.send(result[0]);
    });
});

// Update course
app.put('/courses/:id', (req, res) => {
    const { c_name, credit } = req.body;
    const sql = 'UPDATE course SET c_name = ?, credit = ? WHERE c_id = ?';
    db.query(sql, [c_name, credit, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Course updated' });
    });
});

// Delete course
app.delete('/courses/:id', (req, res) => {
    const sql = 'DELETE FROM course WHERE c_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Course deleted' });
    });
});


//////////////////ENROLLMENT //////////////////////


app.post('/enrollments', (req, res) => {
    const { S_id, c_id, date, grade } = req.body;
    const sql = 'INSERT INTO enrollment (S_id, c_id, date, grade) VALUES (?, ?, ?, ?)';
    db.query(sql, [S_id, c_id, date, grade], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Enrollment created', id: result.insertId });
    });
});

// READ ALL
app.get('/enrollments', (req, res) => {
    db.query('SELECT * FROM enrollment', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// READ ONE
app.get('/enrollments/:S_id/:c_id', (req, res) => {
    const { S_id, c_id } = req.params;
    db.query('SELECT * FROM enrollment WHERE S_id = ? AND c_id = ?', [S_id, c_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: 'Enrollment not found' });
        res.json(result[0]);
    });
});

// UPDATE
app.put('/enrollments/:S_id/:c_id', (req, res) => {
    const { S_id, c_id } = req.params;
    const { date, grade } = req.body;
    const sql = 'UPDATE enrollment SET date = ?, grade = ? WHERE S_id = ? AND c_id = ?';
    db.query(sql, [date, grade, S_id, c_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Enrollment updated' });
    });
});

// DELETE
app.delete('/enrollments/:S_id/:c_id', (req, res) => {
    const { S_id, c_id } = req.params;
    const sql = 'DELETE FROM enrollment WHERE S_id = ? AND c_id = ?';
    db.query(sql, [S_id, c_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Enrollment deleted' });
    });
});


////////LOGIN //////////////////


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin WHERE name = ? AND password = ?";
    const { name, password } = req.body;

    db.query(sql, [name, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json(result);
    });
});

////////////////////SIGN UP /////////////////

app.post('/register', (req, res) => {
    const sql = "INSERT INTO admin (name,password) VALUES(?,?)";
    const { name, password } = req.body;
    db.query(sql, [name, password], (err, result) => {
        if (err) return res.status(404).json("Failed")
        return res.status(200).json(result)
    })
})


/////////////Report //////////////////////
app.get('/report', (req, res) => {
  const sql = `
    SELECT 
      s.S_id,
      CONCAT(s.fname, ' ', s.lname) AS name,
      ROUND(
        SUM(
          CASE e.grade
            WHEN 'A' THEN 4 * c.credit
            WHEN 'B' THEN 3 * c.credit
            WHEN 'C' THEN 2 * c.credit
            WHEN 'D' THEN 1 * c.credit
            WHEN 'F' THEN 0 * c.credit
            ELSE 0
          END
        ) / SUM(c.credit), 2
      ) AS gpa
    FROM student s
    JOIN enrollment e ON s.S_id = e.S_id
    JOIN course c ON e.c_id = c.c_id
    GROUP BY s.S_id, s.fname, s.lname
    ORDER BY s.S_id;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});



app.listen(3000, () => {
    console.log("running on http://localhost:3000")
})
