# 수정 방법 (한 장)

내용은 전부 `data/` 폴더의 JSON 파일에 있어요. **코드(`index.html`)는 건드리지 않아도 돼요.**
수정 후 파일을 다시 올리면(덮어쓰기) 바로 반영돼요. JSON은 따옴표 `"`와 쉼표 `,`만 조심하세요.

화면 구성: 하단 탭 3개(홈 · 가이드 · 질문). 홈이 콘텐츠 목록이고, 콘텐츠를 누르면 그 콘텐츠의 컷을 체크하며 찍어요.

| 바꾸고 싶은 것 | 파일 | 어디를 |
|---|---|---|
| **드라이브 링크 넣기** | `data/config.json` | `"driveUrl": ""` 안에 `https://drive.google.com/...` 입력. 비우면 "링크는 곧 안내드려요"로 돌아가요 |
| 마감일 · D-day | `data/config.json` | `deadline`(`"2026-11-17"`), `deadlineLabel`(`"11/17(화)"`), `deadlineExtra`(마감 카드 아래 한 줄) |
| 홈 상단 인사 문구 | `data/config.json` | `request.title`, `request.paragraphs` (`**굵게**` 사용 가능) |
| 마감 카드 문구(남은 날짜별) | `data/config.json` | `deadlineCopy` (`far` · `soon` · `today` · `past`, `{date}`는 마감일로 바뀜) |
| 홈 접이식 "하루에 한 번에 찍으려면" | `data/config.json` | `dayTip` |
| 콘텐츠 제목 · 게시일 · 형식 · 길이 | `data/contents.json` | `title`, `post`, `format`, `length` |
| **홈 맨 아래 달력** | `data/contents.json` · `data/config.json` | 콘텐츠의 `postDate`(게시일)와 `dueDate`(콘텐츠별 마감일), `config.json`의 `deadline`(파일 전달일)을 읽어 자동으로 그려요. 날짜를 바꾸면 달력도 바뀌어요(화면의 `post` 글자도 같이 고치세요). 문구는 `calendar.title`, `calendar.intro` |
| 콘텐츠별 파일 보내기 문구 | `data/contents.json` | `deliver` (예: `"11/17(화)까지"`), `emphasizeDeliver`: true면 강조색 |
| 레퍼런스 GIF · "볼 점" · 원본 링크 | `data/contents.json` | `ref.gif`, `ref.thumb`, `ref.point`, `ref.links` (파일은 `assets/ref/`) |
| 구도 한 줄 · 촬영 내용 · 피하면 좋은 것 | `data/contents.json` | `composition`, `shoot` (`avoid[].text/why`) |
| 일정 · 촬영 세팅 · 확인 항목 | `data/contents.json` | `schedule`, `setup`, `confirm` |
| 컷 설명 · 길이 · 필수/선택 | `data/cuts.json` | `cuts` 안 해당 ID 항목 (`title`, `length`, `frame`, `required`) |
| 컷 추가 · 순서 바꾸기 | `data/contents.json` | 콘텐츠의 `cuts` 배열(컷 ID). **배열 순서가 화면의 '컷 1, 컷 2…' 순서**이자 게시 순서예요 |
| 질문 문구 · 선택지 | `data/questions.json` | `questions` (질문 ID: Q3 · Q5) |
| 4K 설정 · 촬영 규칙 · 파일 보내기 안내 | `data/guide.json` | `fourK`, `rules`, `delivery` |

## 컷 ID 규칙
- 컷 ID(`W1`, `A4`, `B2`, `C5` …)는 **데이터 안에서만** 써요. 화면에는 보이지 않고, 콘텐츠 안의 순서(컷 1, 컷 2…)로 나와요.
- **문장(`frame`, `note`, `schedule.note` 등)에는 컷 ID를 쓰지 마세요.** "큰 창 전경과 같은 자리"처럼 컷 이름으로 풀어 써요.
- 컷(`cuts.json`)과 콘텐츠(`contents.json`)는 컷 ID로 연결돼요. 같은 컷 ID를 두 콘텐츠의 `cuts`에 넣으면 "같이 써요. 한 번만 찍으면 돼요" 안내가 자동으로 붙고, 한쪽에서 체크하면 양쪽에 반영돼요.
- 컷의 `usedBy`에 있는 콘텐츠에서는 **필수**(`required`가 true일 때), 그 외 콘텐츠에서는 **선택**으로 표시돼요. 진행률의 분모는 필수 컷 수예요.
- 폰 기종은 가이드 화면 토글 한 곳에서만 받고, 공유 텍스트에 자동으로 들어가요.

## 카피 규칙 (수정할 때)
- 권유형: "~하면 좋아요", "~해 두면 편해요", "[날짜]까지 보내 주시면 ~할 수 있어요". **"~해 주세요"는 쓰지 않아요.**
- 설정 방법 단계는 평서형: "눌러요", "골라요".
- 금지·주의는 "~는 피하면 좋아요" + 이유 한 줄(`why`) / 날짜는 `11/17(화)`처럼 요일 포함 / 빨간색·재촉 표현 · 이모지 없음.

## 배포 · 보안
- 정적 파일만 있어서 서버가 필요 없어요. 폴더 통째로 올리면 돼요.
- 모든 화면에 `noindex`(검색 노출 금지)가 들어 있어요. **추측하기 어려운 주소**(긴 랜덤 폴더명 또는 비공개 링크)로 올려 주세요.
- 체크 · 답변은 사장님 폰(브라우저)에만 저장돼요. 기획자는 '질문' 화면의 **보내기 텍스트**(콘텐츠별 진행률 포함)로 받아 볼 수 있어요.
- 레퍼런스 GIF는 내부용이에요. 사장님 안내 외 용도로 공개하지 마세요.
- **공개 저장소(GitHub Pages) 배포본에는 `assets/ref/`를 올리지 않아요**(`.gitignore`로 제외). 이미지 파일이 없으면 화면에서 그 영역만 자동으로 숨겨지고, "볼 점" 문구와 원본 링크는 그대로 보여요.

## 로컬 미리보기
폴더에서 `python -m http.server 8000` → `http://localhost:8000` (파일을 더블클릭하면 JSON을 못 읽어요).
