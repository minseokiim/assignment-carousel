import '../styles/style.css';

const carousel = document.querySelector('.carousel') as HTMLElement;
const slides = document.querySelectorAll(
  '.carousel__slide',
) as NodeListOf<HTMLElement>;
const prevBtn = document.querySelector(
  '.carousel__button--left',
) as HTMLButtonElement;
const nextBtn = document.querySelector(
  '.carousel__button--right',
) as HTMLButtonElement;
const indicators = document.querySelectorAll(
  '.carousel__indicator',
) as NodeListOf<HTMLElement>;

let currentSlide = 0;
let autoPlay = true;
let slideInterval: number | undefined;
const slideSpeed = 3000; // 슬라이드 간격
const transitionDuration = 0.8; // 슬라이드 전환 속도

// 슬라이드 이동
function goToSlide(index: number): void {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    if (idx === currentSlide) {
      slide.classList.add('current-slide');
    } else {
      slide.classList.remove('current-slide');
    }
  });

  const offset = currentSlide * -100;
  const track = document.querySelector('.carousel__track') as HTMLElement;
  track.style.transform = `translateX(${offset}%)`;

  updateIndicators();
}

// 인디케이터 업데이트
function updateIndicators(): void {
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// 슬라이드 자동 전환
function startAutoPlay(): void {
  slideInterval = window.setInterval(() => {
    goToSlide(currentSlide + 1);
  }, slideSpeed);
}

// 자동 재생 멈춤
function stopAutoPlay(): void {
  clearInterval(slideInterval);
}

// 버튼
nextBtn.addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  stopAutoPlay();
  startAutoPlay();
});

prevBtn.addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  stopAutoPlay();
  startAutoPlay();
});

// 인디케이터
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.getAttribute('data-slide')!) - 1;
    goToSlide(slideIndex);
    stopAutoPlay();
    startAutoPlay();
  });
});

// 자동 재생 버튼
const playPauseBtn = document.createElement('button');
playPauseBtn.textContent = 'Pause';
playPauseBtn.classList.add('play-pause-btn');
document.body.appendChild(playPauseBtn);
playPauseBtn.addEventListener('click', () => {
  if (autoPlay) {
    stopAutoPlay();
    playPauseBtn.textContent = 'Play';
  } else {
    startAutoPlay();
    playPauseBtn.textContent = 'Pause';
  }
  autoPlay = !autoPlay;
});

// 초기화
goToSlide(0);
startAutoPlay();
