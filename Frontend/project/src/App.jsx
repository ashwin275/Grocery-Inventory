
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Components/Home'
import Navbar from './Components/Navbar'

function App() {
 

  return (
    <>
    <ToastContainer/>
    <div className='container'>
    <Navbar/>
    <Home/>

    </div>
   
       
    </>
  )
}

export default App
