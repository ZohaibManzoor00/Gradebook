const express = require('express');
// const todosRouter = require('./controller/gradeBookController');
const cors = require('cors');
const { response } = require('express');
const db = require('./db/db');
const { query } = require('express');


const app = express();

const PORT = process.env.PORT || 3031

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const query = await db('teachers').insert({
        username,password
    }).returning([
        'id', 'username', 'password'
    ])
    res.json(query)
})

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await db.select().from("teachers").where({username});
    console.log(user[0].password)
    if (user[0].password === password) {
        return res.status(201).json('Success')
    } else {
        return res.status(404).json('Incorrect Password')
    }
})

app.get('/assignments', async (req, res) => {
    const query = await db.select().from('assignments').orderBy('start_date')
    res.json(query)
})

app.get('/students', async (req, res) => {
    const query = await db.select().from('students').orderBy('first_name')
    res.json(query)
})

app.get('/grades', async (req, res) => {
    const query = await db.select('grades.*').from('assignments').join('grades', 'grades.assignment_id', '=', 'assignments.id')
        .join('students', 'students.id', '=', 'grades.student_id').orderBy([{ column: 'start_date' }, { column: 'students.first_name' }])
    res.json(query)
})

app.post('/assignments', async (req, res) => {
    const { subject, name, grade, startDate, dueDate } = req.body
    const query = await db('assignments').insert({
        subject,
        assignment_name: name,
        grade,
        start_date: startDate,
        due_date: dueDate
    }).returning([
        'id', 'subject', 'assignment_name', 'grade', 'start_date', 'due_date'
    ])
    res.json(query)
})

app.put('/grades', async (req, res) => {
    const newGrade = req.body.newGrade
    const { studentId, assignmentId } = req.body;
    const query = await db('grades').update({
        grade: newGrade
    }).where({ student_id: studentId, assignment_id: assignmentId }).returning([
        'id', 'student_id', 'assignment_id', 'grade'
    ])
    res.json(query)
})

app.post('/students', async (req, res) => {
    const { studentFullName, studentNewEmail } = req.body
    const query = await db('students').insert({
        first_name: studentFullName,
        last_name: '',
        email: studentNewEmail,
        grade: 0
    }).returning([
        'id', 'first_name', 'last_name', 'email', 'grade'
    ])
    res.json(query)
})

app.post('/grades', async (req, res) => {
    const { studentId, assignmentId, newGrade } = req.body
    if (newGrade === 'undefined') newGrade = 0
    if (newGrade === undefined) newGrade = 0
    if (newGrade && assignmentId && studentId) {
        const query = await db('grades').insert({
            student_id: studentId,
            assignment_id: assignmentId,
            grade: newGrade
        })
        // .returning([
        //     'student_id', 'assignment_id', 'grade'
        // ])
        res.json(query)
    }
})

app.delete('/grades', async (req, res) => {
    const { deleteAssignment, deleteSubject } = req.body
    const query = await db('assignments').where('assignment_name', deleteAssignment).
        andWhere('subject', deleteSubject).del()
    res.json(query)
})

app.delete('/students', async (req, res) => {
    const { firstName } = req.body
    const query = await db('students').where('first_name', firstName).del()
    res.json(query)
})

app.get('/:id', async (req, res) => {
    const id = req.params.id
    const query = await db('grades').avg('grade').where('student_id', id)
    res.json(query)
})



app.listen(PORT, () => {
    console.log(`App initialized on http://localhost:${PORT}`)
})

// A Students avg
// select AVG(grade) FROM grades where student_id = 60 