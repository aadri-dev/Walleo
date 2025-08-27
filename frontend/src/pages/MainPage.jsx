import { Container, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAccountStore } from '@/store/account';
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const { findAccountsUser, accounts } = useAccountStore();
    const { userName } = useParams();

    useEffect(() => {
        findAccountsUser(userName);
    }, [findAccountsUser]);
    console.log("cuentas", accounts);
    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"} color={"lightblue"}>
                    Tus cuentas
                </Text>
                {accounts.length > 0 ? (
                    <ul>
                        {accounts.map((u, index) => (
                            <li key={index}>{u.name}</li>
                        ))}
                    </ul>
                ) : (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"lightblue"}>
                    No hay cuentas creadas
                </Text>
                )}
            </VStack>
        </Container>
    )
}

export default MainPage