import {Route, Routes} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from './pages/Auth/LoginPage';
import MainServicesPage from './pages/MainServicePage';

function App() {


  return (
    <div>

    <Routes>

      <Route 
        path='/'
        element={<Homepage/>}
      />

      <Route
        path='/main'
        element={<MainServicesPage/>}
      />

      <Route
        path='/signup'
        element={<SignupPage/>}
      />

      <Route
        path='/login'
        element={<LoginPage/>}
      />

      
    </Routes>



    </div>
  )
}

export default App
