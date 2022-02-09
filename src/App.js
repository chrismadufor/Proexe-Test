import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTable from "./components/UserTable";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<UserTable />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="update/:id" element={<UpdateUser />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
