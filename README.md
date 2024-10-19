## ✔️ 소개

프레임워크나 라이브러리 없이
HTML, CSS, 순수 JavaScript를 사용하여 무한히 반복되는 캐러셀 구현하기
<br/>

## 💻 미리보기

https://infinite-carousel-pearl.vercel.app/
<br/>

## ⭐ 주요 기능

### 1. 캐러셀 기본 동작

- 최소 5개 이상의 슬라이드를 포함하는 캐러셀
- 슬라이드는 자동으로 좌우로 움직이며, 마지막 슬라이드가 지나면 첫 번째 슬라이드로 넘어감
- 슬라이드 전환 속도와 간격은 화면에서 조절 가능

### 2. 캐러셀의 제어 기능

- 다음 슬라이드/이전 슬라이드로 이동하는 버튼 구현
- 현재 활성 슬라이드를 나타내는 인디케이터를 추가
- 인디케이터 클릭으로 특정 슬라이드를 선택할 수 있음
- 자동 재생을 일시정지/재개할 수 있음
- 터치 스크린 장치에서의 스와이프 제스처를 인식하여 슬라이드 제어 가능

### 3. 반응형 웹 디자인 적용

<br/>

## ⚒️ 기술 스택

- **HTML** : 구조 및 콘텐츠 작성
- **CSS** : 스타일링
- **TypeScript** : DOM 조작 및 이벤트 처리 구현
- **Vite** : 빌드
- **ESlint** : 정적 코드 분석 도구
- **Prettier** : 코드 포맷팅으로 코드 스타일 유지
- **Vercel** : 배포를 통해 미리보기 기능 제공
  <br/>

## 📰 구조

```
Infinite-Carousel
├── node_modules/
├── public/ : 캐러셀에서 사용한 이미지 저장
├── src/
│ ├── carousel.ts : 캐러셀 이벤트 처리
│ ├── style.css : 스타일 정의한 css 파일
├── index.html : 캐러셀 구조 작성
├── vite.config.ts
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── .prettierrc
```

<br/>

## 💻 사용법

### 1. local에서 실행하기

1. `git clone` 받은 후, 터미널에서 `cd infinite-carousel`해줍니다.
2. `npm install`해주고, `npm run dev`로 실행합니다.
3. 원하는 이미지를 넣고 싶다면, /public에 순서대로 'first ~ fifth.png'로 저장해줍니다.

### 2. 미리보기 페이지

1. 캐러셀이 무한하게 이동됩니다. 기본 속도와 간격은 각각 1000ms, 3000ms입니다.
2. 속도와 간격을 바꿀 수 있습니다. 바꾸지 않으면 경고창이 뜹니다.
3. 인디케이터로 현재 슬라이드를 알 수 있습니다.
4. 인디케이터 눌러서 이동 가능합니다.
5. 인디케이터 우측에 자동 재생을 멈추고 재개할 수 있는 버튼이 있습니다.
   <br/>

## 💡 코드 설명

#### 1. HTML 구조

`index.html`에 캐러셀 구조를 정의하였습니다.
슬라이드는 총 5개로 설정하였고, 순서대로 이름을 'first ~ fifth.png'로 설정하였습니다.

```
// index.html
 <div class="carousel">
      <!-- 캐러셀 슬라이드 이미지 -->
      <div class="carousel__track-container">
        <ul class="carousel__track">
          <li class="carousel__slide current-slide">
            <img src="/first.png" alt="Slide 1" />
          </li>
        ...
          <li class="carousel__slide">
            <img src="/fifth.png" alt="Slide 5" />
          </li>
        </ul>
      </div>

```

#### 2. 변수 할당 및 초기화

캐러셀 구현에 필요한 슬라이드와 버튼 요소들을 HTML 문서에서 가져와 변수에 할당했습니다.
이벤트 리스너를 추가하고, 슬라이드를 조작하는 데 사용됩니다.

```

// carousel.ts
const slides = document.querySelectorAll(
'.carousel\_\_slide',
) as NodeListOf<HTMLElement>;

...

let currentSlide: number = 0; //현재 슬라이드
let autoPlay: boolean = true; //자동 재생 여부
let slideInterval: number | null = null; // 자동 재생  중단 및 재시작을 위한 변수
let slideSpeed: number = 1000; // 슬라이드 간격
let slideGap: number = 3000; // 자동 재생 간격

```

#### 3. 슬라이드 이동 및 인디케이터 업데이트

`moveSlide()`함수를 통해 인덱스에 따라 슬라이드를 이동시키고, ` updateIndicators()` 함수를 호출하여 현재 슬라이드에 해당하는 인디케이터를 업데이트 했습니다.
`slides.length` 를 사용하여 마지막 슬라이드에서 첫 번째 슬라이드로 원형 이동이 가능하도록 구현했습니다.

