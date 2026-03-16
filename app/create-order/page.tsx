import { ProtectedRoute } from '@/src/components/ProtectedRoute'
import { MainLayout } from '@/src/components/MainLayout'

export default function CreateOrderPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div>
          <h1>Create Order</h1>
          <p>Coming Soon</p>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
