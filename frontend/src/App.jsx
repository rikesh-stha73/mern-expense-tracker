import {BrowserRouter, Route, Routes} from "react-router-dom"
import HeroSection from "./components/Home/HomePage"
import PublicNavbar from "./components/Navbar/PublicNavbar"
import LoginForm from "./components/Users/Login"
import RegistrationForm from "./components/Users/Register"
import PrivateNavbar from "./components/Navbar/PrivateNavbar"
import { useSelector } from "react-redux"
import AddCategory from "./components/Category/AddCategory"
import CategoriesList from "./components/Category/CategoriesList"
import UpdateCategory from "./components/Category/UpdateCategory"
import TransactionForm from "./components/Transactions/TransactionForm"
import Dashboard from "./components/Users/Dashboard"
import UserProfile from "./components/Users/UserProfile"
import AuthRoute from "./components/AuthRoute/AuthRoute"
function App() {
  //get the token
 const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
    {/* NavBar */}
    
    {user? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/add-category" element={<AuthRoute children={<AddCategory />} />} />
          <Route path="/categories" element={<AuthRoute children={<CategoriesList />} />} />
          <Route path="/update-category/:id" element={<AuthRoute children={<UpdateCategory />} />} />
          <Route path="/add-transaction" element={<AuthRoute children={<TransactionForm />} />} />
          <Route path="/dashboard" element={<AuthRoute children={<Dashboard />} />} />
          <Route path="/profile" element={<AuthRoute children={<UserProfile />} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
