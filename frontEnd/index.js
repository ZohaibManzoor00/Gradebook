// const form = document.getElementById("form");
// let numberOfStudents;

// // -------------Render Columns-------------
fetch('http://localhost:3031/').then(res => res.json())
    .then(data => {
        data.forEach(cell => {
            renderGrades(cell.subject, cell.assignment_name, cell.grade, cell.start_date.substring(5, 10), cell.due_date.substring(5, 10), cell.id)
        })
    })

// // -------------Render Students Names-------------
fetch('http://localhost:3031/students').then(res => res.json())
    .then(data => {
        numberOfStudents = data.length
        data.forEach(student => {
            console.log(student)
            //     const newEntry = document.createElement('td')
            //     newEntry.innerHTML =
            //         `<div id="grade${index}" data-grade="100">
            //     <div id="grade-display${index}">${grade.grade}</div>
            //     <input id="grade-input,${grade.student_id},${grade.assignment_id}" class="hidden" value=${grade.grade} type="text"/>
            //     <div class="hidden" id="loading-indicator${index}"></div>
            // </div>`
            renderStudents(student.first_name, student.last_name)
            const tableSubjectsId = document.getElementById('table-subject').children
            // for (let i = 1; i < tableSubjectsId.length; i++) {
            //     const tableBody = document.getElementById('table-body')
            //     const newStudentData = document.createElement('td')
            //     tableBody.appendChild(newStudentData)
            // }
        })
    })

// // -------------Render Students Grades-------------
// fetch('http://localhost:3031/grades').then(res => res.json())
//     .then(data => {
//         const tableChildren = document.getElementById('table-body').children
//         let pointer = 5
//         data.forEach((grade, index) => {
//             const newEntry = document.createElement('td')
//             newEntry.dataset.id = grade.id
//             newEntry.innerHTML =
//                 `<div id="grade${index}" data-grade="100">
//                 <div id="grade-display${index}">${grade.grade}</div>
//                 <input id="grade-input,${grade.student_id},${grade.assignment_id}" class="hidden" value=${grade.grade} type="text"/>
//                 <div class="hidden" id="loading-indicator${index}"></div>
//             </div>`

//             newEntry.addEventListener('click', e => {
//                 const gradeInput = document.getElementById(`grade-input,${grade.student_id},${grade.assignment_id}`);
//                 const gradeDisplay = document.getElementById(`grade-display${index}`);

//                 const input = document.getElementById(`grade-input,${grade.student_id},${grade.assignment_id}`)
//                 console.log(input)
//                 input.style.width = '20px'
//                 input.style.fontSize = '14px'
//                 input.style.textAlign = 'center'
//                 input.style.height = '11px'

//                 gradeDisplay.className = 'hidden';
//                 gradeInput.className = 'show';

//                 if (gradeInput) {
//                     gradeInput.focus();
//                 }

//                 function saveInput(event) {
//                     const value = event.target.value;
//                     gradeInput.className = 'hidden';
//                     const loadingIndicator = document.getElementById(`loading-indicator${index}`);
//                     loadingIndicator.className = 'show';
//                     loadingIndicator.innerText = 'Loading';

//                     const idArray = event.target.id.split(',');
//                     const studentId = idArray[1];
//                     const assignmentId = idArray[2];

//                     if (value) {
//                         fetch(`http://localhost:3031/grades`, {
//                             method: 'PUT',
//                             body: JSON.stringify({
//                                 newGrade: value,
//                                 studentId,
//                                 assignmentId
//                             }),
//                             headers: {
//                                 "Content-type": "application/json"
//                             }
//                         }).then(res => res.json()).then(data => returned = data)
//                     }

//                     setTimeout(() => {
//                         loadingIndicator.className = 'hidden';
//                         gradeDisplay.className = 'show';
//                         gradeDisplay.innerText = value;
//                         gradeInput.removeEventListener('blur', saveInput);
//                     }, 300);
//                 }
//                 gradeInput.addEventListener('blur', saveInput)
//             })
//             tableChildren[pointer].appendChild(newEntry)
//             pointer++
//             if (pointer === 5 + numberOfStudents) pointer = 5
//         })
//     })

// const editBtn = document.getElementById('edit')
// const editArea = document.getElementById('edit-prompt')
// editBtn.addEventListener('click', e => {
//     const h2 = document.createElement('h2')
//     h2.innerText = 'Select Cell to Update Grade'
//     h2.style.display = 'flex'
//     h2.style.justifyContent = 'center'
//     editArea.appendChild(h2)
// }, { once: true })

function renderStudents(firstName, lastName) {
    const tableBody = document.getElementById('table-body')
    const newStudentRow = document.createElement('tr')
    const newStudentTH = document.createElement('th')

    newStudentTH.innerText = firstName + ' ' + lastName
    newStudentTH.style.color = '#45515e'
    newStudentRow.appendChild(newStudentTH)
    tableBody.appendChild(newStudentRow)
}

// form.addEventListener('submit', e => {
//     e.preventDefault();

//     const subject = e.target.subject.value;
//     const name = e.target.name.value;
//     const grade = e.target.grade.value;
//     const startDate = e.target.startDate.value
//     const dueDate = e.target.dueDate.value

//     renderGrades(subject, name, grade, startDate, dueDate);

//     e.target.startDate.value = ''
//     e.target.dueDate.value = ''
//     e.target.subject.value = ''
//     e.target.name.value = ''
//     e.target.grade.value = ''

//     fetch('http://localhost:3031/', {
//         method: 'POST',
//         body: JSON.stringify({
//             subject,
//             name,
//             grade,
//             startDate,
//             dueDate
//         }),
//         headers: {
//             "Content-type": "application/json"
//         }
//     }).then(res => res.json())
//         .then(data => location.assign('./index.html'))
// });

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

// // ------------Assignment Modal------------
// let modal1 = document.getElementById('myModal');
// let btn1 = document.getElementById('myBtn');
// let span1 = document.getElementsByClassName('close')[0];

// const modal2 = document.getElementById('delete-modal')
// const btn2 = document.getElementById('deleteBtn')
// const span2 = document.getElementsByClassName('close2')[0];

// btn1.onclick = function () {
//     modal1.style.display = 'block';
// }
// span1.onclick = function () {
//     modal1.style.display = 'none';
// }
// window.onclick = function (event) {
//     if (event.target === modal1) {
//         modal1.style.display = 'none';
//     }
//     if (event.target === modal2) {
//         modal2.style.display = 'none'
//     }
//     if (event.target === modal3) {
//         modal3.style.display = 'none'
//     }
// }
// btn2.onclick = function () {
//     modal2.style.display = 'block';
// }
// span2.onclick = function () {
//     modal2.style.display = 'none';
// }

// /*
// const els = document.querySelectorAll('[data-assignment-id="50"]')
// els[0].remove()
// */

// const modal3 = document.getElementById('add-student-modal')
// const btn3 = document.getElementById('addStudent')
// const span3 = document.getElementsByClassName('close3')[0]
// const addStudentBtn = document.getElementById('addStudent')

// btn3.onclick = function () {
//     modal3.style.display = 'block';
// }
// span3.onclick = function () {
//     modal3.style.display = 'none';
// }



// const addStudentForm = document.getElementById('add-student-form')
// const fullName = document.getElementById('student-full-name')
// const studentEmail = document.getElementById('student-email')

// addStudentForm.addEventListener('submit', e => {
//     e.preventDefault()
//     renderStudents(fullName.value, '')
// })

