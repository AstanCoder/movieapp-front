import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainApp from "./pages";
import Login from "./pages/login";
import AuthProvider from "./auth/Provider";
import Authenticated from "./auth/Authenticated";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Authenticated>
          <Routes>
            <Route
              exact
              path="/"
              render={() => <MainApp />}
              element={<MainApp />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login />}
              element={<Login />}
            />
          </Routes>
        </Authenticated>
      </AuthProvider>
    </Router>
  );
};

export default App;
