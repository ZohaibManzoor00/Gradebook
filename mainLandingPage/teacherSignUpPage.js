window.addEventListener("DOMContentLoaded", (e) => {
const form = document.getElementById('register');
console.log(form)
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:3031/register', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        location.assign('./mainLandingPage.html')
    })
})
})