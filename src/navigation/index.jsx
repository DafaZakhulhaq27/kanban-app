import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { Home, Login, Register } from "../pages";
import { BASEHOME, BASELOGIN, BASEREGISTER, HOME, LOGIN, REGISTER } from "./routesName";

  const Navigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
              path={BASEHOME}
              element={<Navigate to={HOME} />}
          />            
          <Route
            path={HOME}
            element={
              <ProtectedRoute isLogin>
                <Home />
              </ProtectedRoute>              
            }
          />

          <Route
            path={BASELOGIN}
            element={<Navigate to={LOGIN} replace />}
          />    
          <Route
            path={LOGIN}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path={BASEREGISTER}
            element={<Navigate to={REGISTER} replace />}
          />    
          <Route
            path={REGISTER}
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </BrowserRouter>
    )
  }

  export default Navigation