import '../styles/style.css';

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
const playPauseBtn = document.querySelector(
  '.play-pause-btn',
) as HTMLButtonElement;

let currentSlide = 0;
let autoPlay = true;
let slideInterval: number | null = null;
let slideSpeed = 1000; // 슬라이드 간격
let slideGap = 3000; // 자동 재생 간격

// 슬라이드 이동
function moveSlide(index: number): void {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('current-slide', idx === currentSlide);
  });

  const offset = currentSlide * -100;
  const track = document.querySelector('.carousel__track') as HTMLElement;
  track.style.transform = `translateX(${offset}%)`;
  track.style.transitionDuration = `${slideSpeed}ms`;

  updateIndicators();
}

// 인디케이터 업데이트
function updateIndicators(): void {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// 슬라이드 자동 전환
function startAutoPlay(): void {
  if (autoPlay && !slideInterval) {
    slideInterval = window.setInterval(() => {
      moveSlide(currentSlide + 1);
    }, slideGap);
  }
}

// 자동 재생 멈춤
function stopAutoPlay(): void {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

// 전/후 버튼
nextBtn.addEventListener('click', () => {
  moveSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
  moveSlide(currentSlide - 1);
});

// 인디케이터 클릭 시 슬라이드 이동
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.getAttribute('data-slide')!) - 1;
    moveSlide(slideIndex);
    stopAutoPlay();
    startAutoPlay();
  });
});

// 재생/일시정지 버튼 추가 및 기능
playPauseBtn.addEventListener('click', () => {
  autoPlay = !autoPlay;
  if (autoPlay) {
    startAutoPlay();
    playPauseBtn.textContent = '자동 재생 정지하려면 클릭!';
  } else {
    stopAutoPlay();
    playPauseBtn.textContent = '자동 재생 시작하려면 클릭!';
  }
});

// 슬라이드 속도 및 간격 변경 함수
function updateSettings(): void {
  const speedInput = document.getElementById('slideSpeed') as HTMLInputElement;
  const intervalInput = document.getElementById(
    'slideInterval',
  ) as HTMLInputElement;

  console.log('변경 전', slideSpeed, slideGap);

  slideSpeed = parseInt(speedInput.value);
  slideGap = parseInt(intervalInput.value);

  console.log('변경 후', slideSpeed, slideGap);

  stopAutoPlay();
  startAutoPlay();
}

document
  .getElementById('updateSettings')!
  .addEventListener('click', updateSettings);

// 초기화
moveSlide(0);
startAutoPlay();
