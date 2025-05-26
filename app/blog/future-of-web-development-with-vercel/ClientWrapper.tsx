"use client"

import dynamic from "next/dynamic"

// Use dynamic import with ssr: false in this client component
const DynamicVercelFuturePostPage = dynamic(() => import("./VercelFuturePostPage"), {
  ssr: false,
})

export default function VercelFutureClientWrapper() {
  return <DynamicVercelFuturePostPage />
}
