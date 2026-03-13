// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const currentDateEl = document.getElementById('current-date');
const calendarEl = document.getElementById('calendar');
const fortuneText = document.getElementById('fortune-text');
const fortuneBtn = document.getElementById('fortune-btn');
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

// --- Theme Toggle ---
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// --- Calendar Logic ---
function initCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    currentDateEl.textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarEl.innerHTML = '';

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarEl.appendChild(emptyDiv);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');
        if (day === today) dayEl.classList.add('today');
        dayEl.textContent = day;
        calendarEl.appendChild(dayEl);
    }
}

// --- Fortune Logic ---
const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A fresh start will put a search in your step.",
    "A golden egg of opportunity falls into your lap this month.",
    "A smile is your personal welcome mat.",
    "All your hard work will soon pay off.",
    "Believe it can be done.",
    "Every day is a new adventure.",
    "Good news will come to you by mail.",
    "Happiness begins with facing life with a smile and a wink.",
    "It is better to be an optimist and a fool than a pessimist and right.",
    "Success is a journey, not a destination.",
    "Your talents will be recognized and suitably rewarded."
];

fortuneBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    fortuneText.style.opacity = 0;
    setTimeout(() => {
        fortuneText.textContent = fortunes[randomIndex];
        fortuneText.style.opacity = 1;
    }, 200);
});

// --- Lotto Logic ---
generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateLottoNumbers();
    numbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        numberElement.textContent = number;
        lottoNumbersContainer.appendChild(numberElement);
    });
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Initialize
initCalendar();
