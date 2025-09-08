import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./componentes/Navbar";
import { useColorModeValue } from '@/components/ui/color-mode';
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./store/AuthContext";
import { useUserStore } from "./store/user";

function App() {
  const initUser = useUserStore(state => state.initUser);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <AuthProvider>
      <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/mainPage/:userName" element={<MainPage />} />
      </Routes>
    </Box>
    </AuthProvider>
  );
}

export default App;