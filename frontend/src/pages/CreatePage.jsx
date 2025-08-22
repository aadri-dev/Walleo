import { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useUserStore } from '@/store/user';

const CreatePage = () => {
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
    });

    const {createUser} = useUserStore();
    const handleAddUser = async () => {
        console.log(newUser);
        const {success, message} = await createUser(newUser);
        console.log("Success:", success);
        console.log("Message:", message);
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                    Registrarse
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='User Name' name='userName' value={newUser.userName} onChange={(e) => setNewUser({...newUser, userName: e.target.value})} />
                        <Input placeholder='Password' name='password' type='password' value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleAddUser} w='full'>
                            Registrarse
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage