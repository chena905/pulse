document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Be kind to yourself.",
        "Make your happiness a priority.",
        "Invest in your well-being.",
        "You are enough.",
        "Take a moment to breathe.",
        "Prioritize your needs.",
        "Listen to your body.",
        "Practice self-compassion.",
        "Recharge and renew.",
        "Time for a digital detox.",
        "A little self-care goes a long way."
    ];

    // Display a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    // Display the random quote
    document.getElementById('quote').textContent = getRandomQuote();

    // Calendar Setup
    function generateCalendar() {
        const calendar = document.getElementById('calendar');
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        // Get first day and last day of the month
        const firstDayIndex = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Clear previous calendar
        calendar.innerHTML = '';

        // Add empty cells for the days before the 1st of the month
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            calendar.appendChild(emptyCell);
        }

        // Create calendar days
        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.addEventListener('click', function () {
                showTodoList(day);
            });
            calendar.appendChild(dayCell);
        }
    }

    // Show To-Do list for a specific day
    function showTodoList(day) {
        const selectedDate = `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        document.getElementById('selected-date').textContent = `To-Do for ${selectedDate}`;
        document.getElementById('todo-container').style.display = 'block';
        document.getElementById('todo-list').value = getTodoListForDay(selectedDate);
    }

    // Save the To-Do list for a day
    document.getElementById('save-todo').addEventListener('click', function () {
        const day = document.getElementById('selected-date').textContent.split(' ')[2];
        const todoText = document.getElementById('todo-list').value.trim();
        if (todoText) {
            const selectedDate = `${day}`;
            let todos = JSON.parse(localStorage.getItem('todos')) || {};
            todos[selectedDate] = todoText;
            localStorage.setItem('todos', JSON.stringify(todos));
            alert('To-Do saved!');
        }
    });

    // Get saved To-Do list for a day
    function getTodoListForDay(date) {
        const todos = JSON.parse(localStorage.getItem('todos')) || {};
        return todos[date] || '';
    }

    generateCalendar();
});
