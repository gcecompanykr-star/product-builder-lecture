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
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        drawRoulette(); 
    });
}

// --- Quotes Data with Korean Authors ---
const quotes = [
    { en: "The way to get started is to quit talking and begin doing.", ko: "시작하는 방법은 말하기를 그만두고 행동하는 것이다.", author: "Walt Disney", authorKo: "월트 디즈니" },
    { en: "Your time is limited, so don't waste it living someone else's life.", ko: "당신의 시간은 한정되어 있으니, 다른 사람의 삶을 사느라 낭비하지 마라.", author: "Steve Jobs", authorKo: "스티브 잡스" },
    { en: "Done is better than perfect.", ko: "완수하는 것이 완벽한 것보다 낫다.", author: "Sheryl Sandberg", authorKo: "셰릴 샌드버그" },
    { en: "Stay hungry, stay foolish.", ko: "계속 갈망하라, 여전히 우직하게.", author: "Steve Jobs", authorKo: "스티브 잡스" },
    { en: "The only way to do great work is to love what you do.", ko: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다.", author: "Steve Jobs", authorKo: "스티브 잡스" },
    { en: "Innovation distinguishes between a leader and a follower.", ko: "혁신은 리더와 추종자를 구분하는 잣대다.", author: "Steve Jobs", authorKo: "스티브 잡스" },
    { en: "If you look at what you have in life, you'll always have more.", ko: "당신이 가진 것에 주목한다면 항상 더 많이 갖게 될 것이다.", author: "Oprah Winfrey", authorKo: "오프라 윈프리" }
];

function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    if (!quoteEn || !quoteKo || !quoteAuthor) return;
    
    quoteEn.style.opacity = 0;
    quoteKo.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    setTimeout(() => {
        quoteEn.textContent = `"${quote.en}"`;
        quoteKo.textContent = quote.ko;
        quoteAuthor.textContent = `- ${quote.author} (${quote.authorKo})`;
        quoteEn.style.opacity = 1;
        quoteKo.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
    }, 300);
}
if (quoteBtn) quoteBtn.addEventListener('click', getRandomQuote);

// --- Lunch Roulette ---
let menus = ["김치찌개", "짜장면", "파스타", "비빔밥", "치킨", "돈까스", "쌀국수", "부대찌개", "제육볶음", "햄버거", "샐러드", "초밥"];
const menuImageMap = {
    "김치찌개": "kimchi,stew",
    "짜장면": "jajangmyeon,noodles",
    "파스타": "pasta",
    "비빔밥": "bibimbap",
    "치킨": "fried,chicken",
    "돈까스": "tonkatsu,pork,cutlet",
    "쌀국수": "pho,noodles",
    "부대찌개": "army,stew,korean",
    "제육볶음": "spicy,pork",
    "햄버거": "hamburger",
    "샐러드": "salad",
    "초밥": "sushi"
};

let history = [];
let isSpinning = false;
let rotation = 0;
const colors = ["#f8dada", "#dcf8da", "#dadcf8", "#f8f8da", "#daf8f8", "#f8daf8", "#e6f8da", "#dae6f8"];

function drawRoulette() {
    if (!canvas || !ctx) return;
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
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Arial";
        ctx.fillText(menu, radius - 10, 5);
        ctx.restore();
    });
}

if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        const spinAngle = (Math.random() * 5 + 5) * 2 * Math.PI;
        const startTime = performance.now();
        const duration = 3000;

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            rotation = spinAngle * easeOut;
            drawRoulette();
            if (progress < 1) requestAnimationFrame(animate);
            else {
                isSpinning = false;
                const finalRotation = rotation % (2 * Math.PI);
                const sliceAngle = (2 * Math.PI) / menus.length;
                let selectedIndex = Math.floor(((1.5 * Math.PI - finalRotation) % (2 * Math.PI)) / sliceAngle);
                if (selectedIndex < 0) selectedIndex += menus.length;
                const picked = menus[selectedIndex];
                if (selectedMenuName) selectedMenuName.textContent = picked;
                updateHistory(picked);
                fetchFoodImage(picked);
            }
        }
        requestAnimationFrame(animate);
    });
}

function updateHistory(menu) {
    if (!menuHistoryList) return;
    history.unshift(menu);
    if (history.length > 5) history.pop();
    menuHistoryList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

function fetchFoodImage(menu) {
    if (!foodImageContainer) return;
    const searchTag = menuImageMap[menu] || "food";
    foodImageContainer.innerHTML = `<img src="https://loremflickr.com/400/300/${searchTag}" alt="${menu}">`;
}

// --- Animal Test ---
const modelURL = "https://teachablemachine.withgoogle.com/models/9GGp5MtIlz/";
let animalModel;
const imageUpload = document.getElementById('image-upload');
const faceImage = document.getElementById('face-image');
const animalLabelContainer = document.getElementById('label-container');

async function loadAnimalModel() {
    if (!animalModel) {
        animalModel = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
    }
}

if (imageUpload) {
    imageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            faceImage.src = event.target.result;
            document.getElementById('upload-box').classList.add('hidden');
            document.getElementById('image-preview-container').classList.remove('hidden');
            document.getElementById('loading-spinner').classList.remove('hidden');
            await loadAnimalModel();
            const prediction = await animalModel.predict(faceImage);
            displayAnimalResult(prediction);
        };
        reader.readAsDataURL(file);
    });
}

function displayAnimalResult(prediction) {
    document.getElementById('loading-spinner').classList.add('hidden');
    document.getElementById('test-result-container').classList.remove('hidden');
    prediction.sort((a, b) => b.probability - a.probability);
    const top = prediction[0];
    document.getElementById('animal-result-title').textContent = `당신은 ${top.className === '강아지' ? '🐶' : '🐱'} ${top.className}상!`;
    animalLabelContainer.innerHTML = prediction.map(p => {
        const prob = (p.probability * 100).toFixed(0);
        const cls = p.className === '강아지' ? 'dog' : 'cat';
        return `
            <div class="result-bar-wrapper">
                <div class="result-label-text"><span>${p.className}</span><span>${prob}%</span></div>
                <div class="result-bar-bg"><div class="result-bar-fill ${cls}" style="width: ${prob}%"></div></div>
            </div>`;
    }).join('');
}

document.getElementById('retry-btn')?.addEventListener('click', () => {
    location.reload();
});

// --- Modal & Navigation ---
const modal = document.getElementById("privacy-modal");
const privacyLink = document.querySelector('a[href="#privacy"]');
const closeBtn = document.querySelector(".close");

if (privacyLink) {
    privacyLink.onclick = (e) => { e.preventDefault(); modal.style.display = "block"; }
}
if (closeBtn) {
    closeBtn.onclick = () => { modal.style.display = "none"; }
}
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#privacy") return;
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Init
getRandomQuote();
drawRoulette();
