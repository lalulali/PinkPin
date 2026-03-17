'use client'

import { useState, useEffect, useCallback } from 'react'
import { routes, RouteConfig, RouteLoader, LazyRoute } from './routeConfig'

// Simple URL utility functions
function getPathname(): string {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return '/'
}

function matchRoute(pathname: string, route: RouteConfig): boolean {
  if (route.exact) {
    return pathname === route.path
  }
  // Handle dynamic routes like /orders/:id
  const routeParts = route.path.split('/')
  const pathnameParts = pathname.split('/')
  
  if (routeParts.length !== pathnameParts.length) {
    return false
  }
  
  return routeParts.every((part, index) => {
    if (part.startsWith(':')) {
      return true // Dynamic segment matches anything
    }
    return part === pathnameParts[index]
  })
}

// Router component props
interface RouterProps {
  children?: React.ReactNode
}

// Main Router component
export function Router({}: RouterProps): React.ReactElement {
  const [pathname, setPathname] = useState(getPathname())
  const [isInitializing, setIsInitializing] = useState(true)

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setPathname(getPathname())
    }

    window.addEventListener('popstate', handlePopState)
    setIsInitializing(false)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Find matching route
  const matchedRoute = routes.find((route) => matchRoute(pathname, route))

  // Show loading during initialization
  if (isInitializing) {
    return <RouteLoader />
  }

  // Render 404 if no route matches
  if (!matchedRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </div>
    )
  }

  // Render the matched route with lazy loading
  return (
    <LazyRoute
      component={matchedRoute.component}
      fallback={<RouteLoader />}
    />
  )
}

// Navigation hook
export function useNavigation(): {
  navigate: (path: string) => void
  pathname: string
} {
  const [pathname, setPathname] = useState(getPathname())

  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path)
    setPathname(path)
  }, [])

  return { navigate, pathname }
}

// Navigate component for declarative navigation
interface NavigateProps {
  to: string
  replace?: boolean
}

export function Navigate({ to, replace }: NavigateProps): null {
  useEffect(() => {
    if (replace) {
      window.history.replaceState({}, '', to)
    } else {
      window.history.pushState({}, '', to)
    }
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [to, replace])

  return null
}

export default Router