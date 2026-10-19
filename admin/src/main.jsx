import * as Sentry from "@sentry/react";
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {ClerkProvider} from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('missing publishable key')
}
const queryClient = new QueryClient()

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  enableLogs: true,
    integrations: [
    Sentry.replayIntegration()
  ],
  replaysSessionSampleRate:1.0,
  replaysOnErrorSampleRate: 1.0 
});
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
    <App />
      </QueryClientProvider>
    </ClerkProvider>
    </BrowserRouter>
)