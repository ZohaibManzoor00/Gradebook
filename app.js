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
// app.use(todosRouter)

// app.get('/student/:id/grades', (req, res) => {
//     res.status(200).send('Get Route Working')
//     // get student grade
// })

app.get('/', async (req, res) => {
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

app.post('/', async (req, res) => {
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
    const {studentId, assignmentId} = req.body;
    const query = await db('grades').update({
        grade: newGrade
    }).where({ student_id: studentId, assignment_id:assignmentId }).returning([
        'id', 'student_id', 'assignment_id', 'grade'
    ])
    res.json(query)
})

app.delete('/', async (req, res) => {
    const body = req.params.body
})

app.listen(PORT, () => {
    console.log(`App initialized on http://localhost:${PORT}`)
})

