import '../styles/style.css';
import { debounce } from './debounce';
import { throttle } from './throttle';

const slides = document.querySelectorAll(
  '.carousel__slide',
) as NodeListOf<HTMLElement>;
const prevBtn = document.getElementById(
  'carousel__btn--left',
) as HTMLButtonElement;
const nextBtn = document.getElementById(
  'carousel__btn--right',
) as HTMLButtonElement;
const indicators = document.querySelectorAll(
  '.carousel__indicator',
) as NodeListOf<HTMLElement>;
const playPauseBtn = document.getElementById(
  'play-pause-btn',
) as HTMLButtonElement;
const track = document.getElementById('carousel__track') as HTMLElement | null;

// 슬라이드 클론
const firstSlide = slides[0].cloneNode(true) as HTMLElement;
const lastSlide = slides[slides.length - 1].cloneNode(true) as HTMLElement;
track?.appendChild(firstSlide);
track?.insertBefore(lastSlide, slides[0]);

let currentSlide: number = 1; // 클론을 고려하여 시작 인덱스 조정
let autoPlay: boolean = true;
let slideInterval: number | null = null;
let slideSpeed: number = 1000; // 슬라이드 간격
let slideGap: number = 3000; // 자동 재생 간격

let startX: number; // 터치 스크린 스와이프 변수
const threshold: number = 50; // 스와이프를 인식하기 위한 최소 이동 거리
let isTransitioning = false; // 슬라이드 이동 중인지 확인

// 슬라이드 이동
function moveSlide(index: number): void {
  if (isTransitioning) return;
  isTransitioning = true;

  const previousSlide = currentSlide;

  if (index < 0) {
    currentSlide = slides.length;
  } else if (index > slides.length + 1) {
    currentSlide = 1;
  } else {
    currentSlide = index;
  }

  if (track) {
    // 마지막 -> 첫 번째
    if (previousSlide === slides.length && currentSlide === 1) {
      track.style.transitionDuration = '0ms';
      track.style.transform = `translateX(${-(slides.length + 1) * 100}%)`;

      requestAnimationFrame(() => {
        track.style.transitionDuration = `${slideSpeed}ms`;
        track.style.transform = `translateX(-100%)`;
      });
    }
    // 첫 번째 -> 마지막
    else if (previousSlide === 1 && currentSlide === slides.length) {
      track.style.transitionDuration = '0ms';
      track.style.transform = `translateX(0%)`;

      requestAnimationFrame(() => {
        track.style.transitionDuration = `${slideSpeed}ms`;
        track.style.transform = `translateX(-${slides.length * 100}%)`;
      });
    } else {
      track.style.transitionDuration = `${slideSpeed}ms`;
      track.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    setTimeout(() => {
      isTransitioning = false;
    }, slideSpeed);
  }

  updateIndicators();
}

// 인디케이터 업데이트
function updateIndicators(): void {
  const adjustedIndex = (currentSlide - 1 + slides.length) % slides.length;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === adjustedIndex);
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

// 이전/다음 슬라이드 이동 버튼
nextBtn?.addEventListener('click', () => {
  stopAutoPlay();
  moveSlide(currentSlide + 1);
  startAutoPlay();
});

prevBtn?.addEventListener('click', () => {
  stopAutoPlay();
  moveSlide(currentSlide - 1);
  startAutoPlay();
});

// 인디케이터 클릭 시 슬라이드 이동
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.getAttribute('data-slide')!) - 1;
    moveSlide(slideIndex + 1);
    stopAutoPlay();
    startAutoPlay();
  });
});

// 재생/일시정지 기능
playPauseBtn?.addEventListener('click', () => {
  autoPlay = !autoPlay;

  if (autoPlay) {
    startAutoPlay();
    playPauseBtn.textContent = '❚❚';
    playPauseBtn.setAttribute('aria-pressed', 'true');
    playPauseBtn.setAttribute('aria-label', '자동 재생 중');
  } else {
    stopAutoPlay();
    playPauseBtn.textContent = '▶';
    playPauseBtn.setAttribute('aria-pressed', 'false');
    playPauseBtn.setAttribute('aria-label', '자동 재생 시작');
  }
});

// 슬라이드 속도 및 간격 변경 함수
function updateSettings(): void {
  const speedInput = document.getElementById('slideSpeed') as HTMLInputElement;
  const intervalInput = document.getElementById(
    'slideInterval',
  ) as HTMLInputElement;
  const errorMessage = document.getElementById('error-message') as HTMLElement;

  const newSpeed = parseInt(speedInput.value);
  const newInterval = parseInt(intervalInput.value);

  if (newSpeed === slideSpeed && newInterval === slideGap) {
    alert('변경된 값이 없습니다. 속도 또는 간격을 변경해 주세요.');
    return;
  }

  if (
    isNaN(newSpeed) ||
    isNaN(newInterval) ||
    newSpeed <= 0 ||
    newInterval <= 0
  ) {
    errorMessage.classList.add('error-message');
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  slideSpeed = newSpeed;
  slideGap = newInterval;

  stopAutoPlay();
  startAutoPlay();
}

// 디바운스 적용
document
  .getElementById('btn-update')!
  .addEventListener('click', () => debounce(updateSettings, 300)());

// 터치 시작
const trackContainer = document.getElementById(
  'carousel__track-container',
) as HTMLElement;

if (trackContainer) {
  trackContainer.addEventListener(
    'touchstart',
    (event: TouchEvent) => {
      stopAutoPlay();
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
  const throttledMoveSlide = throttle((diffX: number) => {
    moveSlide(currentSlide + (diffX > 0 ? -1 : 1));
  }, 300);

  trackContainer.addEventListener(
    'touchend',
    (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const diffX = touch.clientX - startX;

      if (Math.abs(diffX) > threshold) {
        throttledMoveSlide(diffX);
      }
      startAutoPlay();
    },
    { passive: true },
  );
}

// 초기화
moveSlide(1);
startAutoPlay();
