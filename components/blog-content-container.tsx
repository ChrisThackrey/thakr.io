interface BlogContentContainerProps {
  slug: string
  children: React.ReactNode
}

export default function BlogContentContainer({ children }: BlogContentContainerProps) {
  return (
    <div>
      {children}
    </div>
  )
}