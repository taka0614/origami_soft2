const hero = document.querySelector('.hero');
const video = document.querySelector('.hero-video');
const skipBtn = document.querySelector('.skip-btn');

const FALLBACK_DURATION = 8; // 動画の実際の長さ(秒)に合わせて調整
const FADE_DURATION = 3000; // ミリ秒。CSSのtransitionの秒数と合わせる

let savedScrollY = 0;

function lockScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY); // 元のスクロール位置に戻す
}

lockScroll(); // ページ読み込み時点(動画再生中)からスクロールを禁止しておく

function showContent() {
    if (hero.classList.contains('is-loaded')) return; // 二重発火防止
    hero.classList.add('is-loaded');
    unlockScroll();

    setTimeout(() => {
        video.pause();
    }, FADE_DURATION);
}

video.addEventListener('timeupdate', () => {
    const duration = isFinite(video.duration) ? video.duration : FALLBACK_DURATION;
    const remaining = duration - video.currentTime;
    if (remaining <= 3) {
        showContent();
    }
});

video.addEventListener('ended', () => {
    showContent();
});

skipBtn.addEventListener('click', showContent);



//ハンバーガーメニュー
const body = document.body;
const burger = document.getElementById('js-burger');
const mask = document.getElementById('mask');

function toggleMenu() {
    body.classList.toggle('menu-active');
    burger.classList.toggle('open');
    // syncNavBgPos();
}

burger.addEventListener('click', toggleMenu);
mask.addEventListener('click', toggleMenu);
//window.addEventListener('resize', syncNavBgPos);