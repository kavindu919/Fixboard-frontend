import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthGuard from './routes/AuthGuard';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';
import NotFoundPage from './pages/NotFoundPage';
import ComingSoon from './components/ComingSoon';
import ManageTeam from './pages/dashboard/team/ManageTeam';

const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const AllIssues = lazy(() => import('./pages/dashboard/issue/AllIssues'));
const CreateIssue = lazy(() => import('./pages/dashboard/issue/CreateIssue'));
const EditIssue = lazy(() => import('./pages/dashboard/issue/EditIssue'));
const ViewIssue = lazy(() => import('./pages/dashboard/issue/ViewIssue'));
const Dashboard = lazy(() => import('./pages/dashboard/issue/Dashboard'));
const MyIssues = lazy(() => import('./pages/dashboard/my-issues/MyIssues'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="issues" element={<AllIssues />} />
              <Route path="issues/create" element={<CreateIssue />} />
              <Route path="issues/edit/:id" element={<EditIssue />} />
              <Route path="issues/view/:id" element={<ViewIssue />} />
              <Route path="myissues" element={<MyIssues />} />
              <Route path="team" element={<ManageTeam />} />
            </Route>
          </Route>
          <Route path="/comming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
