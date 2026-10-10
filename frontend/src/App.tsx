import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import AIAssistant from "./components/pages/AIAssistant";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Tasks from "./components/pages/Tasks";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Route>

      {/* Default route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
