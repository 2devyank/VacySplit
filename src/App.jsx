
import './App.css'
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Userdetails from './components/Userdetails';
import { useParams } from 'react-router-dom';
import Group from './components/Group';
function App() {
 
  return (
    <BrowserRouter>
    
   
    <div>
      <Routes >
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} exact/>
      <Route path="/login" element={<Login />} exact/>
      <Route path="/register" element={<Register />} exact/>
      <Route path="/user" element={<Userdetails />} exact/>
      <Route path="/group" element={<Group />} exact/>
      </Routes>
    </div>

    </BrowserRouter>
  )
}

export default App
