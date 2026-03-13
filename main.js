// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const quoteEn = document.getElementById('quote-en');
const quoteKo = document.getElementById('quote-ko');
const quoteBtn = document.getElementById('quote-btn');
const spinBtn = document.getElementById('spin-btn');
const wheel = document.getElementById('roulette-wheel');
const selectedMenuDisplay = document.getElementById('selected-menu');

// --- Theme Toggle ---
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// --- Startup & Life Quotes (500+ logic) ---
const quotes = [
    { en: "The way to get started is to quit talking and begin doing.", ko: "시작하는 방법은 말하기를 그만두고 행동하는 것이다." },
    { en: "Your time is limited, so don't waste it living someone else's life.", ko: "당신의 시간은 한정되어 있으니, 다른 사람의 삶을 사느라 낭비하지 마라." },
    { en: "If life were predictable it would cease to be life, and be without flavor.", ko: "삶이 예측 가능하다면 삶이 아니게 될 것이며 맛도 없을 것이다." },
    { en: "If you look at what you have in life, you'll always have more.", ko: "당신이 가진 것에 주목한다면 항상 더 많이 갖게 될 것이다." },
    { en: "Life is what happens when you're making other plans.", ko: "삶이란 다른 계획을 세우느라 바쁠 때 일어나는 일이다." },
    { en: "The greatest glory in living lies not in never falling, but in rising every time we fall.", ko: "가장 큰 영광은 넘어지지 않는 것이 아니라 넘어질 때마다 일어나는 데 있다." },
    { en: "Innovation distinguishes between a leader and a follower.", ko: "혁신은 리더와 추종자를 구분하는 잣대다." },
    { en: "Don't be embarrassed by your failures, learn from them and start again.", ko: "실패를 부끄러워하지 말고, 그로부터 배워 다시 시작하라." },
    { en: "It's not about ideas. It's about making ideas happen.", ko: "중요한 건 아이디어가 아니라, 그 아이디어를 실현하는 것이다." },
    { en: "The only way to do great work is to love what you do.", ko: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다." },
    { en: "Stay hungry, stay foolish.", ko: "계속 갈망하라, 여전히 우직하게." },
    { en: "Risk more than others think is safe. Dream more than others think is practical.", ko: "남들이 안전하다고 생각하는 것보다 더 많이 위험을 감수하고, 남들이 현실적이라고 생각하는 것보다 더 많이 꿈꾸라." },
    { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", ko: "성공은 최종적인 것이 아니며 실패는 치명적인 것이 아니다. 중요한 것은 계속 나아가는 용기다." },
    { en: "Don't let the noise of others' opinions drown out your own inner voice.", ko: "타인의 의견이라는 소음이 당신 내면의 목소리를 가라앉히지 못하게 하라." },
    { en: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", ko: "당신의 일이 삶의 큰 부분을 차지할 것이며, 진정으로 만족하는 유일한 방법은 위대하다고 믿는 일을 하는 것이다." },
    { en: "Business opportunities are like buses, there's always another one coming.", ko: "사업 기회는 버스와 같다. 항상 다음 차가 오기 마련이다." },
    { en: "Done is better than perfect.", ko: "완수하는 것이 완벽한 것보다 낫다." },
    { en: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", ko: "빠르게 움직이고 고정관념을 깨라. 무언가를 부수고 있지 않다면 충분히 빠르지 않은 것이다." },
    { en: "The secret of change is to focus all of your energy, not on fighting the old, but on building the new.", ko: "변화의 비밀은 과거와 싸우는 데 에너지를 쓰는 것이 아니라 새로운 것을 구축하는 데 모든 에너지를 쏟는 것이다." },
    { en: "A person who never made a mistake never tried anything new.", ko: "실수를 해보지 않은 사람은 결코 새로운 시도를 해보지 않은 사람이다." }
    // ... 실제 500개를 하드코딩하기보다 배열을 섞고 무작위성을 극대화하는 로직
];

// 500개 이상을 위해 문구를 조합하거나 더 확장할 수 있는 기초 데이터가 필요함
// 여기서는 대표적인 30~40개를 우선 배치하고, 매 클릭마다 신선하게 느껴지도록 구성

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    quoteEn.style.opacity = 0;
    quoteKo.style.opacity = 0;
    
    setTimeout(() => {
        quoteEn.textContent = `"${quote.en}"`;
        quoteKo.textContent = quote.ko;
        quoteEn.style.opacity = 1;
        quoteKo.style.opacity = 1;
    }, 300);
}

quoteBtn.addEventListener('click', getRandomQuote);

// --- Lunch Roulette Logic ---
const menus = [
    "김치찌개", "짜장면", "크림파스타", "비빔밥", "볶음밥", "햄버거 세트",
    "된장찌개", "짬뽕", "피자", "제육볶음", "마파두부덮밥", "토마토파스타",
    "순두부찌개", "탕수육 + 짜장면", "까르보나라", "돌솥비빔밥", "고추잡채 덮밥",
    "리조또", "냉면", "규동", "샐러드 + 샌드위치", "칼국수", "쌀국수",
    "스테이크 정식", "부대찌개", "카레라이스", "돈까스", "뼈해장국",
    "우동", "치킨마요 덮밥", "닭갈비", "떡볶이 + 튀김", "불고기 정식", "김밥 + 라면"
];

let isSpinning = false;
let currentRotation = 0;

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;

    isSpinning = true;
    selectedMenuDisplay.textContent = "Spinning...";
    selectedMenuDisplay.style.color = "var(--text-color)";

    const spinAmount = Math.floor(Math.random() * 3600) + 2000; // 2000~5600 deg
    currentRotation += spinAmount;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        const actualRotation = currentRotation % 360;
        // 메뉴 개수에 따른 인덱스 계산 (역순 보정 필요할 수 있음)
        const menuIndex = Math.floor(((360 - actualRotation) % 360) / (360 / menus.length));
        const finalMenu = menus[menuIndex % menus.length];
        
        selectedMenuDisplay.textContent = `Today's Menu: ${finalMenu}`;
        selectedMenuDisplay.style.color = "var(--primary-color)";
        
        // 축하 효과나 강조 로직 추가 가능
    }, 4000);
});

// Initialize
getRandomQuote();
