'use client'
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()
  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      { JSON.stringify(session) }
    </main>
  )
}
