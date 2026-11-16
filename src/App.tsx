import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Contacto } from '@/pages/Contacto'
import { Dashboard } from '@/pages/Dashboard'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Nosotros } from '@/pages/Nosotros'
import { SnackbarProvider } from '@/components/ui/Snackbar'

function App() {
  return (
    <SnackbarProvider>
      <Routes>
        {/* Home page uses its own Header/Footer */}
        <Route
          path="/"
          element={
            <Layout showHeader={false} showFooter={false}>
              <Home />
            </Layout>
          }
        />
        {/* Nosotros page uses its own Header/Footer */}
        <Route
          path="/nosotros"
          element={
            <Layout showHeader={false} showFooter={false}>
              <Nosotros />
            </Layout>
          }
        />
        {/* Contacto page uses its own Header/Footer */}
        <Route
          path="/contacto"
          element={
            <Layout showHeader={false} showFooter={false}>
              <Contacto />
            </Layout>
          }
        />
        {/* Other pages use default Layout with Header/Footer */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </SnackbarProvider>
  )
}

export default App