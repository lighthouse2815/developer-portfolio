import type { HeroMetric, NavItem } from '../types/portfolio'

export const navigation: NavItem[] = [
  { label: { vi: 'Trang chủ', en: 'Home' }, href: '#home' },
  { label: { vi: 'Giới thiệu', en: 'About' }, href: '#about' },
  { label: { vi: 'Kỹ năng', en: 'Skills' }, href: '#skills' },
  { label: { vi: 'Dự án', en: 'Projects' }, href: '#projects' },
  { label: { vi: 'Hành trình', en: 'Experience' }, href: '#experience' },
  { label: { vi: 'Liên hệ', en: 'Contact' }, href: '#contact' },
]

export const heroMetrics: HeroMetric[] = [
  {
    label: { vi: 'Project tiêu biểu', en: 'Selected projects' },
    value: { vi: '04', en: '04' },
  },
  {
    label: { vi: 'Trục năng lực', en: 'Core directions' },
    value: {
      vi: 'Frontend, backend, dữ liệu',
      en: 'Frontend, backend, data',
    },
  },
  {
    label: { vi: 'Bề mặt sản phẩm', en: 'Product surfaces' },
    value: {
      vi: 'Web, mobile, desktop',
      en: 'Web, mobile, desktop',
    },
  },
]

export const profile = {
  name: 'Dương',
  brand: 'Dương Portfolio',
  role: {
    vi: 'Web Developer / Full-stack Developer / Frontend Developer Intern',
    en: 'Web Developer / Full-stack Developer / Frontend Developer Intern',
  },
  email: 'lethianhduong0409@gmail.com',
  heroLabel: {
    vi: 'Aspiring Full-stack Developer',
    en: 'Aspiring Full-stack Developer',
  },
  availability: {
    vi: 'Sẵn sàng cho Internship / Fresher Role',
    en: 'Available for Internship / Fresher Role',
  },
  heroSummary: {
    vi: 'Tôi xây dựng web rõ ràng, backend có cấu trúc, database hợp lý và trải nghiệm người dùng thân thiện.',
    en: 'I build web products with clear interfaces, structured backend services, sensible databases, and a user-friendly experience.',
  },
  focusAreas: {
    vi: [
      'UI có hierarchy rõ ràng',
      'Backend có cấu trúc service logic',
      'Project có thể giải thích end-to-end',
    ],
    en: [
      'UI with clear hierarchy',
      'Backend with structured service logic',
      'Projects I can explain end-to-end',
    ],
  },
  about: {
    vi: [
      'Tôi là sinh viên định hướng phát triển phần mềm, yêu thích việc biến một ý tưởng thành sản phẩm có thể chạy thật từ giao diện, backend đến database.',
      'Tôi quan tâm đến clean code, cấu trúc thư mục rõ ràng, API contract, database design và những quyết định UI/UX giúp sản phẩm dễ dùng hơn.',
      'Tôi đã làm các project liên quan đến hệ thống du lịch ẩm thực, ứng dụng học từ vựng, admin dashboard, mobile app và desktop app.',
      'Tôi có nền tảng tiếng Trung, giúp mở rộng góc nhìn khi làm sản phẩm đa ngôn ngữ hoặc làm việc trong môi trường có nhiều bối cảnh người dùng.',
    ],
    en: [
      'I am a software-oriented student who enjoys turning an idea into a real product, from interface and backend to database.',
      'I care about clean code, clear folder structure, API contracts, database design, and UI or UX decisions that make products easier to use.',
      'I have worked on projects involving culinary tourism systems, vocabulary learning apps, admin dashboards, mobile apps, and desktop apps.',
      'I also have a Chinese language background, which gives me a broader perspective when working on multilingual products or international contexts.',
    ],
  },
  slogan: {
    vi: 'Xây dựng ứng dụng web gọn, hữu ích và thân thiện với người dùng.',
    en: 'Building clean, useful and user-friendly web applications.',
  },
  contactLead: {
    vi: 'Tôi sẵn sàng trao đổi về cơ hội thực tập, fresher role hoặc bài test tuyển dụng cần tư duy làm sản phẩm thật.',
    en: 'I am open to internship opportunities, fresher roles, or hiring tests that value real product thinking.',
  },
  links: {
    github: 'https://github.com/your-github',
    linkedin: 'https://linkedin.com/in/your-linkedin',
  },
}
