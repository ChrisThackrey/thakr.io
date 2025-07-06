/* -------------------------------------------------------------------------- */
/*  CENTRAL ICON MAP – IMPORT NEW LUCIDE ICONS *ONLY* IN THIS FILE            */
/* -------------------------------------------------------------------------- */
"use client"

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

/* -------------------------------------------------------------------------- */
/* 1. MASTER ICON DICTIONARY                                                  */
/* -------------------------------------------------------------------------- */
const baseIcons = {
  /* social */
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  rss: Rss,
  logo: Sparkles,
  sparkles: Sparkles,

  /* navigation / sections */
  home: Home,
  user: User,
  briefcase: Briefcase,
  palette: Palette,
  architecture: Building2,
  blog: FileText,
  fileText: FileText,
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
  generator: Wand2, // ---- LEGACY ICON, KEEP!
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
} as const satisfies Record<string, LucideIcon>

/* -------------------------------------------------------------------------- */
/* 2. PASCAL-CASE MIRRORS (e.g. Icons.Github)                                 */
/* -------------------------------------------------------------------------- */
Object.entries(baseIcons).forEach(([key, icon]) => {
  const pascal = key.charAt(0).toUpperCase() + key.slice(1)
  // @ts-expect-error – dynamic augmentation is intentional
  if (!baseIcons[pascal]) baseIcons[pascal] = icon
})

/* -------------------------------------------------------------------------- */
/* 3. LEGACY ALL-CAPS EXPORTS                                                 */
/* -------------------------------------------------------------------------- */
/**
 * Several older files still do:
 *   import { GENERATOR } from "@/components/icons"
 * Keep this working until they are migrated to `<Icons.generator />`.
 */
export const GENERATOR: LucideIcon = baseIcons.generator

/* -------------------------------------------------------------------------- */
/* 4. PRIMARY EXPORT                                                         */
/* -------------------------------------------------------------------------- */
export const Icons = baseIcons as {
  [K in keyof typeof baseIcons]: LucideIcon
}

/* Optional default export for ergonomic importing */
export default Icons
