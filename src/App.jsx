import SignupPage from "./pages/Auth/SignupPage";
import {Route, Routes} from 'react-router-dom';

function App() {


  return (
    <div className='App'>

    <Routes>

      <Route
        path='/signup'
        element={
          <Anon>
            <SignupPage />
          </Anon>
        }
      />

      
    </Routes>



    </div>
  )
}

export default App
