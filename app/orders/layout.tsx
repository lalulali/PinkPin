import { ProtectedRoute } from '@/src/components/ProtectedRoute'
import { MainLayout } from '@/src/components/MainLayout'

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  )
}
