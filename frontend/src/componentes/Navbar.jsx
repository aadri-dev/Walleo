import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import { useColorMode } from '@/components/ui/color-mode';
import { useUserStore } from '@/store/user';

const Navbar = () => {
    const { colorMode, toggleColorMode} = useColorMode();
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    // const { user, logout } = useUserStore();
    // const [currentUser, setCurrentUser] = useState(user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         const storedUser = localStorage.getItem("user");
    //         if (storedUser) setCurrentUser(JSON.parse(storedUser));
    //     } else {
    //         setCurrentUser(user);
    //     }
    // }, [user]);

    const handleLogout = () => {
        logout();
        // setCurrentUser(null);
        navigate("/");
    }

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex 
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{base:"column", sm:"row"}}
            >
                <Text 
                    textStyle={"2xl"}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgClip={"text"}
                    color={'lightblue'}
                    >
                        <Link to={user ? `/mainPage/${user.userName}` : "/"}>Walleo</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    {user && (
                        <Text fontSize="lg" fontWeight={"bold"} paddingRight={"20px"}>
                            Hola, {user.userName}
                        </Text>
                    )}
                    <Link to={"/create"}>
                        <Button>
                            {/* <FaSquarePlus fontSize={20} /> */}
                            Registrarse
                        </Button>
                    </Link>
                    {user ? (
                        <Button colorScheme="red" onClick={handleLogout}>
                            Salir
                        </Button>
                    ) : (
                        <Link to="/">
                            <Button colorScheme="blue">Iniciar Sesión</Button>
                        </Link>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? "🌚" : "🌞"}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar