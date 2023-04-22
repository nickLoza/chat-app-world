import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";


import { lazy, useContext } from "react";
import { AuthContext } from "./context/AuthContext";



function App() {
	const { currentUser } = useContext(AuthContext);

	const DefaultRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  
	return (
		<HashRouter>
			<Routes>
				 <Route path="/">
          <Route
            index
            element={
              <DefaultRoute>
                <Home />
              </DefaultRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
			</Routes>
		</HashRouter>
	)
}

export default App