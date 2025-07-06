"use client"

import type { FC, SVGProps } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Calendar,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Code,
  Construction,
  Copy,
  Cpu,
  CreditCard,
  Database,
  Download,
  Edit,
  Expand,
  ExternalLink,
  FastForward,
  File,
  FileText,
  Github,
  GripVertical,
  Home,
  ImageIcon,
  Instagram,
  Laptop,
  Layers,
  LineChart,
  Linkedin,
  List,
  ListOrdered,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Palette,
  Pause,
  Phone,
  PieChart,
  Pizza,
  Play,
  Printer,
  RefreshCw,
  Rewind,
  RotateCw,
  Search,
  SearchX,
  Send,
  Server,
  Sparkles,
  SunMedium,
  Tag,
  Trash,
  Twitter,
  Users,
  Wand2,
  Zap,
  ZoomIn,
  ZoomOut,
  GraduationCap,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/* 1. Fallback / branding icon                                                */
/* -------------------------------------------------------------------------- */
const Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Sparkles {...props} className={`h-6 w-6 ${props.className ?? ""}`} />
)

/* -------------------------------------------------------------------------- */
/* 2. Master dictionary                                                       */
/* -------------------------------------------------------------------------- */
const ICON_MAP = {
  /* Navigation & sections */
  home: Home,
  user: Users,
  briefcase: Briefcase,
  code: Code,
  architecture: Building2,
  fileText: FileText,
  bookOpen: BookOpen,
  palette: Palette,
  contact: Mail,

  /* UI controls */
  menu: Menu,
  arrowRight: ArrowRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  sun: SunMedium,
  moon: Moon,
  search: Search,
  searchX: SearchX,
  copy: Copy,
  check: Check,
  checkCircle: CheckCircle2,
  spinner: Loader2,
  warning: AlertTriangle,
  externalLink: ExternalLink,
  refreshCw: RefreshCw,
  rotateCw: RotateCw,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  expand: Expand,
  download: Download,
  printer: Printer,
  edit: Edit,
  trash: Trash,
  list: List,
  listOrdered: ListOrdered,
  play: Play,
  pause: Pause,
  rewind: Rewind,
  fastForward: FastForward,
  gripVertical: GripVertical,
  construction: Construction,

  /* Forms & data */
  calendar: Calendar,
  calendarCheck: CalendarCheck2,
  clock: Clock,
  tag: Tag,
  file: File,
  creditCard: CreditCard,

  /* Contact / location */
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,

  /* Social */
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  x: Twitter, // alias
  /* Tech / misc */
  laptop: Laptop,
  cpu: Cpu,
  database: Database,
  server: Server,
  zap: Zap,
  lineChart: LineChart,
  barChart: BarChart,
  pieChart: PieChart,
  activity: Activity,
  layers: Layers,
  brain: BrainCircuit,
  bot: BrainCircuit,
  generator: Wand2,
  image: ImageIcon,
  users: Users,
  pizza: Pizza,

  /* Résumé / timeline */
  graduationCap: GraduationCap,
  award: Award,

  /* Branding */
  logo: Logo,
  sparkles: Sparkles,
} as const

/* -------------------------------------------------------------------------- */
/* 3. Typed Proxy that never returns undefined                                */
/* -------------------------------------------------------------------------- */
export type IconName = keyof typeof ICON_MAP

export const Icons: Record<IconName, FC<SVGProps<SVGSVGElement>>> = new Proxy(
  ICON_MAP as Record<string, FC<SVGProps<SVGSVGElement>>>,
  {
    get(target, prop: string) {
      if (prop in target) return target[prop]
      // eslint-disable-next-line no-console
      console.warn(`[Icons] "${prop}" is not in ICON_MAP – falling back to <Sparkles />.`)
      return Sparkles
    },
  },
) as any

/* named & default export so both import styles work */
export default Icons
