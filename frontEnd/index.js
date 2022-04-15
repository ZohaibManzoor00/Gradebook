const form = document.getElementById("form");
let numberOfStudents;
fetch('http://localhost:3031/').then(res => res.json())
    .then(data => {
        data.forEach(cell => {
            renderGrades(cell.subject, cell.assignment_name, cell.grade, cell.start_date.substring(5, 10), cell.due_date.substring(5, 10), cell.id)
        })
    })

fetch('http://localhost:3031/students').then(res => res.json())
    .then(data => {
        numberOfStudents = data.length
        data.forEach(student => {
            // student.first_name.classList.add('students')
            renderStudents(student.first_name, student.last_name)
        })
    })

fetch('http://localhost:3031/grades').then(res => res.json())
    .then(data => {
        const tableChildren = document.getElementById('table-body').children
        let pointer = 5
        data.forEach(grade => {
            const newEntry = document.createElement('td')
            newEntry.innerText = grade.grade
            tableChildren[pointer].appendChild(newEntry)
            pointer++
            if (pointer === 5 + numberOfStudents) pointer = 5
        })
    })

// fetch('http://localhost:3031/grades', {
//     method: 'DELETE'
// }).then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })

function renderStudents(firstName, lastName) {
    const tableBody = document.getElementById('table-body')
    const newStudentRow = document.createElement('tr')
    const newStudentTH = document.createElement('th')

    newStudentTH.innerText = firstName + ' ' + lastName
    newStudentTH.style.color = '#45515e'
    newStudentRow.appendChild(newStudentTH)
    tableBody.appendChild(newStudentRow)
}

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

    fetch('http://localhost:3031/', {
        method: 'POST',
        body: JSON.stringify({
            subject,
            name,
            grade,
            startDate,
            dueDate
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
        .then(data => location.assign('./index.html'))
});

function renderGrades(subject, name, grade, startDate, dueDate, id) {
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

    subjectChild.id = id

    startDateDiv.appendChild(startDateChild)
    dueDateDiv.appendChild(dueDateChild)
    subjectDiv.appendChild(subjectChild);
    nameDiv.appendChild(nameChild);
    totalPointsDiv.appendChild(totalPointsChild);
}

// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 

