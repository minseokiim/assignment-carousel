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

let currentSlide: number = 0;
let autoPlay: boolean = true;
let slideInterval: number | null = null;
let slideSpeed: number = 1000; // 슬라이드 간격
let slideGap: number = 3000; // 자동 재생 간격

// 터치 스크린 스와이프 변수
let startX: number;
const threshold: number = 50; //최소 거리

// 슬라이드 이동
function moveSlide(index: number): void {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('current-slide', idx === currentSlide);
  });

  const offset: number = currentSlide * -100;
  const track = document.querySelector(
    '.carousel__track',
  ) as HTMLElement | null;

  if (track) {
    track.style.transform = `translateX(${offset}%)`;
    track.style.transitionDuration = `${slideSpeed}ms`;
  }

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
    playPauseBtn.textContent = '❚❚';
  } else {
    stopAutoPlay();
    playPauseBtn.textContent = '▶';
  }
});

// 슬라이드 속도 및 간격 변경 함수
function updateSettings(): void {
  const speedInput = document.getElementById('slideSpeed') as HTMLInputElement;
  const intervalInput = document.getElementById(
    'slideInterval',
  ) as HTMLInputElement;

  const newSpeed = parseInt(speedInput.value);
  const newInterval = parseInt(intervalInput.value);

  if (newSpeed === slideSpeed && newInterval === slideGap) {
    alert('변경된 값이 없습니다. 속도 또는 간격을 변경해 주세요.');
    return;
  }

  slideSpeed = newSpeed;
  slideGap = newInterval;

  console.log(slideSpeed, slideGap);

  stopAutoPlay();
  startAutoPlay();
}

document
  .getElementById('updateSettings')!
  .addEventListener('click', updateSettings);

// 터치 시작
const trackContainer = document.querySelector(
  '.carousel__track-container',
) as HTMLElement;

if (trackContainer) {
  trackContainer.addEventListener(
    'touchstart',
    (event: TouchEvent) => {
      const touch = event.touches[0];
      startX = touch.clientX;
    },
    { passive: true },
  );

  // 터치 이동
  trackContainer.addEventListener(
    'touchmove',
    (event: TouchEvent) => {
      event.preventDefault();
    },
    { passive: false },
  );

  // 터치 종료
  trackContainer.addEventListener(
    'touchend',
    (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const diffX = touch.clientX - startX;

      // 스와이프 인식
      if (Math.abs(diffX) > threshold) {
        moveSlide(currentSlide + (diffX > 0 ? -1 : 1));
      }
    },
    { passive: true },
  );
}

// 초기화
moveSlide(0);
startAutoPlay();
