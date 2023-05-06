import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import { ColorModeContext, themeSettings, useMode } from "./theme";
import { CssBaseline, createTheme } from "@mui/material";
import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { SidebarProvider } from "./components/SidebarContext";
import Topbar from "./components/Topbar";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
