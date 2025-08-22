import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./componentes/Navbar";
import { useColorModeValue } from '@/components/ui/color-mode';
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Box>
  );
}

export default App;