const express = require('express');
const todosRouter = require('./controller/gradeBookController');

const app = express();

const PORT = 3031

app.use(express.json())

app.use(gradeBookRouter)

app.listen(PORT, () => {
    console.log(`App has been initialized on http://localhost:${PORT}`)
})
