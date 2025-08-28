import { Container, Text, VStack, Table, Box, Input, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAccountStore } from '@/store/account';
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const { findAccountsUser, accounts } = useAccountStore();
    const { userName } = useParams();

    const [newAccountIncome, setNewAccountIncome] = useState({
        amount: "",
    });

    const [newAccountSpend, setNewAccountSpend] = useState({
        name: "",
        amount: "",
    });

    const handleIncome = async () => {
        console.log(newAccountIncome);
    };

    const handleSpend = async () => {
        console.log(newAccountSpend);
    };

    useEffect(() => {
        findAccountsUser(userName);
    }, [findAccountsUser]);
    
    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"} color={"lightblue"}>
                    Tus cuentas
                </Text>
                {accounts.length > 0 ? (
                    <Table.Root size={"sm"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader>Descripción</Table.ColumnHeader>
                                <Table.ColumnHeader>Porcentaje asociado</Table.ColumnHeader>
                                <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {accounts.map((account) => (
                                <Table.Row key={account._id}>
                                    <Table.Cell>{account.name}</Table.Cell>
                                    <Table.Cell>{account.description}</Table.Cell>
                                    <Table.Cell>{account.percentage}</Table.Cell>
                                    <Table.Cell>{account.amount}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"lightblue"}>
                    No hay cuentas creadas
                </Text>
                )}
                <Box w={"1/2"} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='Cantidad' name='amount' value={newAccountIncome.amount} onChange={(e) => setNewAccountIncome({...newAccountIncome, amount: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleIncome} w='full'>
                            Añadir ingreso
                        </Button>
                    </VStack>
                </Box>
                <Box w={"1/2"} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='Cantidad' name='amount' value={newAccountSpend.amount} onChange={(e) => setNewAccountSpend({...newAccountSpend, amount: e.target.value})} />
                        <Input placeholder='Nombre de cuenta' name='name' value={newAccountSpend.name} onChange={(e) => setNewAccountSpend({...newAccountSpend, name: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleSpend} w='full'>
                            Añadir gasto
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default MainPage