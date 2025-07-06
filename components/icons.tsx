"use client"

import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Calendar,
  Clock,
  Home,
  Briefcase,
  Construction,
  BookOpen,
  Code,
  Cpu,
  Database,
  Server,
  Zap,
  LineChart,
  BarChart,
  PieChart,
  Activity,
  Layers,
  Search,
  Tag,
  MessageSquare,
  Share2,
  ExternalLink,
  ChevronDown,
  Menu,
  MapPin,
  Building2,
  Palette,
  Sparkles,
  Phone,
  Send,
  ChevronUp,
  RefreshCw,
  Wand2,
  Edit,
  GripVertical,
  Printer,
  Download,
  Copy,
  Camera,
  Play,
  Pause,
  Rewind,
  FastForward,
  List,
  ListOrdered,
  CheckCircle2,
  Link,
  GraduationCap,
  BrainCircuit,
  Bot,
  PenTool,
  CalendarCheck2,
  type LucideIcon,
} from "lucide-react"

// Define the base icons object with all the icons we use
const baseIcons = {
  logo: Sparkles,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  check: Check,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  calendar: Calendar,
  clock: Clock,
  home: Home,
  briefcase: Briefcase,
  construction: Construction,
  bookOpen: BookOpen,
  code: Code,
  cpu: Cpu,
  database: Database,
  server: Server,
  zap: Zap,
  lineChart: LineChart,
  barChart: BarChart,
  pieChart: PieChart,
  activity: Activity,
  layers: Layers,
  search: Search,
  tag: Tag,
  messageSquare: MessageSquare,
  share: Share2,
  externalLink: ExternalLink,
  menu: Menu,
  fileText: FileText,
  mapPin: MapPin,
  architecture: Building2,
  palette: Palette,
  sparkles: Sparkles,
  phone: Phone,
  send: Send,
  refreshCw: RefreshCw,
  generator: Wand2,
  edit: Edit,
  gripVertical: GripVertical,
  printer: Printer,
  download: Download,
  copy: Copy,
  camera: Camera,
  play: Play,
  pause: Pause,
  rewind: Rewind,
  fastForward: FastForward,
  list: List,
  listOrdered: ListOrdered,
  checkCircle: CheckCircle2,
  link: Link,
  graduationCap: GraduationCap,
  brainCircuit: BrainCircuit,
  bot: Bot,
  penTool: PenTool,
  calendarCheck: CalendarCheck2,
  contact: Mail, // Alias for mail
  moveUp: ChevronUp, // Alias for chevronUp
  moveDown: ChevronDown, // Alias for chevronDown
}

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
