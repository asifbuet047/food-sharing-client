import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Home from "./Components/Home/Home"
import Navigationbar from "./Components/Navbar/Navigationbar"

function Root() {

  return (
    <div>
      <Navigationbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