```

// 슬라이드 이동
function moveSlide(index: number): void {
currentSlide = (index + slides.length) % slides.length;

slides.forEach((slide, idx) => {
slide.classList.toggle('current-slide', idx === currentSlide);
});

const offset: number = currentSlide \* -100;
const track = document.querySelector(
'.carousel\_\_track',
) as HTMLElement | null;

...
updateIndicators();
}

// 인디케이터 업데이트
function updateIndicators(): void {
indicators.forEach((indicator, index) => {
indicator.classList.toggle('active', index === currentSlide);
});
}

```

#### 4. 자동 재생 기능

슬라이드 자동 전환을 위한 `startAutoPlay()`와 자동 재생을 멈추기 위한 `stopAutoPlay()` 함수를 구현했습니다. 슬라이드가 일정 간격으로 자동으로 전환되도록 합니다.

```

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
```

#### 5. 이전/다음 버튼 기능

사용자가 이전 또는 다음 버튼을 클릭할 때 슬라이드를 전환할 수 있도록 `addEventListener`로 이벤트 리스너를 추가했습니다. 버튼 클릭 시 자동 재생이 멈추고 슬라이드 이동 후 다시 자동 재생을 시작합니다.

```
// 전/후 버튼
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
```

#### 6. 인디케이터 클릭 이벤트

인디케이터를 클릭하면 해당 슬라이드로 이동하도록 `addEventListener`로 이벤트 리스너를 추가했습니다. 인디케이터 클릭 시 자동 재생이 멈추고 다시 시작됩니다.

```
// 인디케이터 클릭 시 슬라이드 이동
indicators.forEach((indicator) => {
  indicator.addEventListener('click', () => {
    const slideIndex = parseInt(indicator.getAttribute('data-slide')!) - 1;
    moveSlide(slideIndex);
    stopAutoPlay();
    startAutoPlay();
  });
});
```

#### 7. 자동 재생 일시정지 및 재개

플레이/일시 정지 버튼 클릭 시 자동 재생 상태를 전환할 수 있도록 `addEventListener`로 이벤트 리스너를 추가합니다. 자동 재생이 재개될 때 버튼 텍스트가 변경됩니다.

```
playPauseBtn?.addEventListener('click', () => {
  autoPlay = !autoPlay;
  if (autoPlay) {
    startAutoPlay();
    playPauseBtn.textContent = '❚❚';
  } else {
    stopAutoPlay();
    playPauseBtn.textContent = '▶';
  }
});
```

#### 8. 슬라이드 속도 및 간격 변경 가능:

`updateSettings()`로 슬라이드 속도와 간격을 변경할 수 있는 입력 요소를 추가하고, 이를 통해 사용자가 직접 설정할 수 있도록 했습니다. 설정이 변경되면 `moveSlide()`에서 css에 반영되어 슬라이드가 전환됩니다.

```
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

  stopAutoPlay();
  startAutoPlay();
}
...
document
  .getElementById('updateSettings')!
  .addEventListener('click', updateSettings);

// 변경된 값 반영
function moveSlide(index: number): void {
...
if (track) {
track.style.transform = `translateX(${offset}%)`;
track.style.transitionDuration = `${slideSpeed}ms`;
}
...
}

// style.css
.carousel__track {
  transition: transform var(--transition-duration, 0.1s) ease;
..
}


```

#### 9. 터치 스크린 장치에서 제스처 인식

터치 스크린 스와이프를 위한 변수 `startX`와 `threshold`를 추가했습니다.
또, 사용자가 스와이프 제스처를 인식하여 슬라이드를 제어할 수 있도록 이벤트 리스너를 설정했습니다.
사용자가 터치한 시작 위치와 종료 위치의 차이를 계산하여 스와이프 방향을 결정합니다.
스와이프 제스처를 인식하기 위해, 사용자가 터치한 시작 위치를 `startX` 에 저장했고, 터치가 종료된 후 시작 위치와 종료 위치의 차이를 `diffX`로 계산합니다.

```
let startX: number; // 터치 스크린 스와이프 변수
const threshold: number = 50; // 스와이프를 인식하기 위한 최소 이동 거리
...

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
```

#### 10. 초기화하여 시작

슬라이드를 초기화하고 자동 재생을 시작하는 부분입니다.
첫 번째 슬라이드를 현재 슬라이드로 설정하고, 자동 재생을 시작하는 역할을 합니다.

```
moveSlide(0);
startAutoPlay();
```
