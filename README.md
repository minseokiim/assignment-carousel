## 소개

HTML, CSS, 순수 JavaScript를 사용하여 무한히 반복되는 캐러셀 구현

## 미리보기

https://infinite-carousel-pearl.vercel.app/

## 주요 기능

1. 캐러셀 기본 동작
   - 최소 5개 이상의 슬라이드를 포함하는 캐러셀
   - 슬라이드는 자동으로 좌우로 움직이며, 마지막 슬라이드가 지나면 첫 번째 슬라이드로 넘어감
   - 슬라이드 전환 속도와 간격은 화면에서 조절 가능 <br/><br/>
2. 캐러셀의 제어 기능
   - 다음 슬라이드/이전 슬라이드로 이동하는 버튼 구현
   - 현재 활성 슬라이드를 나타내는 인디케이터를 추가
   - 인디케이터 클릭으로 특정 슬라이드를 선택할 수 있음
   - 자동 재생을 일시정지/재개할 수 있음
   - 터치 스크린 장치에서의 스와이프 제스처를 인식하여 슬라이드 제어 가능<br/><br/>
3. 기타
   - 반응형 웹 디자인 적용

## 기술 스택

- **HTML** : 구조 및 콘텐츠 작성
- **CSS** : 스타일링
- **TypeScript** : DOM 조작 및 이벤트 처리 구현
- **Vite** : 빌드
- **ESlint** : 정적 코드 분석 도구
- **Prettier** : 코드 포맷팅으로 코드 스타일 유지
- **Vercel** : 배포를 통해 미리보기 기능 제공

## 구조

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

## 사용법
