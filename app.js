const express = require('express');
// const todosRouter = require('./controller/gradeBookController');
const cors = require('cors');
const { response } = require('express');
const db = require('./db/db')


const app = express();

const PORT = process.env.PORT || 3031

app.use(cors())
app.use(express.json())
// app.use(todosRouter)

// app.get('/student/:id/grades', (req, res) => {
//     res.status(200).send('Get Route Working')
//     // get student grade
// })

app.get('/', async (req, res) => {
   const query = await db.select().from('assignments').orderBy('start_date')
   res.send(query)
})

app.get('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send(`The ID is ${id}`)
}) 

app.post('/', (req, res) => {
    
})

app.put('/:id', (req, res) => {

})

app.delete('/:id', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`App has been initialized on http://localhost:${PORT}`)
})
