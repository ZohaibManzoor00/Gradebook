const grade = document.getElementById('grade');

grade.addEventListener('click', (e) => {
    const element = e.target;
    const gradeInput = document.getElementById('grade-input');
    const gradeDisplay = document.getElementById('grade-display');

    gradeDisplay.className = 'hidden';
    gradeInput.className = 'show';

    const saveInput = e => {
        const value = e.target.value;
        console.log("Saving the input");
        gradeInput.className = 'hidden';
        const loadingIndicator = document.getElementById('loading-indicator');
        loadingIndicator.className = 'show';
        loadingIndicator.innerHTML = 'Loading';

        setTimeout(() => {
            loadingIndicator.className = 'hidden';
            gradeDisplay.className = 'show';
            gradeDisplay.innerHTML = value;
            gradeInput.removeEventListener('blur', saveInput)
        }, 1000);
    }
    gradeInput.addEventListener('blur', saveInput)
})