import { Inter } from "next/font/google"
import localFont from "next/font/local"

/**
 * Google Inter – body / UI font
 * Creates CSS custom property --font-sans
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

/**
 * Cal Sans SemiBold – heading font
 * Creates CSS custom property --font-cal
 */
export const fontCalSans = localFont({
  src: [
    {
      path: "../assets/fonts/CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cal",
  display: "swap",
})
