### **프로젝트 소개( Introduction )**

---

###

<aside>

**[☑️ 루틴 템플릿을 조합해, 나만의 특별한 '오늘' 을 계획해보세요 :) ( Click Me )](https://apps.apple.com/app/today-focus-routine-planner/id6443668342)**

</aside>

> 하루의 루틴을 템플릿으로 만들어 관리해보세요. <br>간단한 조작만으로 손쉽게 완성된 '오늘' 의 투두리스트를 확인할 수 있습니다.</br> <br>#️⃣ TodoList Service #️⃣ Routine Template #️⃣ React Native</br>

![Today Focus 시연영상](https://user-images.githubusercontent.com/93423531/194690705-8e46ce07-478a-4a4a-a280-15c2544e566a.gif)

### **프로젝트 동기( Motivation )**

---

###

> Google Keep📝 애용자로서 기능의 부족함을 느꼈던 소감을 토대로, 재사용성 높은 투두리스트를 개발하고자 템플릿 기반의 투두리스트 앱 프로젝트를 기획 및 개발하게 되었습니다.

### **실행 방법( How to run )**

---

- git clone

  ```
  $ git clone https://github.com/today-focus/today-focus.git
  ```

- yarn start

  ```
  $ yarn start
  ```

### **프로젝트 일정( Schedule )**

---

###

**📆 전체 기간**

`2022년 9월 1일 ~ 2022년 10월 3일`

<details><summary>Week 1 - 기획 및 설계</summary>

`2022년 9월 1일 ~ 2022년 9월 4일`

- 아이디어 구상 및 선정
- Figma Mock Up 작성
- 칸반(KANBAN) 작성
- React Native(RN) 학습
- Github 레포 설정(+ Git 및 코드 컨벤션)

</details>

<details><summary>Week 2, 3 - 기능 개발</summary>

`2022년 9월 5일 ~ 2022년 9월 9일`
<br>`2022년 9월 12일 ~ 2022년 9월 25일`</br>

- SplashScreen 레이아웃 구현
- MainScreen 레이아웃 구현

---

- BottomDrawer 컴포넌트 구현
  - 하단의 탭 버튼 클릭 시, BottomSheetModal 올라옴
  - BottomSheetModal > Carousel > CarouselCard / RoutineTemplate 컴포넌트 구현
- TodoList 컴포넌트 구현
  - TodoList > TodoItem 컴포넌트 구현
  - TodoList 내 TodoItem의 입력-저장-수정-삭제 기능 구현
  - TodoItem 별 Checkbox 클릭 가능
- RenderModal 컴포넌트 구현
  - CarouselCard를 길게 누르면, MainScreen의 TodoList 내 해당 CarouselCard 아이템 추가 가능

</details>

<details><summary>Week 4 - 앱 배포 및 README 작성</summary>

`2022년 10월 2일 ~ 2022년 10월 3일`

- 기능상 버그 수정
- README 작성
- 배포 완료

</details>

### **프로젝트 설명( How to play )**

---

<details><summary>🎨 기술 스택</summary>

### _FrontEnd_

- React Native
  - AsyncStorage
- TypeScript

### _OS_

- iOS

</details>

<details><summary>📌 주요 기능</summary>

---

|                                                    **1. 하단의 캐러셀 내 루틴 템플릿 만들기**                                                    |                                               **2. 원하는 루틴 템플릿 눌러, <br>모달창의 OK 버튼 누르기</br>**                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![1. 하단의 캐러셀 내 루틴 템플릿 만들기](https://user-images.githubusercontent.com/93423531/194694352-0c236d5f-d952-4b18-9e30-46e538af5941.gif) | ![2. 원하는 루틴 템플릿 눌러, 모달창의 OK 버튼 누르기](https://user-images.githubusercontent.com/93423531/194694611-1aad74c5-c3f3-4cf1-a8aa-922481f14a9f.gif) |
|                                                       **3. 조합 후, 완성된 투두리스트✅**                                                        |                                                                                                                                                               |
|    ![3. 조합 후, 완성된 투두리스트✅](https://user-images.githubusercontent.com/93423531/194694832-c7a16ac9-5872-4917-b72e-ed53018bc421.gif)     |

</details>

### **🚀 After Project**

---

<details><summary>박수정</summary>

**React Native 로의 입문**

- 모바일 전용 애플리케이션을 만드는 데 이번 프로젝트의 초점이 맞춰진 만큼 웹 뷰 대신, React Native(이하 RN)를 최종 스택으로서 선정하게 되었습니다. 구현상 처음 접하는 스택이었기에 일정 기간 PoC를 진행하였고, 이를 기반으로 프로젝트의 필수 기능 및 구현해보고픈 세부 사항들까지 정해 피그마로 목업 작업까지 완료하였습니다. 이때 세부 사항의 경우 애플리케이션이란 특성에 따라, 유저의 터치 이벤트에 따른 인터랙티브한 동작 구현이 주를 이룹니다.
- 이외, 프로그래밍 언어로서 TypeScript를 선정하였습니다. 디자인 패턴 학습 이후 객체 지향 기반의 코드 설계에 흥미로웠기에, 객체 지향적이며 타입까지 지닌 TypeScript의 도입을 꾀하게 되었습니다. 익숙한 JavaScript와 달리 런타임 에러까지도 커버할 수 있었기에 이번 사이드 프로젝트를 기회 삼아 RN 과 함께 주요 스택으로 구성해보았습니다.
- TodoList 내 TodoItem의 생성-저장-수정-삭제 등의 로직을 어떻게 구성하면 좋을지에 대해 고민하던 중 RN의 AsyncStorage를 접하게 되었고, 한정된 개발 기한 내 별도의 서버 구축 없이도 관련 기능 구현이 가능하단 점에서 이를 접목하게 되었습니다.
- 대부분의 개발 과정이 그러하겠지만, 기능 구현 후 사용자 입장에서의 동작 여부를 테스트하던 중 의외의 엣지 케이스들이 존재하였습니다. 하나의 TodoItem 저장을 위한 저장 버튼 클릭 시 연이어 또 다른 TodoItem 생성 및 저장을 가능케 하기 위해, 클릭과 동시에 새로운 TodoItem이 생성되도록 할 것인지 등의 보완점이 존재하였고, 이에 유저의 사용 편의성에 근거해 보완하려 노력하였습니다. 또한 페이지별 레이아웃의 경우 기기별 비율이 다름을 고려하여 반응형 설계에 더욱 집중하였습니다.
</details>

<details><summary>임태완</summary>

**처음 만들어보는 리액트 네이티브 앱**

- React Native 와 TypeScript 를 사용했는데, 처음 해보는 만큼 돌아보면 간단한 것도 진행속도가 느려지는 어려움이 있었습니다. 앱 만드는 것을 도전해보니 다른 앱을 사용할 때 UX 를 보면서 ‘이건 어떻게 만들었을까’ 궁금함과 공감이 들어 흥미롭고, 이후에 기회를 만들어, 사용자와의 접점이 되는 UX 를 신경 쓰고 개선하는 앱 관련 프로젝트 작업을 해봐야겠다 마음을 먹게 되었습니다.
- 또한 TypeScript 는 잘 적용하고 있는 건지 어려움을 느끼며 처음 사용했지만, VS Code 에서 친절하게 알려주는 스니펫 메세지를 보고 알려주는 대로 해결해보니 퍼즐을 끼워 맞추는 듯한 재미가 있었습니다. 한편, 타입스크립트로 런타임 오류를 최소화하고 어떤 버그인지 모르고 헤매는 시간을 줄일 수 있었다는 장점을 느꼈지만, 모르는 사람도 알아보기 쉽게 타입 지정할 때 신경을 충분히 쓰지 못한 부분은 개선할 점으로 느껴졌습니다. 마지막으로, 의존성을 줄이고 간단하게 앱을 구현해보고자 react native async storage 로 상태관리를 했는데 컴포넌트 구현이 처음 생각했던 것보다 많아졌고, 더 간편한 전역 상태관리 라이브러리를 사용했다면 다른 기능 구현에 시간을 더 쓸 수 있지 않았을까 아쉬움이 남았습니다.
- 결과적으로, 처음 새로운 것을 시도해본 것은 의미 있지만, 부족한 기능이나 아쉬운 부분이 많습니다. 프로젝트를 일단락 마무리하지만, 처음 앱을 앱스토어에 올려본 만큼 이후에 업데이트 버전을 올리는 것으로 아쉬운 부분을 채워야겠다는 다짐이 들었습니다.

</details>

### 🙇‍♀️ 팀원

---

**`박수정`** 📧 krystarline@gmail.com

**`임태완`** 📧 taewan.seoul@gmail.com
