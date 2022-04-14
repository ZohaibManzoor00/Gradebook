const form = document.getElementById("form");
fetch('http://localhost:3031/').then(res => res.json())
.then(data => {
    data.forEach(cell => {
        renderGrades(cell.subject, cell.assignment_name, cell.grade, cell.start_date.substring(5, 10), cell.due_date.substring(5, 10))
    })
})

form.addEventListener("submit", e => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const name = e.target.name.value;
    const grade = e.target.grade.value;
    const startDate = e.target.startDate.value
    const dueDate = e.target.dueDate.value

    renderGrades(subject, name, grade, startDate, dueDate);
  
    e.target.startDate.value = ''
    e.target.dueDate.value = ''
    e.target.subject.value = ''
    e.target.name.value = ''
    e.target.grade.value = ''
});

function renderGrades(subject, name, grade, startDate, dueDate) {
    const subjectDiv = document.getElementById("table-subject");
    const nameDiv = document.getElementById("table-name");
    const totalPointsDiv = document.getElementById("table-total-points");
    const startDateDiv = document.getElementById('table-start-date')
    const dueDateDiv = document.getElementById('table-due-date')


    const subjectChild = document.createElement("td");
    const totalPointsChild = document.createElement("td");
    const nameChild = document.createElement("td");
    const startDateChild = document.createElement("td");
    const dueDateChild = document.createElement("td");
    
    
    startDateChild.innerText = startDate;
    dueDateChild.innerText = dueDate;
    subjectChild.innerText = subject;
    nameChild.innerText = name;
    totalPointsChild.innerText = grade;


    startDateDiv.appendChild(startDateChild)
    dueDateDiv.appendChild(dueDateChild)
    subjectDiv.appendChild(subjectChild);
    nameDiv.appendChild(nameChild);
    totalPointsDiv.appendChild(totalPointsChild);
}