import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import { useAuth } from '@clerk/clerk-react'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import OrdersPage from './pages/OrdersPage'
import CustomersPage from './pages/CustomersPage'
import DashboardLayout from './layouts/DashboardLayout'
import { LoaderIcon } from 'lucide-react'
import PageLoader from './components/PageLoader'

function App() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <PageLoader></PageLoader>
  return (
  <Routes>
      <Route path='/login' element={isSignedIn ? <Navigate to={'/dashboard'}></Navigate> : <LoginPage></LoginPage>}></Route>
      <Route path='/' element={isSignedIn ? <DashboardLayout></DashboardLayout> :
        <Navigate to={'/login'}></Navigate>}>
        <Route index element={<Navigate to={'/dashboard'}></Navigate>}></Route>
        <Route path='dashboard' element={<DashboardPage></DashboardPage>}></Route>
        <Route path='products' element={<ProductsPage></ProductsPage>}></Route>
        <Route path='orders' element={<OrdersPage></OrdersPage>}></Route>
        <Route path='customers' element={<CustomersPage></CustomersPage>}></Route>
        </Route>
    </Routes>  
        
  )
   
  
}

export default App