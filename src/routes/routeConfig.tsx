'use client'

import { lazy, Suspense, ReactNode, ComponentType } from 'react'

// Lazy-loaded route components with proper typing for named exports
const Dashboard = lazy(() => 
  import('@/src/page-components/Dashboard').then(module => ({ default: module.Dashboard }))
) as unknown as React.LazyExoticComponent<ComponentType<unknown>>

const OrderHistory = lazy(() => 
  import('@/src/page-components/OrderHistory').then(module => ({ default: module.OrderHistory }))
) as unknown as React.LazyExoticComponent<ComponentType<unknown>>

const OrderDetail = lazy(() => 
  import('@/src/page-components/OrderDetail').then(module => ({ default: module.OrderDetail }))
) as unknown as React.LazyExoticComponent<ComponentType<unknown>>

const CreateOrderContent = lazy(() => 
  import('@/src/page-components/CreateOrderContent').then(module => ({ default: module.CreateOrderContent }))
) as unknown as React.LazyExoticComponent<ComponentType<unknown>>

const LoginPage = lazy(() => 
  import('@/src/page-components/LoginPage').then(module => ({ default: module.LoginPage }))
) as unknown as React.LazyExoticComponent<ComponentType<unknown>>

// Route type definition
export interface RouteConfig {
  path: string
  component: React.LazyExoticComponent<ComponentType<unknown>>
  exact?: boolean
}

// Route configuration
export const routes: RouteConfig[] = [
  { path: '/', component: LoginPage, exact: true },
  { path: '/dashboard', component: Dashboard },
  { path: '/orders', component: OrderHistory },
  { path: '/orders/:id', component: OrderDetail },
  { path: '/create-order', component: CreateOrderContent },
]

// Loading component
export function RouteLoader(): ReactNode {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

// Suspense wrapper for lazy-loaded routes
export function LazyRoute({
  component: Component,
  fallback = <RouteLoader />,
}: {
  component: React.LazyExoticComponent<React.ComponentType<unknown>>
  fallback?: ReactNode
}): ReactNode {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  )
}