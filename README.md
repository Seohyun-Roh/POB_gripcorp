# wanted_gripcorp

그립컴퍼니 기업과제입니다.

## 개발 환경

### 사용 라이브러리

- react: v18.1.0
- react-router-dom: v6.3.0.
- intersection-observer: 검색 페이지에서의 무한 스크롤 구현을 위해 사용하였습니다.
- recoil: 전역 상태 관리를 위해 사용하였습니다.

### 폴더 구조

```bash
├─assets
│  └─svgs
├─hooks
│  ├─state
│  └─worker
├─routes
│  ├─Favorites
│  ├─Search
│  └─_shared
│      ├─Header
│      ├─Item
│      └─TabBar
├─services
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```

## 기능 설명

### 검색 기능

![searchGif](https://user-images.githubusercontent.com/76952602/168445969-1f6ef2b6-274a-4b30-838f-553120c6fd72.gif)


검색어를 입력하고 엔터/검색버튼 클릭을 하면 검색 결과가 나옵니다.     


- 무한 스크롤 구현에 intersection-observer를 이용했습니다. 맨 아래에 loading div에 ref를 걸어놓고, 해당 요소가 보일 때를 감지해 현재 페이지를 1씩 증가하도록 했습니다.
- 현재 페이지가 변화될 때마다 useEffect를 이용해 현재 페이지의 영화 정보를 추가적으로 불러오도록 했습니다.

### 즐겨찾기 기능

![favoriteGif](https://user-images.githubusercontent.com/76952602/168446112-4f32e514-8482-4ebe-a75b-32ba679ae85e.gif)

검색 결과에서 영화를 클릭하면 즐겨찾기/즐겨찾기 제거를 할 수 있습니다.

- 영화 카드를 공통적으로 만들어 사용했고, 영화 카드를 처음 렌더링할 때 해당 영화가 로컬에 저장되어 있는지를 included props로 같이 넘겨주어 영화가 로딩될 때 즐겨찾기 여부도 같이 그려줄 수 있도록 했습니다.     
- 영화 아이템을 누르면 isOpen상태가 true가 되어 모달 버튼이 열리고, 영화가 즐겨찾기에 있는지 여부에 따라 즐겨찾기/즐겨찾기 해제가 보이도록 하였습니다.    

- 영화가 즐겨찾기에 이미 포함되어 있는 상태라면 로컬에서 삭제를 해주었고, 포함되어있지 않다면 로컬에 추가해주었습니다.       
- 즐겨찾기 목록 전역 상태 favoriteListState를 만들어서 즐겨찾기 페이지가 처음 렌더링될 때도 바로 보일 수 있도록 했습니다.

![favoritePageGif](https://user-images.githubusercontent.com/76952602/168446098-518e7d93-dd1a-415d-86bb-177382681598.gif)

검색창에서 추가한 즐겨찾기 목록을 한 번에 확인할 수 있습니다.

- 즐겨찾기 페이지가 처음 렌더링될 때 favoriteListState를 이용해 현재 즐겨찾기되어있는 영화를 불러올 수 있도록 하였습니다.