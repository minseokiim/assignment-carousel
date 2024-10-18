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

let currentSlide = 0;
let autoPlay = true; //자동재생 여부
let slideInterval: number | null = null;
const slideSpeed = 1000; // 슬라이드 간격

// 슬라이드 이동
function moveSlide(index: number): void {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('current-slide', idx === currentSlide);
  });

  const offset = currentSlide * -100;
  const track = document.querySelector('.carousel__track') as HTMLElement;
  track.style.transform = `translateX(${offset}%)`;

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
    // autoPlay가 true이고 slideInterval이 설정되어 있지 않을 때만
    slideInterval = window.setInterval(() => {
      moveSlide(currentSlide + 1);
    }, slideSpeed);
  }
}

// 자동 재생 멈춤
function stopAutoPlay(): void {
  if (slideInterval) {
    clearInterval(slideInterval); // 현재 interval을 정지
    slideInterval = null; // slideInterval을 null로 설정
  }
}

// 전/후 버튼
nextBtn.addEventListener('click', () => {
  moveSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
  moveSlide(currentSlide - 1);
});

// 인디케이터
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.getAttribute('data-slide')!) - 1;
    moveSlide(slideIndex);
    stopAutoPlay();
    startAutoPlay();
  });
});

// 재생 버튼
const playPauseBtn = document.createElement('button');
playPauseBtn.textContent = 'Pause';
playPauseBtn.classList.add('play-pause-btn');
document.body.appendChild(playPauseBtn);

playPauseBtn.addEventListener('click', () => {
  // 1. 처음 동작때 autoPlay가 true임
  // 2. 버튼 클릭시 false됨
  // 4. 다시 클릭시 true됨
  autoPlay = !autoPlay;
  if (autoPlay) {
    // 5. 그리고 자동 실행
    console.log('자동 재생');
    startAutoPlay(); // 상태가 true일 때 자동 재생 시작
    playPauseBtn.textContent = 'Pause';
  } else {
    // 3. 그리고 바로 중지
    console.log('자동 재생 중지');
    stopAutoPlay(); // 상태가 false일 때 자동 재생 중지
    playPauseBtn.textContent = 'Play';
  }
});

// 초기화
moveSlide(0);
startAutoPlay();
