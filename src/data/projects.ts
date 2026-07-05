import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    slug: 'quan4-culinary-tourism-system',
    title: {
      vi: 'Quan4 Culinary Tourism System',
      en: 'Quan4 Culinary Tourism System',
    },
    category: {
      vi: 'Nền tảng đa vai trò',
      en: 'Multi-role platform',
    },
    year: '2026',
    status: {
      vi: 'Sẵn sàng làm case study',
      en: 'Case study ready',
    },
    summary: {
      vi: 'Hệ thống gợi ý địa điểm ăn uống và du lịch ẩm thực tại Quận 4 với luồng user, owner và admin.',
      en: 'A culinary tourism platform for District 4 with user, owner, and admin flows.',
    },
    description: {
      vi: 'Project này cho tôi cơ hội đi sâu vào nghiệp vụ đa vai trò, quản lý POI, media, audio đa ngôn ngữ, QR scan và analytics.',
      en: 'This project let me go deeper into multi-role business logic, POI management, media, multilingual audio, QR scans, and analytics.',
    },
    heroImage: 'https://picsum.photos/seed/quan4-culinary-platform/1600/1200',
    heroImageAlt: {
      vi: 'Visual placeholder cho hệ thống du lịch ẩm thực với bối cảnh bản đồ và dashboard',
      en: 'Visual placeholder for a culinary tourism system with map and dashboard context',
    },
    techStack: [
      'ASP.NET Core',
      'C#',
      'MongoDB',
      'JWT',
      'BCrypt',
      'Swagger',
      'React Admin',
      'Ant Design',
      '.NET MAUI',
    ],
    role: {
      vi: 'Thiết kế flow hệ thống, làm backend phân lớp, giữ API contract và phối hợp cách hiển thị cho dashboard cùng mobile app.',
      en: 'Designed the system flow, built layered backend logic, maintained API contracts, and aligned the dashboard with the mobile app surface.',
    },
    keyFeatures: {
      vi: [
        'Đăng nhập và phân quyền user, owner, admin',
        'Owner tạo POI và admin duyệt nội dung',
        'Quản lý danh mục, hình ảnh, audio và media',
        'QR scan cho điểm tham quan',
        'Analytics cho lượt quét, lượt nghe và hành vi người dùng',
      ],
      en: [
        'Authentication and role handling for users, owners, and admins',
        'Owners can create POIs and admins can review content',
        'Management for categories, images, audio, and media',
        'QR scans for tourism locations',
        'Analytics for scans, listens, and user behavior',
      ],
    },
    technicalHighlights: {
      vi: [
        'Controller - Service - Repository rõ trách nhiệm',
        'MongoDB model theo bài toán POI và media',
        'API có contract và flow test cụ thể',
      ],
      en: [
        'Clear Controller - Service - Repository responsibilities',
        'MongoDB models shaped around POI and media use cases',
        'APIs with defined contracts and concrete test flows',
      ],
    },
    learned: {
      vi: [
        'Cách giữ logic đa vai trò không chồng chéo',
        'Cách viết API dễ kiểm thử và dễ mở rộng',
        'Cách nghĩ sản phẩm đa ngôn ngữ từ sớm',
      ],
      en: [
        'How to keep multi-role logic from overlapping',
        'How to write APIs that are easier to test and extend',
        'How to think about multilingual products early',
      ],
    },
    challenges: [
      {
        problem: {
          vi: 'Nghiệp vụ owner và admin dùng chung dữ liệu POI nhưng yêu cầu quyền thao tác khác nhau.',
          en: 'Owners and admins work on the same POI data but require different permissions.',
        },
        solution: {
          vi: 'Tôi chia rõ trạng thái duyệt, policy theo role và chốt quyền ngay ở service thay vì đẩy rải rác ở UI.',
          en: 'I separated approval states, enforced role policies, and locked permission checks at the service layer instead of scattering them across the UI.',
        },
      },
      {
        problem: {
          vi: 'POI chứa nhiều loại media nên payload rất dễ phình và khó giữ nhất quán.',
          en: 'POIs contain multiple media types, so payloads can easily grow and lose consistency.',
        },
        solution: {
          vi: 'Tôi tách cấu trúc dữ liệu và thống nhất cách map field giữa repository, DTO và dashboard.',
          en: 'I separated the data structure and standardized field mapping across repositories, DTOs, and the dashboard.',
        },
      },
    ],
    links: [
      {
        label: { vi: 'GitHub', en: 'GitHub' },
        url: 'https://github.com/your-github',
        kind: 'external',
      },
    ],
  },
  {
    slug: 'wordup-english-vocabulary-app',
    title: {
      vi: 'WordUp English Vocabulary App',
      en: 'WordUp English Vocabulary App',
    },
    category: {
      vi: 'Sản phẩm học tập',
      en: 'Learning product',
    },
    year: '2026',
    status: {
      vi: 'Bản full-stack hoàn chỉnh',
      en: 'Full-stack build',
    },
    summary: {
      vi: 'Ứng dụng học từ vựng tiếng Anh có auth, flashcard, quiz, matching game và theo dõi tiến độ học tập.',
      en: 'An English vocabulary learning app with auth, flashcards, quizzes, matching games, and learning progress tracking.',
    },
    description: {
      vi: 'WordUp là project giúp tôi nối frontend, backend và database thành một learning flow hoàn chỉnh thay vì chỉ dựng giao diện.',
      en: 'WordUp helped me connect frontend, backend, and database work into one complete learning flow instead of only building the interface.',
    },
    heroImage: 'https://picsum.photos/seed/wordup-learning-app/1600/1200',
    heroImageAlt: {
      vi: 'Visual placeholder cho ứng dụng học từ vựng với cảm giác notebook và product card',
      en: 'Visual placeholder for a vocabulary app with a notebook-like feel and product card presentation',
    },
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'RTK Query',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'Tauri',
    ],
    role: {
      vi: 'Thiết kế frontend flow, tổ chức API module, làm schema dữ liệu cho vocabulary và giữ trải nghiệm học tập nhất quán.',
      en: 'Designed the frontend flow, organized API modules, modeled vocabulary data, and kept the learning experience consistent.',
    },
    keyFeatures: {
      vi: [
        'Đăng ký và đăng nhập',
        'Học từ vựng theo chủ đề',
        'Flashcards, quiz và matching game',
        'Favorite words và learning history',
        'Admin quản lý topic, vocabulary, game và user',
      ],
      en: [
        'Registration and login',
        'Topic-based vocabulary learning',
        'Flashcards, quizzes, and matching games',
        'Favorite words and learning history',
        'Admin management for topics, vocabulary, games, and users',
      ],
    },
    technicalHighlights: {
      vi: [
        'Frontend, backend và database tách lớp rõ ràng',
        'Prisma schema phản ánh đúng module nghiệp vụ',
        'Có thêm desktop app bằng Tauri và React',
      ],
      en: [
        'Frontend, backend, and database layers are clearly separated',
        'Prisma schema reflects the real business modules',
        'Includes a desktop app built with Tauri and React',
      ],
    },
    learned: {
      vi: [
        'Cách xây product flow cho người học thay vì chỉ list chức năng',
        'Cách giữ module API và screen state dễ đọc',
        'Cách mở rộng cùng một domain sang desktop app',
      ],
      en: [
        'How to build a product flow for learners instead of only listing features',
        'How to keep API modules and screen state readable',
        'How to extend the same domain into a desktop app',
      ],
    },
    challenges: [
      {
        problem: {
          vi: 'Learning flow có nhiều trạng thái nhỏ như favorite, history, quiz result và matching progress.',
          en: 'The learning flow contains many small states such as favorites, history, quiz results, and matching progress.',
        },
        solution: {
          vi: 'Tôi gom state theo module, tách data file rõ domain và ưu tiên API contract ổn định trước khi thêm UI mới.',
          en: 'I grouped state by module, split data files by domain, and prioritized a stable API contract before adding new UI.',
        },
      },
      {
        problem: {
          vi: 'Pastel notebook style dễ đẹp nhưng cũng dễ làm giảm độ rõ hierarchy.',
          en: 'A pastel notebook style can look nice but can also weaken visual hierarchy.',
        },
        solution: {
          vi: 'Tôi giữ màu nhẹ ở bề mặt, còn typography và spacing phải đủ mạnh để người dùng vẫn đọc nhanh.',
          en: 'I kept color soft on the surfaces while making typography and spacing strong enough for fast reading.',
        },
      },
    ],
    links: [
      {
        label: { vi: 'GitHub', en: 'GitHub' },
        url: 'https://github.com/your-github',
        kind: 'external',
      },
    ],
  },
  {
    slug: 'dark-survival-rpg-game',
    title: {
      vi: 'Dark Survival RPG Game',
      en: 'Dark Survival RPG Game',
    },
    category: {
      vi: 'Hệ gameplay',
      en: 'Gameplay system',
    },
    year: '2025',
    status: {
      vi: 'Prototype có thể chơi',
      en: 'Playable prototype',
    },
    summary: {
      vi: 'Game RPG sinh tồn phong cách dark fantasy với character control, inventory, dialogue và save/load.',
      en: 'A dark fantasy survival RPG with character control, inventory, dialogue, and save or load systems.',
    },
    description: {
      vi: 'Project game giúp tôi rèn tư duy loop gameplay, đọc scene graph và xử lý lỗi runtime thay vì chỉ nhìn mỗi UI.',
      en: 'This game project helped me practice gameplay loop thinking, read scene graphs, and handle runtime issues instead of looking only at UI.',
    },
    heroImage: 'https://picsum.photos/seed/dark-survival-rpg/1600/1200',
    heroImageAlt: {
      vi: 'Visual placeholder cho game dark fantasy với bối cảnh nhân vật và ánh sáng thấp',
      en: 'Visual placeholder for a dark fantasy game with a character-focused low-light scene',
    },
    techStack: ['Godot', 'GDScript'],
    role: {
      vi: 'Thiết kế gameplay loop cơ bản, viết script điều khiển và debug logic save, dialogue cùng inventory.',
      en: 'Designed the core gameplay loop, wrote control scripts, and debugged save, dialogue, and inventory logic.',
    },
    keyFeatures: {
      vi: [
        'Điều khiển nhân vật và tương tác vật phẩm',
        'NPC dialogue có lựa chọn',
        'Combat cơ bản',
        'Inventory và save/load',
        'Nhiều ending dựa trên lựa chọn',
      ],
      en: [
        'Character control and item interaction',
        'NPC dialogue with choices',
        'Basic combat',
        'Inventory and save or load support',
        'Multiple endings based on player choices',
      ],
    },
    technicalHighlights: {
      vi: [
        'Hiểu cấu trúc scene và script trong Godot',
        'Debug parser error và runtime issue có hệ thống',
        'Tập giữ gameplay loop nhất quán khi thêm tính năng',
      ],
      en: [
        'Understood scene and script structure in Godot',
        'Debugged parser and runtime issues methodically',
        'Practiced keeping the gameplay loop consistent while adding features',
      ],
    },
    learned: {
      vi: [
        'Không phải bug nào cũng nằm ở UI, nhiều khi logic state mới là gốc',
        'Scene tree và signal cần được đọc như một flow hệ thống',
        'Save/load là sản phẩm thật chứ không phải tiện ích phụ',
      ],
      en: [
        'Not every bug lives in the UI. Often the real root is state logic.',
        'Scene trees and signals need to be read like a system flow.',
        'Save and load behavior should be treated as real product behavior, not a side utility.',
      ],
    },
    challenges: [
      {
        problem: {
          vi: 'Inventory, dialogue và ending choice cùng ghi vào state nên rất dễ phát sinh bug chéo.',
          en: 'Inventory, dialogue, and ending choices all write into state, so cross-feature bugs can happen easily.',
        },
        solution: {
          vi: 'Tôi tách từng nhánh logic theo scene, sau đó xác minh lại bằng flow chơi thực tế thay vì chỉ đọc source.',
          en: 'I separated each logic branch by scene, then validated it through real play flow instead of only reading the source.',
        },
      },
      {
        problem: {
          vi: 'Lỗi parser hoặc runtime ở Godot thường làm game đứng ngay khi đang test thủ công.',
          en: 'Parser or runtime errors in Godot often stop the game immediately during manual testing.',
        },
        solution: {
          vi: 'Tôi tập quy trình sửa từng lỗi nhỏ, chạy lại nhanh và giữ save/load như một case cần kiểm tra bắt buộc.',
          en: 'I practiced fixing one small error at a time, rerunning quickly, and keeping save or load as a mandatory verification case.',
        },
      },
    ],
    links: [
      {
        label: { vi: 'GitHub', en: 'GitHub' },
        url: 'https://github.com/your-github',
        kind: 'external',
      },
    ],
  },
  {
    slug: 'portfolio-website',
    title: {
      vi: 'Portfolio Website',
      en: 'Portfolio Website',
    },
    category: {
      vi: 'Showcase cá nhân',
      en: 'Personal showcase',
    },
    year: '2026',
    status: {
      vi: 'Concept đang chạy',
      en: 'Live concept',
    },
    summary: {
      vi: 'Website cá nhân tối ưu cho phỏng vấn, giới thiệu kỹ năng, project thật và cách tôi tư duy khi làm sản phẩm.',
      en: 'A personal website optimized for interviews, highlighting skills, real projects, and how I think about building products.',
    },
    description: {
      vi: 'Đây là portfolio được xây dựng như một case study sống, nơi mỗi section đều phải trả lời rõ tôi làm được gì và làm như thế nào.',
      en: 'This portfolio is built like a living case study where every section must clearly answer what I can do and how I approach the work.',
    },
    heroImage: 'https://picsum.photos/seed/duong-portfolio-site/1600/1200',
    heroImageAlt: {
      vi: 'Visual placeholder cho portfolio cá nhân theo hướng product showcase',
      en: 'Visual placeholder for a personal portfolio presented like a product showcase',
    },
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'Redux Toolkit',
    ],
    role: {
      vi: 'Tự thiết kế layout, chia data và component, tạo theme dark/light mode và biến project thành một portfolio có chất sản phẩm.',
      en: 'Designed the layout, separated data and components, built dark or light mode, and turned the project into a portfolio with product quality.',
    },
    keyFeatures: {
      vi: [
        'Hero nổi bật với product preview',
        'Projects được trình bày như case study thật',
        'Dark/light mode có kiểm soát token',
        'Detail page cho từng project',
        'Contact form có validation phía frontend',
      ],
      en: [
        'A strong hero with a product-style preview',
        'Projects presented like real case studies',
        'Dark and light mode with controlled design tokens',
        'Detail page for each project',
        'Frontend validation for the contact form',
      ],
    },
    technicalHighlights: {
      vi: [
        'Tách data, type, layout và UI component rõ ràng',
        'Motion dùng có chừng mực và có reduced motion',
        'Responsive cho desktop, tablet và mobile',
      ],
      en: [
        'Clear separation between data, types, layout, and UI components',
        'Motion used with restraint and reduced motion support',
        'Responsive across desktop, tablet, and mobile',
      ],
    },
    learned: {
      vi: [
        'Portfolio cũng cần IA và hierarchy như một sản phẩm thật',
        'UI đẹp chỉ có giá trị khi vẫn giải thích được năng lực',
        'Nhịp layout quan trọng ngang với palette và animation',
      ],
      en: [
        'A portfolio still needs information architecture and hierarchy like a real product',
        'A beautiful UI only matters if it still communicates capability',
        'Layout rhythm matters as much as palette and animation',
      ],
    },
    challenges: [
      {
        problem: {
          vi: 'Portfolio cho fresher rất dễ rơi vào kiểu template đẹp nhưng không nói rõ năng lực.',
          en: 'A fresher portfolio can easily become a pretty template that still says little about actual capability.',
        },
        solution: {
          vi: 'Tôi đặt trọng tâm vào project thực tế, system thinking và quyết định kỹ thuật, không chỉ liệt kê tool.',
          en: 'I focused on real projects, system thinking, and technical decisions instead of only listing tools.',
        },
      },
      {
        problem: {
          vi: 'Nhiều website portfolio dùng cùng một công thức hero centered và ba card ngang nên khó nhớ.',
          en: 'Many portfolio sites reuse the same centered hero and three-card layout, which makes them forgettable.',
        },
        solution: {
          vi: 'Tôi thay bằng split hero, bento skills, project spotlight và detail page có cấu trúc case study.',
          en: 'I replaced that pattern with a split hero, bento skill layout, project spotlights, and a case-study-style detail page.',
        },
      },
    ],
    links: [
      {
        label: { vi: 'GitHub', en: 'GitHub' },
        url: 'https://github.com/your-github',
        kind: 'external',
      },
      {
        label: { vi: 'Demo', en: 'Demo' },
        url: '/',
        kind: 'internal',
      },
    ],
  },
]
