"use client"

import { CustomActionsManager } from "@/components/custom-actions/custom-actions-manager"
import { CustomActionProvider } from "@/contexts/custom-actions-context"
import { PageBackground } from "@/components/page-background"

export default function CustomActionsPage() {
  return (
    <>
      <PageBackground />
      <div className="container py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8">Custom Text Actions Settings</h1>
        <CustomActionProvider>
          <CustomActionsManager />
        </CustomActionProvider>
      </div>
    </>
  )
}
