import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import { BASEHOME, BASELOGIN, BASEREGISTER, HOME, LOGIN, REGISTER } from "./routesName";

  const Navigation = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
              path={BASEHOME}
              element={<Navigate to={HOME} replace />}
          />            
          <Route
            path={HOME}
            element={
              <Home />
            }
          />

          <Route
            path={BASELOGIN}
            element={<Navigate to={LOGIN} replace />}
          />    
          <Route
            path={LOGIN}
            element={
              <Login />
            }
          />

          <Route
            path={BASEREGISTER}
            element={<Navigate to={REGISTER} replace />}
          />    
          <Route
            path={REGISTER}
            element={
              <Register />
            }
          />
          
        </Routes>
      </BrowserRouter>
    )
  }

  export default Navigation