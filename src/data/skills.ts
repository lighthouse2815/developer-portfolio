import type { SkillGroup } from '../types/portfolio'

export const skillGroups: SkillGroup[] = [
  {
    title: { vi: 'Frontend', en: 'Frontend' },
    description: {
      vi: 'Xây giao diện rõ ràng, responsive và có thể mở rộng từ component nhỏ đến page flow.',
      en: 'Build clear, responsive interfaces that can scale from small components to full page flows.',
    },
    icon: 'frontend',
    accent:
      'bg-[radial-gradient(circle_at_top_left,rgba(91,170,255,0.24),transparent_62%)]',
    items: {
      vi: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'React Router',
        'Redux Toolkit',
        'RTK Query',
        'Framer Motion',
        'Responsive UI',
        'Kiến trúc component',
      ],
      en: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'React Router',
        'Redux Toolkit',
        'RTK Query',
        'Framer Motion',
        'Responsive UI',
        'Component architecture',
      ],
    },
  },
  {
    title: { vi: 'Backend', en: 'Backend' },
    description: {
      vi: 'Ưu tiên API rõ contract, luồng auth chắc chắn và cấu trúc code tách trách nhiệm.',
      en: 'Prioritize clear API contracts, solid auth flows, and code structure with separated responsibilities.',
    },
    icon: 'backend',
    accent:
      'bg-[radial-gradient(circle_at_top_right,rgba(58,91,255,0.16),transparent_58%)]',
    items: {
      vi: [
        'ASP.NET Core / C#',
        'NestJS / TypeScript',
        'RESTful API',
        'JWT Authentication',
        'Phân quyền theo vai trò',
        'Swagger API Documentation',
        'Controller - Service - Repository',
      ],
      en: [
        'ASP.NET Core / C#',
        'NestJS / TypeScript',
        'RESTful API',
        'JWT Authentication',
        'Role-based authorization',
        'Swagger API Documentation',
        'Controller - Service - Repository',
      ],
    },
  },
  {
    title: { vi: 'Database', en: 'Database' },
    description: {
      vi: 'Thiết kế schema theo nghiệp vụ và chọn cách lưu dữ liệu phù hợp với bài toán.',
      en: 'Design schemas around business needs and choose storage models that fit the problem.',
    },
    icon: 'database',
    accent:
      'bg-[radial-gradient(circle_at_bottom_left,rgba(44,220,255,0.16),transparent_56%)]',
    items: {
      vi: [
        'MongoDB',
        'PostgreSQL',
        'Prisma ORM',
        'Thiết kế schema dữ liệu',
        'Indexing cơ bản',
        'Relationship modeling',
        'Document modeling',
      ],
      en: [
        'MongoDB',
        'PostgreSQL',
        'Prisma ORM',
        'Database schema design',
        'Basic indexing',
        'Relationship modeling',
        'Document modeling',
      ],
    },
  },
  {
    title: { vi: 'Tools', en: 'Tools' },
    description: {
      vi: 'Giữ workflow gọn để code, test, mô tả API và phối hợp tài liệu không bị đứt đoạn.',
      en: 'Keep the workflow compact for coding, testing, documenting APIs, and maintaining smooth handoff.',
    },
    icon: 'tools',
    accent:
      'bg-[radial-gradient(circle_at_center,rgba(85,141,255,0.12),transparent_62%)]',
    items: {
      vi: [
        'Git / GitHub',
        'Docker cơ bản',
        'Postman',
        'Swagger',
        'VS Code',
        'Codex / AI-assisted development',
      ],
      en: [
        'Git / GitHub',
        'Basic Docker',
        'Postman',
        'Swagger',
        'VS Code',
        'Codex / AI-assisted development',
      ],
    },
  },
  {
    title: { vi: 'Khác', en: 'Other' },
    description: {
      vi: 'Lợi thế nằm ở tư duy hệ thống, khả năng viết tài liệu và giữ logic sản phẩm nhất quán.',
      en: 'The advantage is in system thinking, documentation habits, and keeping product logic consistent.',
    },
    icon: 'other',
    accent:
      'bg-[radial-gradient(circle_at_top_right,rgba(129,114,255,0.16),transparent_52%)]',
    items: {
      vi: [
        'UI/UX thinking',
        'Viết API contract',
        'Project documentation',
        'Tư duy sản phẩm đa ngôn ngữ',
        'Debugging',
        'Hiểu triển khai và deploy',
      ],
      en: [
        'UI/UX thinking',
        'API contract writing',
        'Project documentation',
        'Multilingual product thinking',
        'Debugging',
        'Deployment understanding',
      ],
    },
  },
]
