## ✔️ 소개

프레임워크나 라이브러리 없이 HTML, CSS, TypeScript를 사용하여 무한히 반복되는 캐러셀을 구현하였습니다.
<br/> <br/>

## 💻 배포 링크

https://infinite-carousel-pearl.vercel.app/
<br/>
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

- pc를 기준으로 구현
- 패드와 모바일 추가

<br/>

## ⚒️ 기술 스택

- **HTML** : 구조 및 콘텐츠 작성
- **CSS** : 스타일링
- **TypeScript** : DOM 조작 및 이벤트 처리 구현
- **Vite** : 빌드
- **ESlint** : 정적 코드 분석 도구
- **Prettier** : 코드 포맷팅으로 코드 스타일 유지
- **Vercel** : 배포를 통해 미리보기 기능 제공
  <br/> <br/>

## 📰 구조

```
Infinite-Carousel
├── node_modules/
├── public/                # 캐러셀에서 사용한 이미지 저장
├── src/
│   ├── scripts/
│   │   ├── carousel.ts    # 메인 캐러셀 기능 구현
│   │   ├── debounce.ts    # 디바운스 함수 정의
│   │   └── throttle.ts     # 쓰로틀링 함수 정의
│   ├── styles/            # 스타일 정의한 css 파일
│   │   └── style.css
├── index.html             # 캐러셀 구조 작성
├── vite.config.ts
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── .prettierrc
```

<br/>

## 💻 사용법

### 1. 로컬에서 실행하기

1. `git clone` 받은 후, 터미널에서 `cd infinite-carousel`합니다.
2. `npm install`후, `npm run dev`로 실행합니다.
3. 원하는 이미지를 넣고 싶다면, `/public`에 순서대로 'first ~ fifth.png'로 저장합니다.

### 2. 미리보기 페이지

1. 캐러셀이 무한하게 이동됩니다. 기본 속도와 간격은 각각 1000ms, 3000ms입니다.
2. 속도와 간격을 바꿀 수 있습니다. 바꾸지 않으면 경고창이 뜹니다.
3. 인디케이터로 현재 슬라이드를 알 수 있습니다.
4. 인디케이터 눌러서 이동 가능합니다.
5. 인디케이터 우측에 자동 재생을 멈추고 재개할 수 있는 버튼이 있습니다.
   <br/> <br/>

## 💡 코드 설명

#### 1. HTML 구조

`index.html`에 캐러셀 구조를 정의하였습니다.
슬라이드는 총 5개로 설정하였고, 순서대로 이름을 'first ~ fifth.png'로 설정하였습니다.

```
// index.html
 <div id="carousel">
      <!-- 캐러셀 슬라이드 이미지 -->
      <div id="carousel__track-container">
        <ul id="carousel__track">
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
  '.carousel__slide',
) as NodeListOf<HTMLElement>;

...

let currentSlide: number = 0; //현재 슬라이드
let autoPlay: boolean = true; //자동 재생 여부
let slideInterval: number | null = null; // 자동 재생  중단 및 재시작을 위한 변수
let slideSpeed: number = 1000; // 슬라이드 간격
let slideGap: number = 3000; // 자동 재생 간격

```

#### 3. 슬라이드 이동

슬라이드 전환 속도와 간격을 기본값(1000ms, 3000ms)으로 설정하고, `moveSlide()` 함수를 통해 인덱스에 따라 슬라이드를 이동시키며, 현재 슬라이드에 해당하는 인디케이터를 업데이트합니다.

```
// 슬라이드 클론
const firstSlide = slides[0].cloneNode(true) as HTMLElement;
const lastSlide = slides[slides.length - 1].cloneNode(true) as HTMLElement;
track?.appendChild(firstSlide);
track?.insertBefore(lastSlide, slides[0]);
..

// 슬라이드 이동
function moveSlide(index: number, withTransition: boolean = true): void {
  if (!track) return;
 if (withTransition) {
    track.style.transitionDuration = `${slideSpeed}ms`;
  } else {
    track.style.transitionDuration = '0ms';
  }
  ..

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

#### 5. 이전/다음 슬라이드 이동 버튼

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

#### 6. 인디케이터

`updateIndicators()`를 통해 현재 활성 슬라이드를 알 수 있습니다.
인디케이터를 클릭하면 해당 슬라이드로 이동하도록 `addEventListener`로 이벤트 리스너를 추가했습니다. 인디케이터 클릭 시 자동 재생이 멈추고 다시 시작됩니다.

```
// 인디케이터 업데이트
function updateIndicators(): void {
let adjustedIndex = currentSlide - 1;
...
indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === adjustedIndex);
  });
}

..

// 인디케이터 클릭 시 슬라이드 이동
indicators.forEach((indicator, idx) => {
  indicator.addEventListener('click', () => {
    stopAutoPlay();
    moveSlide(idx + 1);
    startAutoPlay();
  });
});
```

#### 7. 자동 재생 일시정지 및 재개

슬라이드 하단의 플레이/일시 정지 버튼 클릭 시 자동 재생 상태를 전환할 수 있습니다. 클릭 될 때마다 버튼 텍스트가 변경됩니다.
접근성을 위해 `aria-pressed` 속성과 `aria-label`을 추가하였습니다.

```
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
```

#### 8. 슬라이드 속도 및 간격 변경 가능

`updateSettings()`로 슬라이드 속도와 간격을 변경할 수 있는 입력 요소를 추가하고, 이를 통해 사용자가 직접 설정할 수 있도록 했습니다. 설정이 변경되면 `moveSlide()`에서 css에 반영되어 슬라이드가 전환됩니다.
숫자만 입력할 수 있도록 설정하였으며, 수정하지 않고 적용을 누르는 경우에는 경고창이 뜹니다. 0을 입력하거나 마이너스 값 등의 정상적인 숫자가 아닌 경우에는 경고 문구가 표시됩니다.
디바운스를 적용하여, 사용자가 설정을 변경하는 동안 불필요한 호출을 방지하였습니다.

```
// 슬라이드 속도 및 간격 변경 함수
function updateSettings(): void {
  const speedInput = document.getElementById('slideSpeed') as HTMLInputElement;
  const intervalInput = document.getElementById(
    'slideInterval',
  ) as HTMLInputElement;

  const newSpeed = parseInt(speedInput.value);
  const newInterval = parseInt(intervalInput.value);

    ...
  slideSpeed = newSpeed;
  slideGap = newInterval;

  stopAutoPlay();
  startAutoPlay();

}
...
// 디바운스 적용
document
  .getElementById('btn-update')!
  .addEventListener('click', () => debounce(updateSettings, 300)());

// 변경된 값 반영
function moveSlide(index: number): void {
...
if (track) {
  ..
} else {
      const offset: number = currentSlide * -100;
      track.style.transform = `translateX(${offset}%)`;
      track.style.transitionDuration = `${slideSpeed}ms`;
    }
...
}


```

#### 9. 터치 스크린 장치에서 제스처 인식

터치 스크린 스와이프를 위한 변수 `startX`와 `threshold`를 추가했습니다.
사용자가 터치한 시작 위치`startX` 에 저장했고, 종료 위치로 차이를 계산한 `diffX`로 스와이프 방향을 결정합니다.
터치 이벤트 처리에 쓰로틀링을 추가하여, 스와이프 인식 시 과도한 호출을 방지했습니다.

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

  // 터치 종료 -> 쓰로틀링 추가
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
