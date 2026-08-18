"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, FileText } from "lucide-react"

export function DownloadCvMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download CV
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/Chris-Thackrey-Resume.pdf" download className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            PDF (.pdf)
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/Chris-Thackrey-Resume.docx" download className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            Microsoft Word (.docx)
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
