import {Route, Routes} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from './pages/Auth/LoginPage';
import MainServicesPage from './pages/MainServicePage';
import Private from './components/Private';
import Anon from './components/Anon';

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
        element={
          <Anon>
            <SignupPage/>
          </Anon>
        }
      />

      <Route
        path='/login'
        element={
          <Anon>
            <LoginPage/>
          </Anon>
        }
      />

      
    </Routes>



    </div>
  )
}

export default App
