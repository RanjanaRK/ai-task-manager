import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Tasks from "./components/pages/Tasks";
const App = () => {
  // const { theme, setTheme } = useTheme();
  return (
    <>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages with Navbar */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/tasks" element={<Tasks />} />
          {/* <Route path="/ai-assistant" element={<AIAssistant />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
