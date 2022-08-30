import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { Home } from "../pages";
import { HOME } from "./routesName";

  const Navigation = () => {
    return (
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={<Navigate to={HOME} replace />}
        />            
          <Route
            path={HOME}
            element={
              <Home />
            }
          />
        </Routes>
      </BrowserRouter>
    )
  }

  export default Navigation