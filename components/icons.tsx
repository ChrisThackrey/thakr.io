"use client"

import type { FC, SVGProps } from "react"
import {
  Home,
  Users,
  Briefcase,
  Code,
  Building2,
  FileText,
  BookOpen,
  Palette,
  Mail,
  Menu,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  SunMedium,
  Moon,
  Search,
  SearchX,
  Copy,
  Check,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Expand,
  Download,
  Printer,
  Edit,
  Trash,
  List,
  ListOrdered,
  Play,
  Pause,
  Rewind,
  FastForward,
  GripVertical,
  Construction,
  Calendar,
  CalendarCheck2,
  Clock,
  Tag,
  File,
  CreditCard,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Laptop,
  Cpu,
  Database,
  Server,
  Zap,
  LineChart,
  BarChart,
  PieChart,
  Activity,
  Layers,
  BrainCircuit,
  Wand2,
  ImageIcon,
  Pizza,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  1. Fallback / branding icon                                               */
/* -------------------------------------------------------------------------- */
const Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Sparkles {...props} className={`h-6 w-6 ${props.className ?? ""}`} />
)

/* -------------------------------------------------------------------------- */
/*  2. Master dictionary of icons                                             */
/* -------------------------------------------------------------------------- */
const ICON_MAP = {
  /* Navigation & Sections */
  home: Home,
  user: Users,
  briefcase: Briefcase,
  code: Code,
  architecture: Building2,
  fileText: FileText,
  bookOpen: BookOpen,
  palette: Palette,
  contact: Mail,

  /* UI Controls & Common */
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

  /* Forms & Data */
  calendar: Calendar,
  calendarCheck: CalendarCheck2,
  clock: Clock,
  tag: Tag,
  file: File,
  creditCard: CreditCard,

  /* Contact / Location */
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,

  /* Social */
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  x: Twitter, // alias for "x" logo

  /* Tech / Misc */
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

  /* Résumé / Work-timeline */
  graduationCap: GraduationCap,
  award: Award,

  /* Branding */
  logo: Logo,
  sparkles: Sparkles,
} as const

/* -------------------------------------------------------------------------- */
/*  3. Public types & proxy export                                            */
/* -------------------------------------------------------------------------- */
export type IconName = keyof typeof ICON_MAP

/**
 * `Icons` is the object you import elsewhere:
 *
 *   const Icon = Icons['home']
 *   return <Icon className="..." />
 *
 * If a key is missing, we log a warning and fall back to <Sparkles />.
 */
export const Icons: Record<IconName, FC<SVGProps<SVGSVGElement>>> = new Proxy(
  ICON_MAP as Record<string, FC<SVGProps<SVGSVGElement>>>,
  {
    get(target, prop: string) {
      if (prop in target) return target[prop]
      // eslint-disable-next-line no-console
      console.warn(`[Icons] "${prop}" is not in ICON_MAP – falling back to Sparkles icon.`)
      return Sparkles
    },
  },
) as any // `as any` silences TS about Proxy signature

/* Optional: still allow consumers to import ICON_MAP directly */
export { ICON_MAP }
