/* -------------------------------------------------------------------------- */
/*      CENTRAL ICON MAP – IMPORT NEW LUCIDE ICONS ONLY IN THIS FILE          */
/* -------------------------------------------------------------------------- */

import type { LucideIcon } from "lucide-react"
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Rss,
  Home,
  User,
  Briefcase,
  Palette,
  Building2,
  FileText,
  Mail,
  Menu,
  Phone,
  MapPin,
  Send,
  Sun,
  Moon,
  Laptop,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Wand2,
  Construction,
  Settings,
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Layers,
  Printer,
  Share2,
  Download,
  Search,
  Copy,
  Calendar,
  Camera,
  Play,
  Pause,
  Rewind,
  FastForward,
  BookOpen,
  List,
  ListOrdered,
  Clock,
  MessageSquare,
  CheckCircle2,
  Link,
  Tag,
  GraduationCap,
  Code,
  Server,
  Database,
  Cloud,
  Terminal,
  BrainCircuit,
  Bot,
  Sparkles,
  PenTool,
  Loader2,
  X,
  CalendarCheck2,
} from "lucide-react"

/**
 * 1.  Declare icons with lower-camel-case keys.
 * 2.  Auto-generate PascalCase aliases (Icons.Github, Icons.Construction, …)
 *     so casing mix-ups don’t crash the app.
 * 3.  Provide a legacy ALL-CAPS `GENERATOR` alias for old imports.
 */
const baseIcons = {
  /* social */
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  rss: Rss,
  logo: Sparkles, // site-wide logo mark used in Navigation
  sparkles: Sparkles, // keep the generic name available too

  /* navigation / sections */
  home: Home,
  user: User,
  briefcase: Briefcase,
  palette: Palette,
  architecture: Building2,
  blog: FileText,
  fileText: FileText, // alias so <Icons.fileText /> is defined
  contact: Mail,
  menu: Menu,

  /* contact details */
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,

  /* theme */
  sun: Sun,
  moon: Moon,
  laptop: Laptop,

  /* technical skills */
  code: Code,
  server: Server,
  database: Database,
  cloud: Cloud,
  terminal: Terminal,
  brainCircuit: BrainCircuit,
  bot: Bot,
  penTool: PenTool,

  /* ui & misc */
  arrowRight: ArrowRight,
  moveUp: ChevronUp,
  moveDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  refreshCw: RefreshCw,
  construction: Construction,
  generator: Wand2,
  settings: Settings,
  plus: Plus,
  trash: Trash2,
  edit: Edit,
  gripVertical: GripVertical,
  layers: Layers,
  printer: Printer,
  share: Share2,
  download: Download,
  search: Search,
  copy: Copy,
  calendar: Calendar,
  calendarCheck: CalendarCheck2,
  camera: Camera,
  play: Play,
  pause: Pause,
  rewind: Rewind,
  fastForward: FastForward,
  bookOpen: BookOpen,
  list: List,
  listOrdered: ListOrdered,
  clock: Clock,
  messageSquare: MessageSquare,
  checkCircle: CheckCircle2,
  link: Link,
  tag: Tag,
  graduationCap: GraduationCap,
  spinner: Loader2,
  close: X,
} satisfies Record<string, LucideIcon>

/* --------------------------- PascalCase aliases --------------------------- */
Object.entries(baseIcons).forEach(([key, value]) => {
  const pascal = key.charAt(0).toUpperCase() + key.slice(1)
  if (!(pascal in baseIcons)) {
    // @ts-expect-error – augmenting the map at runtime is intentional
    baseIcons[pascal] = value
  }
})

/* ---------------- دستی Legacy ALL-CAPS ------------------------------ */
export const GENERATOR = baseIcons.generator

/* --------------------------- Primary export ------------------------------ */
export const Icons = baseIcons as {
  [K in keyof typeof baseIcons]: LucideIcon
}

export type IconName = keyof typeof Icons
