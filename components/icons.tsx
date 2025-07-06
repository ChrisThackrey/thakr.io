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
  Image,
  ImageIcon,
  Instagram,
  Laptop,
  Layers,
  LineChart,
  Linkedin,
  List,
  ListOrdered,
  ListTree,
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
  Plus,
  Printer,
  RefreshCw,
  Rewind,
  RotateCw,
  Search,
  SearchX,
  Send,
  Server,
  Share,
  Share2,
  Sparkles,
  SunMedium,
  Tag,
  Trash,
  Twitter,
  Type,
  Users,
  Wand2,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
  GraduationCap,
  MessageSquare,
  Maximize2,
  MoveUp,
  MoveDown,
  Facebook,
} from "lucide-react"

/* ---------- 1.  Fallback / branding icon --------------------------------- */
const Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <Building2 {...props} className={`h-6 w-6 ${props.className ?? ""}`} />
)

/* ---------- 2.  Master dictionary of icons ------------------------------- */
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
  listTree: ListTree,
  play: Play,
  pause: Pause,
  rewind: Rewind,
  fastForward: FastForward,
  gripVertical: GripVertical,
  construction: Construction,
  plus: Plus,
  Plus: Plus,
  close: X,
  x: X,
  share: Share,
  share2: Share2,
  moveUp: MoveUp,
  moveDown: MoveDown,
  RefreshCw: RefreshCw,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,

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
  facebook: Facebook,

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
  image: Image,
  ImageIcon: ImageIcon,
  users: Users,
  pizza: Pizza,
  type: Type,
  MessageSquare: MessageSquare,
  Maximize2: Maximize2,

  /* Résumé / timeline */
  graduationCap: GraduationCap,
  award: Award,

  /* Branding */
  logo: Logo,
  sparkles: Sparkles,
} as const

/* ---------- 3.  Safe, typed proxy ---------------------------------------- */
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

/* Allow both `import { Icons }` and default import styles */
export default Icons
