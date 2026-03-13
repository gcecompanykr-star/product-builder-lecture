// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const quoteEn = document.getElementById('quote-en');
const quoteKo = document.getElementById('quote-ko');
const quoteAuthor = document.getElementById('quote-author');
const quoteBtn = document.getElementById('quote-btn');

const canvas = document.getElementById('roulette-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const selectedMenuName = document.getElementById('selected-menu-name');
const foodImageContainer = document.getElementById('food-image-container');
const menuHistoryList = document.getElementById('menu-history');

// --- Theme Toggle ---
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    drawRoulette(); // Redraw with new colors
});

// --- Quotes Data with Authors ---
const quotes = [
    { en: "The way to get started is to quit talking and begin doing.", ko: "시작하는 방법은 말하기를 그만두고 행동하는 것이다.", author: "Walt Disney" },
    { en: "Your time is limited, so don't waste it living someone else's life.", ko: "당신의 시간은 한정되어 있으니, 다른 사람의 삶을 사느라 낭비하지 마라.", author: "Steve Jobs" },
    { en: "The greatest glory in living lies not in never falling, but in rising every time we fall.", ko: "가장 큰 영광은 넘어지지 않는 것이 아니라 넘어질 때마다 일어나는 데 있다.", author: "Nelson Mandela" },
    { en: "Innovation distinguishes between a leader and a follower.", ko: "혁신은 리더와 추종자를 구분하는 잣대다.", author: "Steve Jobs" },
    { en: "If you look at what you have in life, you'll always have more.", ko: "당신이 가진 것에 주목한다면 항상 더 많이 갖게 될 것이다.", author: "Oprah Winfrey" },
    { en: "Life is what happens when you're making other plans.", ko: "삶이란 다른 계획을 세우느라 바쁠 때 일어나는 일이다.", author: "John Lennon" },
    { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", ko: "성공은 최종적인 것이 아니며 실패는 치명적인 것이 아니다. 중요한 것은 계속 나아가는 용기다.", author: "Winston Churchill" },
    { en: "Stay hungry, stay foolish.", ko: "계속 갈망하라, 여전히 우직하게.", author: "Steve Jobs" },
    { en: "Done is better than perfect.", ko: "완수하는 것이 완벽한 것보다 낫다.", author: "Sheryl Sandberg" },
    { en: "The only way to do great work is to love what you do.", ko: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다.", author: "Steve Jobs" }
];

function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEn.style.opacity = 0;
    quoteKo.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    setTimeout(() => {
        quoteEn.textContent = `"${quote.en}"`;
        quoteKo.textContent = quote.ko;
        quoteAuthor.textContent = `- ${quote.author}`;
        quoteEn.style.opacity = 1;
        quoteKo.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
    }, 300);
}
quoteBtn.addEventListener('click', getRandomQuote);

// --- Lunch Roulette Logic ---
let menus = [
    "김치찌개", "짜장면", "크림파스타", "비빔밥", "볶음밥", "햄버거 세트",
    "된장찌개", "짬뽕", "피자", "제육볶음", "마파두부덮밥", "토마토파스타",
    "순두부찌개", "탕수육 + 짜장면", "까르보나라", "돌솥비빔밥", "고추잡채 덮밥",
    "리조또", "냉면", "규동", "샐러드 + 샌드위치", "칼국수", "쌀국수",
    "스테이크 정식", "부대찌개", "카레라이스", "돈까스", "뼈해장국",
    "우동", "치킨마요 덮밥", "닭갈비", "떡볶이 + 튀김", "불고기 정식", "김밥 + 라면"
];

let history = [];
let isSpinning = false;
let rotation = 0;

const colors = ["#f8dada", "#dcf8da", "#dadcf8", "#f8f8da", "#daf8f8", "#f8daf8", "#e6f8da", "#dae6f8", "#f8e6da", "#e6daf8"];

function drawRoulette() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 10;
    const sliceAngle = (2 * Math.PI) / menus.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    menus.forEach((menu, i) => {
        const startAngle = i * sliceAngle + rotation;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fill();
        ctx.stroke();

        // Draw Text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#333";
        ctx.font = "bold 12px Arial";
        ctx.fillText(menu, radius - 10, 5);
        ctx.restore();
    });
}

function updateHistory(menu) {
    history.unshift(menu);
    if (history.length > 5) history.pop();
    
    menuHistoryList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        menuHistoryList.appendChild(li);
    });
}

function fetchFoodImage(menu) {
    // Unsplash Source is deprecated, using LoremFlickr or similar
    const imageUrl = `https://loremflickr.com/300/200/food,${menu}`;
    foodImageContainer.innerHTML = `<img src="${imageUrl}" alt="${menu}">`;
}

spinBtn.addEventListener('click', () => {
    if (isSpinning || menus.length === 0) return;

    isSpinning = true;
    const spinCircles = 5 + Math.random() * 5;
    const spinAngle = spinCircles * 2 * Math.PI + Math.random() * 2 * Math.PI;
    
    const startTime = performance.now();
    const duration = 4000;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentSpin = spinAngle * easeOut;
        
        rotation = currentSpin;
        drawRoulette();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            // Calculate selected menu
            const finalRotation = rotation % (2 * Math.PI);
            const sliceAngle = (2 * Math.PI) / menus.length;
            
            // The pointer is at -PI/2 (top)
            let selectedIndex = Math.floor(((1.5 * Math.PI - finalRotation) % (2 * Math.PI)) / sliceAngle);
            if (selectedIndex < 0) selectedIndex += menus.length;
            
            const pickedMenu = menus[selectedIndex];
            selectedMenuName.textContent = pickedMenu;
            
            updateHistory(pickedMenu);
            fetchFoodImage(pickedMenu);
            
            // Remove picked menu from the list
            menus.splice(selectedIndex, 1);
            if (menus.length === 0) {
                spinBtn.disabled = true;
                spinBtn.textContent = "모든 메뉴를 다 뽑았습니다!";
            }
            drawRoulette();
        }
    }
    requestAnimationFrame(animate);
});

// Initialize
getRandomQuote();
drawRoulette();

// --- Contact Form Handling ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const submitBtn = document.getElementById('submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = '보내는 중...';
    
    fetch(event.target.action, {
        method: contactForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formStatus.textContent = "문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!";
            formStatus.style.color = "var(--primary-color)";
            contactForm.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                }
                formStatus.style.color = "var(--accent-color)";
            })
        }
    }).catch(error => {
        formStatus.textContent = "오류가 발생했습니다. 네트워크 연결을 확인해주세요.";
        formStatus.style.color = "var(--accent-color)";
    }).finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = '문의하기';
    });
});
