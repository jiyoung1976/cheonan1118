# 천안시 민원서비스 — 인터랙티브 웹 프레젠테이션

첨부된 6장 PowerPoint의 문구·주요 구성·사진과 MP4 홍보영상을 반영한 정적 웹사이트입니다.

## 파일
- `index.html`: 6장 프레젠테이션
- `styles.css`: 반응형 레이아웃 및 애니메이션
- `script.js`: 내비게이션, 화면 전환, 키보드/스크롤/터치 제어
- `assets/civic-services.png`: 원본 PPT에 삽입된 이미지
- `assets/civic-promo.mp4`: 원본 PPT에 삽입된 홍보영상

## 로컬 실행
`index.html`을 브라우저에서 열면 됩니다. 별도 서버·DB·외부 CDN이 필요하지 않습니다.

## GitHub Pages 게시
1. 저장소를 만들고 **이 폴더 안의 파일과 `assets` 디렉터리**를 저장소 최상단(root)에 업로드합니다.
2. GitHub 저장소 **Settings → Pages → Build and deployment**에서 **Deploy from a branch**를 선택합니다.
3. Branch에서 `main` / `/(root)`를 선택한 뒤 저장합니다.
4. 생성된 `https://<계정>.github.io/<저장소>/` 주소로 접속합니다.

## 조작
- 상단 목차 또는 하단 이전/다음 버튼 클릭
- 키보드 `←`, `→`, `PageUp`, `PageDown`, `Home`, `End`
- 마우스 휠 스크롤, 모바일 세로 스와이프
- 주소 해시로 바로가기: `#slide-1`부터 `#slide-6`
- 마지막 장에서 홍보영상 재생 가능

## 출처 및 안내
모든 슬라이드 문구와 삽입된 이미지/영상은 사용자 제공 원본 PowerPoint에서 가져왔습니다. 슬라이드 3의 사업별 상세 기준 및 슬라이드 5의 정량 지표에 관한 원본 단서 문구도 유지했습니다. 재구성 과정에서 CSS 도형 및 아이콘 표현은 웹에 맞게 조정했습니다.
