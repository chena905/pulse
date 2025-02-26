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
    document.getElementById('quote').textContent = getRandomQuote();

    // Journal functionality
    const saveButton = document.getElementById("save-entry");
    const journalEntry = document.getElementById("journal-entry");
    const savedEntries = document.getElementById("saved-entries");
    const moodSelector = document.getElementById("mood");

    // Load saved journal entries from localStorage
    function loadEntries() {
        const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        savedEntries.innerHTML = "";
        storedEntries.forEach((entry, index) => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("entry");

            // Display Date, Time, Mood, and Journal Text
            const date = new Date(entry.timestamp);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            entryDiv.innerHTML = `
                <div><strong>Date and Time:</strong> ${formattedDate}</div>
                <div><strong>Mood:</strong> ${entry.mood}</div>
                <div><p>${entry.text}</p></div>
                <button class="delete-entry" data-index="${index}">Delete</button>
            `;
            savedEntries.appendChild(entryDiv);
        });

        // Add delete functionality
        document.querySelectorAll(".delete-entry").forEach(button => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                deleteEntry(index);
            });
        });
    }

    // Save a journal entry
    saveButton.addEventListener("click", function () {
        const text = journalEntry.value.trim();
        const mood = moodSelector.value;

        if (text && mood) {
            const timestamp = new Date().getTime(); // current date and time
            const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
            storedEntries.push({ text, mood, timestamp });
            localStorage.setItem("journalEntries", JSON.stringify(storedEntries));
            journalEntry.value = "";
            moodSelector.value = "";
            loadEntries();
        } else {
            alert("Please write something and select your mood.");
        }
    });

    // Delete an entry
    function deleteEntry(index) {
        const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        storedEntries.splice(index, 1);
        localStorage.setItem("journalEntries", JSON.stringify(storedEntries));
        loadEntries();
    }

    // Load previous entries on page load
    loadEntries();
});
