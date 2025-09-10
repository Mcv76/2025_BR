# 할일 관리 앱 (Todo Management App)

React와 TypeScript를 사용한 할일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할일 추가/삭제/완료 처리
- 스마트 정렬 시스템:
  - 새로운 할일은 미완료 그룹 최상단에 추가
  - 완료된 할일은 완료 그룹 최하단으로 자동 이동
  - 미완료로 변경된 할일은 미완료 그룹 최상단으로 이동
- 그룹별 드래그 앤 드롭:
  - 미완료 그룹 내에서만 순서 변경 가능
  - 완료 그룹 내에서만 순서 변경 가능
  - 그룹 간 이동은 제한됨
- 드래그 앤 드롭 순서 자동 저장 및 유지
- 로컬 스토리지를 활용한 데이터 영구 저장
- 반응형 디자인 (Bootstrap + Tailwind CSS)
- 체크박스 상태에 따른 자동 정렬

## 사용 기술

- React 18
- TypeScript
- Vite
- Bootstrap 5
- Tailwind CSS
- React Beautiful DnD

## 시작하기

1. 저장소 클론:
```bash
git clone [저장소 URL]
cd [프로젝트 폴더]
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 빌드:
```bash
npm run build
```

## 협업 가이드

1. 브랜치 전략
   - `main`: 프로덕션 브랜치
   - `develop`: 개발 브랜치
   - `feature/*`: 새로운 기능 개발
   - `bugfix/*`: 버그 수정

2. 커밋 메시지 컨벤션
   - feat: 새로운 기능 추가
   - fix: 버그 수정
   - docs: 문서 수정
   - style: 코드 포맷팅
   - refactor: 코드 리팩토링
   - test: 테스트 코드
   - chore: 기타 변경사항

## 라이선스

MIT License

