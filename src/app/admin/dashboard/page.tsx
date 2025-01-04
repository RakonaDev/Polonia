'use client'

import { useUser } from "@clerk/nextjs"

export default function DashboardPage() {
  const user = useUser()
  return (
    <main className="mt-6 h-auto">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div>
        { JSON.stringify(user.user?.publicMetadata.role) }
      </div>
    
    </main>
  )
}
