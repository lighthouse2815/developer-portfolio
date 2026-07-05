# Dương Portfolio

Portfolio cá nhân cho mục tiêu thực tập hoặc fresher developer. Dự án được dựng bằng `React + TypeScript + Vite`, tập trung vào cách trình bày project như case study thật thay vì một landing page template cơ bản.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router
- Redux Toolkit + React Redux

## Chạy local

```bash
npm install
npm run dev
```

Mặc định Vite chạy tại:

```bash
http://127.0.0.1:5173
```

## Build production

```bash
npm run build
```

Kết quả sẽ được xuất ra thư mục `dist/`.

## Lint

```bash
npm run lint
```

## Cấu trúc thư mục

```text
src/
  app/         Router, store, slice
  components/  Reusable section helpers và project card
  data/        Dữ liệu portfolio tách riêng khỏi UI
  hooks/       Theme sync
  layout/      Header, footer, page shell
  pages/       Home page, project detail page, not found page
  project/     Block riêng cho project detail
  sections/    Hero, About, Skills, Projects, Experience, Contact
  types/       TypeScript types
  ui/          Button, panel, form field, theme toggle
  utils/       Helper nhỏ
```

## Nội dung chính

- `src/data/profile.ts`: thông tin cá nhân, social link, hero content
- `src/data/skills.ts`: nhóm kỹ năng
- `src/data/projects.ts`: danh sách project và nội dung detail page
- `src/data/timeline.ts`: learning journey

## Những phần đã polish

- Hero theo hướng split layout, không dùng hero centered kiểu template cũ
- Hệ token dark/light mode thống nhất trên toàn site
- Skills section theo bento grid thay vì card lặp đều
- Projects section có spotlight card và detail page riêng cho từng project
- Contact form có validate frontend và success state
- Motion chỉ dùng ở các điểm cần hierarchy và cảm giác tương tác

## Placeholder cần thay trước khi dùng thật

- `public/duong-cv.txt`: hiện là file placeholder, nên thay bằng CV PDF chính thức
- `src/data/profile.ts`: cập nhật lại GitHub và LinkedIn thật
- `src/data/projects.ts`: nếu có demo hoặc repo public cụ thể, thay link cho từng project
- Screenshot thật cho từng project có thể bổ sung thêm ở project detail page

## Ghi chú

- Ảnh project đang dùng visual placeholder để giữ layout ổn định trong giai đoạn đầu.
- Dự án dùng `BrowserRouter`. Nếu deploy lên static host không có rewrite rule, cần cấu hình fallback route tương ứng.
