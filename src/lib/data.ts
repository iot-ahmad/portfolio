export const PROFILE = {
  name: "Ahmad Al-Batayneh",
  initials: "AB",
  roles: "Engineer · Developer · Innovator",
  tagline: "Think. Build. Explore.",
  statement: "I build ideas into reality.",
  aboutStatement: "Curious by nature. Builder by choice.",
  bio: [
    "I'm Ahmad Al-Batayneh, a technology enthusiast who loves turning complex ideas into simple solutions. I'm always exploring, learning, and building something new.",
    "My work lives at the intersection of software, technology, data, and intelligent systems — transforming ideas into practical digital experiences.",
  ],
  manifesto:
    "I explore the intersection of software, technology, data, and intelligent systems — transforming ideas into practical digital experiences.",
  email: "albtaynta48@gmail.com",
  github: "https://github.com/iot-ahmad",
  githubRepos: "https://github.com/iot-ahmad?tab=repositories",
  linkedin: "https://www.linkedin.com/in/ahmad-al-batayneh",
  instagram: "https://www.instagram.com/6.5.2004_/",
  location: "Amman, Jordan",
  year: 2026,
};

export interface ProjectItem {
  title: string;
  wip?: boolean;
  note?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  items: ProjectItem[];
  status?: string;
  url: string;
  art: "gharbal" | "circuit" | "gaming";
}

export const PROJECTS: Project[] = [
  {
    id: "gharbal",
    name: "GHARBAL",
    tagline: "From raw data to clear insights",
    category: "Data Engineering / Data Preparation",
    year: "2026",
    description:
      "A local-first, offline-resilient data preparation platform designed to transform raw data into clean, structured, analysis-ready datasets. It brings multiple data sources and data preparation workflows into one environment.",
    items: [
      { title: "Import data from APIs, databases, JSON, Excel, and CSV" },
      { title: "Data integration and dataset management" },
      { title: "Data cleaning and transformation" },
      { title: "Data processing and preparation" },
      { title: "AI-assisted data reviewing", wip: true, note: "(under development)" },
      { title: "Metadata enrichment", wip: true, note: "(exploratory)" },
    ],
    status: "Under Development",
    url: "https://github.com/iot-ahmad?tab=repositories",
    art: "gharbal",
  },
  {
    id: "iot365",
    name: "IoT365",
    tagline: "Build. Simulate. Connect.",
    category: "Internet of Things / Software Platform",
    year: "2026",
    description:
      "An IoT development platform focused on building, simulating, monitoring, and managing connected devices. The project explores the connection between hardware, software, device simulation, and interactive monitoring dashboards.",
    items: [
      { title: "IoT device development" },
      { title: "ESP32 and Arduino-oriented workflows" },
      { title: "Device simulation" },
      { title: "Hardware and software integration" },
      { title: "Device monitoring dashboards" },
      { title: "Connected systems and IoT data visualization" },
    ],
    url: "https://iot365.tech/",
    art: "circuit",
  },
  {
    id: "zenithgames",
    name: "ZENITHGAMES",
    tagline: "Level Up",
    category: "Gaming / Digital Software Project",
    year: "2026",
    description:
      "A gaming-related digital project focused on creating a dedicated digital experience for gaming users. A software project that reflects my interest in developing interactive digital products and web experiences.",
    items: [
      { title: "Interactive digital products" },
      { title: "Gaming-focused web experiences" },
      { title: "Immersive interface design" },
      { title: "Dynamic visual compositions" },
    ],
    url: "https://zenithgames.me/",
    art: "gaming",
  },
];

export interface Capability {
  title: string;
  description: string;
}

export const CAPABILITIES: Capability[] = [
  {
    title: "Web Development",
    description:
      "Building websites, web applications, interfaces, and digital products.",
  },
  {
    title: "IoT Development",
    description:
      "Developing connected-device solutions and working with IoT platforms and embedded systems.",
  },
  {
    title: "AI Integration",
    description:
      "Working with AI tools and integrating AI capabilities into software projects.",
  },
  {
    title: "Hardware & Prototyping",
    description:
      "Working with electronic components, microcontrollers, ESP32, Arduino, and hardware prototypes.",
  },
];

export const STATS = [
  { value: "24", suffix: "", label: "Public repositories" },
  { value: "07", suffix: "", label: "Languages & stacks" },
  { value: "18", suffix: "+", label: "Months building" },
];

export const NAV = [
  { label: "Works", href: "#works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
