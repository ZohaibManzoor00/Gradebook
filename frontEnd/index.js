const form = document.getElementById("form");
let numberOfStudents;

// -------------Render Columns-------------
fetch('http://localhost:3031/').then(res => res.json())
    .then(data => {
        data.forEach(cell => {
            renderGrades(cell.subject, cell.assignment_name, cell.grade, cell.start_date.substring(5, 10), cell.due_date.substring(5, 10), cell.id)
        })
    })


// -------------Render Students Names-------------
fetch('http://localhost:3031/students').then(res => res.json())
    .then(data => {
        numberOfStudents = data.length
        data.forEach(student => {
            renderStudents(student.first_name, student.last_name)
        })
    })


// -------------Render Students Grades-------------
fetch('http://localhost:3031/grades').then(res => res.json())
    .then(data => {
        const tableChildren = document.getElementById('table-body').children
        let pointer = 5
        data.forEach((grade, index) => {
            // grade.innerHTML = 
            const newEntry = document.createElement('td')
            newEntry.dataset.id = grade.id
            newEntry.innerHTML = `
            <div id="grade${index}" data-grade="100">
                <div id="grade-display${index}">${grade.grade}</div>
                <input id="grade-input${index}" class="hidden" value=${grade.grade} type="text"/>
                <div class="hidden" id="loading-indicator${index}"></div>
            </div>
            `
            newEntry.addEventListener('click', e => {
                // console.log(e.target.dataset.assignmentId)
                // console.log('Clicked')
                const element = e.target;

                const gradeInput = document.getElementById(`grade-input${index}`);
                const gradeDisplay = document.getElementById(`grade-display${index}`);

                const input = document.getElementById(`grade-input${index}`)
                input.style.width = '50px'
                input.style.fontSize = '14px'
                
                gradeDisplay.className = "hidden";
                gradeInput.className = "show";

                if (gradeInput) {
                    gradeInput.focus();
                }

                function saveInput(event) {
                    const value = event.target.value;
                    gradeInput.className = "hidden";
                    const loadingIndicator = document.getElementById(`loading-indicator${index}`);
                    loadingIndicator.className = "show";
                    loadingIndicator.innerText = "Loading";

                    const id = Number(event.target.id.split('grade-input')[1]) + 1

                    if (value) {
                        fetch(`http://localhost:3031/grades/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                newGrade: value
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(res => res.json()).then(data => returned = data)
                    }

                    setTimeout(() => {
                        loadingIndicator.className = "hidden";
                        gradeDisplay.className = "show";
                        gradeDisplay.innerText = value;
                        gradeInput.removeEventListener("blur", saveInput);
                    }, 300);
                }
                gradeInput.addEventListener('blur', saveInput)
            })
            tableChildren[pointer].appendChild(newEntry)
            pointer++
            if (pointer === 5 + numberOfStudents) pointer = 5
        })
    })

// ----------------------- 
// grade.addEventListener("click", (e) => {
//     const element = e.target;
//     const gradeInput = document.getElementById("grade-input");
//     const gradeDisplay = document.getElementById("grade-display");

//     gradeDisplay.className = "hidden";
//     gradeInput.className = "show";

//     if (gradeInput) {
//         gradeInput.focus();
//     }

//     function saveInput(event) {
//         const value = event.target.value;
//         gradeInput.className = "hidden";
//         const loadingIndicator = document.getElementById("loading-indicator");
//         loadingIndicator.className = "show";
//         loadingIndicator.innerText = "Loading";

//         setTimeout(() => {
//             loadingIndicator.className = "hidden";
//             gradeDisplay.className = "show";
//             gradeDisplay.innerText = value;
//             gradeInput.removeEventListener("blur", saveInput);
//         }, 600);
//     }

//     gradeInput.addEventListener('blur', saveInput)
// });
// -----------------------


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

// ------------Assignment Modal------------
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// ------------Assignment Modal------------



// ------------Delete Modal------------
const modal2 = document.getElementById('delete-modal')
const btn2 = document.getElementById('deleteBtn')
const span2 = document.getElementsByClassName("close")[0];

btn2.onclick = function () {
    modal2.style.display = "block";
}

span2.onclick = function () {
    modal2.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
// ------------Delete Modal------------


/*
const els = document.querySelectorAll('[data-assignment-id="50"]')
els[0].remove()
*/


const editBtn = document.getElementById('edit')
const editArea = document.getElementById('edit-prompt')
editBtn.addEventListener('click', e => {
    const h2 = document.createElement('h2')
    h2.innerText = 'Select Cell to Update Grade'
    h2.style.display = 'flex'
    h2.style.justifyContent = 'center'
    editArea.appendChild(h2)
}, {once:true})