import type { TimelineEntry } from '../types/portfolio'

export const timelineEntries: TimelineEntry[] = [
  {
    period: { vi: 'Nền tảng frontend', en: 'Frontend foundation' },
    title: {
      vi: 'Bắt đầu với React, TypeScript và Tailwind',
      en: 'Started with React, TypeScript, and Tailwind',
    },
    summary: {
      vi: 'Tôi tập trung vào cách chia component, tổ chức page và giữ giao diện responsive ngay từ đầu.',
      en: 'I focused on component structure, page organization, and keeping the interface responsive from the beginning.',
    },
    bullets: {
      vi: [
        'Làm nhiều layout khác nhau thay vì phụ thuộc template',
        'Tập thói quen đặt tên component và data rõ vai trò',
      ],
      en: [
        'Built multiple layout styles instead of relying on templates',
        'Practiced naming components and data by clear responsibility',
      ],
    },
  },
  {
    period: { vi: 'Hệ thống backend', en: 'Backend systems' },
    title: {
      vi: 'Mở rộng sang ASP.NET Core và NestJS',
      en: 'Expanded into ASP.NET Core and NestJS',
    },
    summary: {
      vi: 'Tôi chuyển từ việc chỉ dựng UI sang thiết kế auth flow, API module và kiểm soát vai trò người dùng.',
      en: 'I moved beyond UI implementation into auth flows, API modules, and user role control.',
    },
    bullets: {
      vi: [
        'Làm JWT, role-based authorization và Swagger',
        'Tách logic theo controller, service và repository',
      ],
      en: [
        'Worked with JWT, role-based authorization, and Swagger',
        'Separated logic into controller, service, and repository layers',
      ],
    },
  },
  {
    period: { vi: 'Tư duy dữ liệu', en: 'Data thinking' },
    title: {
      vi: 'Thiết kế dữ liệu bằng MongoDB và PostgreSQL',
      en: 'Designed data models with MongoDB and PostgreSQL',
    },
    summary: {
      vi: 'Mỗi project giúp tôi hiểu rõ hơn khi nào nên dùng document model và khi nào quan hệ dữ liệu cần chặt.',
      en: 'Each project helped me better understand when document models fit and when relational structure needs to stay strict.',
    },
    bullets: {
      vi: [
        'Mô tả schema theo bài toán thực tế',
        'Quan tâm đến index, query flow và data consistency',
      ],
      en: [
        'Described schemas around real product problems',
        'Paid attention to indexes, query flow, and data consistency',
      ],
    },
  },
  {
    period: { vi: 'Nhiều bề mặt sản phẩm', en: 'Product surfaces' },
    title: {
      vi: 'Làm admin dashboard, mobile app và desktop app',
      en: 'Built admin dashboards, mobile apps, and desktop apps',
    },
    summary: {
      vi: 'Tôi luyện cách giữ cùng một tư duy sản phẩm trên nhiều bề mặt thay vì chỉ hoàn thành một màn hình đẹp.',
      en: 'I learned how to keep the same product thinking across multiple surfaces instead of just polishing one nice screen.',
    },
    bullets: {
      vi: [
        'Hiểu flow của owner, admin và end user',
        'Biết điều chỉnh UI theo mobile, desktop và hybrid app',
      ],
      en: [
        'Understood the flows of owners, admins, and end users',
        'Adjusted UI decisions across mobile, desktop, and hybrid apps',
      ],
    },
  },
  {
    period: { vi: 'Tài liệu và QA', en: 'Docs and QA' },
    title: {
      vi: 'Tự viết tài liệu API, database design và checklist test',
      en: 'Wrote my own API docs, database notes, and test checklists',
    },
    summary: {
      vi: 'Việc ghi lại flow giúp tôi debug nhanh hơn và giải thích quyết định kỹ thuật tốt hơn khi làm việc nhóm.',
      en: 'Documenting flows helps me debug faster and explain technical decisions more clearly when collaborating.',
    },
    bullets: {
      vi: [
        'Tạo tài liệu dễ handoff',
        'Giữ logic route, payload và trạng thái rõ ràng',
      ],
      en: [
        'Created documentation that is easier to hand off',
        'Kept route logic, payloads, and states easy to follow',
      ],
    },
  },
  {
    period: { vi: 'Workflow với AI', en: 'AI workflow' },
    title: {
      vi: 'Dùng AI để tăng tốc nhưng vẫn hiểu cấu trúc code',
      en: 'Used AI to move faster while still understanding the codebase',
    },
    summary: {
      vi: 'Tôi dùng Codex như một công cụ tăng tốc triển khai, không thay thế cho việc đọc, hiểu và kiểm tra hệ thống.',
      en: 'I use Codex as an accelerator for implementation, not as a replacement for reading, understanding, and verifying the system.',
    },
    bullets: {
      vi: [
        'Tự truy vết bug, kiểm tra build và xác nhận flow',
        'Giữ quyền quyết định ở mức kiến trúc và hành vi sản phẩm',
      ],
      en: [
        'Tracked bugs myself, verified builds, and confirmed actual flows',
        'Kept final decisions at the architecture and product behavior level',
      ],
    },
  },
]
