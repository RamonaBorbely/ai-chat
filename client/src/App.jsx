import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import UserDashboard from './pages/users/UserDashboard';
import NewAbout from './pages/NewAbout';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/newabout' element={<NewAbout/>}/>
            <Route path='/contact' element={<Contact/>}/>
    
            <Route path='/userDashboard' element={
              <ProtectedRoute>
                <UserDashboard/>
              </ProtectedRoute>
              }/>

          
          </Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
