window.addEventListener("DOMContentLoaded", (e) => {
  const loginForm = document.getElementById("login");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password)
    fetch("http://localhost:3031/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(res => res.json())
    .then(data => {
        if (data === 'Success') {
            location.assign('../frontEnd/index.html')
        }
    });
  });
});
