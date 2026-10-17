import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { StaticPageFallback } from './components/ui/StaticPageFallback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary name="Root" fallback={<StaticPageFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
