/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('grades').del()
  const students = await knex('students').select('id')
  const assignments = await knex('assignments').select('id')
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
  const grades = []
  students.forEach(student => {
    assignments.forEach(assignment => {
      grades.push({
        student_id:student.id,
        assignment_id:assignment.id,
        grade: getRandomInt(60, 100)
      })
    })
  })
  await knex('grades').insert(grades);
};
