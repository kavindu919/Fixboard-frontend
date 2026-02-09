import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import AllIssues from "./pages/dashboard/issue/AllIssues";
import CreateIssue from "./pages/dashboard/issue/CreateIssue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="issues" element={<AllIssues />} />
          <Route path="issues/create" element={<CreateIssue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
