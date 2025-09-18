import { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import Login from './components/Login'
import RegistrationForm from './components/RegistrationForm'
import Dashboard from './pages/User/Dashboard'
import Maincategory from './pages/User/Maincategory'
import CreatemainCategory from './pages/User/CreatemainCategory'
import EditMaincategory from './pages/User/EditMaincategory'
import Subcategory from './pages/User/subcategory/Subcategory'
import CreateSubcategory from './pages/User/subcategory/Createsubcategory'
import EditSubcategory from './pages/User/subcategory/EditSubcategory'
import CostList from './pages/User/costcalculator/CostList'
import CreateCost from './pages/User/costcalculator/CreateCost'
import Editcost from './pages/User/costcalculator/Editcost'
import ProfitLossList from './pages/User/profitLoss/ProfitLossList'
import CreateProfitLoss from './pages/User/profitLoss/CreateProfitLoss'
import AdminLogin from './components/AdminLogin'
import FarmersList from './pages/Admin/FarmersList'
import FarmersbyLocation from './pages/Admin/FarmersbyLocation'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegistrationForm />} />
        {/* user routes */}
        <Route path='/user/dashboard/:id' element={<Dashboard />} />
        <Route path='/user/maincategory' element={<Maincategory />} />
        <Route path='/user/maincategorycreate' element={<CreatemainCategory />} />
        <Route path="/user/maincategory/edit/:id" element={<EditMaincategory />} />
        <Route path="/user/subcategory" element={<Subcategory />} />
        <Route path="/user/subcategory/create" element={<CreateSubcategory />} />
        <Route path="/user/subcategory/edit/:id" element={<EditSubcategory />} />

        <Route path="/user/cost" element={<CostList />} />
        <Route path="/user/cost/create" element={<CreateCost />} />
        <Route path="/user/cost/edit/:id" element={<Editcost />} />

        <Route path="/user/profitloss" element={<ProfitLossList/>} />
        <Route path="/user/profitloss/create" element={<CreateProfitLoss />} />

        {/* admin routes */}
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<FarmersList/>} />
        <Route path='/admin/farmers/location' element={<FarmersbyLocation/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
