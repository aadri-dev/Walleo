import React from 'react';
import { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    });

    const navigate = useNavigate();
    const {findUserByName} = useUserStore();
    const handleCheckUser = async () => {
        console.log(newUser);
        const {success, message} = await findUserByName(newUser);
        console.log("Success:", success);
        
        if (success) {
            navigate("/mainPage");
        } else {
            alert(message);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                    Iniciar sesión
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='User Name' name='userName' value={newUser.userName} onChange={(e) => setNewUser({...newUser, userName: e.target.value})} />
                        <Input placeholder='Password' name='password' type='password' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleCheckUser} w='full'>
                            Continuar
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default HomePage