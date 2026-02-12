import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import AllIssues from './pages/dashboard/issue/AllIssues';
import CreateIssue from './pages/dashboard/issue/CreateIssue';
import EditIssue from './pages/dashboard/issue/EditIssue';
import AuthGuard from './routes/AuthGuard';
import ViewIssue from './pages/dashboard/issue/ViewIssue';
import Dashboard from './pages/dashboard/issue/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="issues" element={<AllIssues />} />
            <Route path="issues/create" element={<CreateIssue />} />
            <Route path="issues/edit/:id" element={<EditIssue />} />
            <Route path="issues/view/:id" element={<ViewIssue />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
