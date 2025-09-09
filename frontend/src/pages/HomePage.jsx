import React from 'react';
import { useState, useContext } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/store/AuthContext';

const HomePage = () => {
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    });

    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);
    const { setUser } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        const {success, message, user, token} = await login(newUser);
        console.log("Success:", success);
        
        if (success) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigate(`/mainPage/${user.userName}`);
        } else {
            alert(message);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"3xl"} textAlign={"center"} mb={8}>
                    Iniciar sesión
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"3xl"} shadow={"xl"}>
                    <VStack spacing={4}>
                        <Input placeholder='Nombre de usuario' variant={"subtle"} size={"xl"} name='userName' value={newUser.userName} onChange={(e) => setNewUser({...newUser, userName: e.target.value})} />
                        <Input placeholder='Contraseña' variant={"subtle"} size={"xl"} name='password' type='password' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleLogin} w='full' fontSize={"md"}>
                            Continuar
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default HomePage