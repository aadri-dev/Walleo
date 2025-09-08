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
                    fontSize={{base:"22", sm:"28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    color={'lightblue'}
                    >
                        <Link to={user ? `/mainPage/${user.userName}` : "/"}>Walleo</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <FaSquarePlus fontSize={20} />
                        </Button>
                    </Link>
                    {user && (
                        <Text fontSize="md" fontWeight="medium">
                            Hola, {user.userName}
                        </Text>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? "🌚" : "🌞"}
                    </Button>
                    {user ? (
                        <Button colorScheme="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/">
                            <Button colorScheme="blue">Login</Button>
                        </Link>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar