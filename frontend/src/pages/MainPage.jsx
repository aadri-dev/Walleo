import { Container, Text, VStack, Table, Box, Input, Button, Field, Popover, Portal, Stack, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAccountStore } from '@/store/account';
import { useUserStore } from '@/store/user';
import { useParams, useNavigate } from 'react-router-dom';

const MainPage = () => {
    const { findAccountsUser, accounts, addIncome, addSpend, createAccount, deleteAccountUser } = useAccountStore();
    const { userName } = useParams();
    const { user: userStore } = useUserStore();
    const navigate = useNavigate();
    const [user, setUser] = useState(userStore || null);

    const [newAccountIncome, setNewAccountIncome] = useState({
        amount: "",
    });

    const [newAccountSpend, setNewAccountSpend] = useState({
        name: "",
        amount: "",
    });

    const [newAccount, setNewAccount] = useState ({
        userName: userName,
        name: "",
        description: "",
        percentage: "",
        amount: "",
    });

    const [deleteAccount, setDeleteAccount] = useState({
        name: "",
    });

    const handleIncome = async () => {
        addIncome(userName, newAccountIncome.amount);
    };

    const handleSpend = async () => {
        addSpend(userName, newAccountSpend.name, newAccountSpend.amount);
    };

    const handleCreation = async () => {
        let existsAccount = 0;
        let totalPercentage = 0;
        for (let i = 0; i < accounts.length; i++) {
            let minusAccount = accounts[i].name.toLowerCase();
            let minusNewAccount = newAccount.name.toLowerCase();
            if (minusAccount == minusNewAccount) {
                alert("No se puede crear una cuenta con un nombre que ya existe");
                existsAccount = 1;
                break;
            }
            totalPercentage += accounts[i].percentage;
        }
        if (existsAccount == 0 && ((parseFloat(totalPercentage, 10) + parseFloat(newAccount.percentage, 10)) <= 1)) {
            createAccount(newAccount);
        } else {
            alert("El porcentaje total no debe superar el 100%");
        }
    };

    const handleDelete = async () => {
        deleteAccountUser(userName, deleteAccount.name);
    };

    // useEffect(() => {
    //     findAccountsUser(userName);
    // }, [findAccountsUser]);

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setNewAccount(prev => ({ ...prev, userName: parsedUser.userName }));
            } else {
                navigate("/"); // si no hay user, redirige al login
            }
        }
    }, [user, navigate]);

    // Cargar cuentas cuando tengamos userName
    useEffect(() => {
        if (user?.userName) {
            findAccountsUser(user.userName);
        }
    }, [user, findAccountsUser]);

    if (!user) return null; // mientras carga o redirige
    
    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text fontSize={"3xl"} fontWeight={"bold"} bgClip={"text"} textAlign={"center"} color={"lightblue"}>
                    Tus cuentas
                </Text>
                <Grid templateColumns={"repeat(2, 5fr)"} gap={"40"}>
                    <GridItem>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button size="md" variant="solid" fontSize={"md"}>
                                    Crear cuenta
                                </Button>
                            </Popover.Trigger>
                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content>
                                        <Popover.Arrow />
                                        <Popover.Body>
                                            <Stack gap="3">
                                                <Field.Root>
                                                    <Field.Label>Nombre</Field.Label>
                                                    <Input name='name' value={newAccount.name} onChange={(e) => setNewAccount({...newAccount, name: e.target.value})} />
                                                </Field.Root>
                                                <Field.Root>
                                                    <Field.Label>Descripción</Field.Label>
                                                    <Input name='description' value={newAccount.description} onChange={(e) => setNewAccount({...newAccount, description: e.target.value})} />
                                                </Field.Root>
                                                <Field.Root>
                                                    <Field.Label>Porcentaje</Field.Label>
                                                    <Input name='percentage' value={newAccount.percentage} onChange={(e) => setNewAccount({...newAccount, percentage: e.target.value})} />
                                                </Field.Root>
                                                <Field.Root>
                                                    <Field.Label>Cantidad</Field.Label>
                                                    <Input name='amount' value={newAccount.amount} onChange={(e) => setNewAccount({...newAccount, amount: e.target.value})} />
                                                </Field.Root>
                                                <Button size="sm" variant="solid" onClick={handleCreation}>
                                                    Crear
                                                </Button>
                                            </Stack>
                                        </Popover.Body>
                                        <Popover.CloseTrigger />
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                    </GridItem>
                    <GridItem>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button size="md" variant="solid" fontSize={"md"}>
                                    Eliminar cuenta
                                </Button>
                            </Popover.Trigger>
                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content>
                                        <Popover.Arrow />
                                        <Popover.Body>
                                            <Stack gap="3">
                                                <Field.Root>
                                                    <Field.Label>Nombre</Field.Label>
                                                    <Input name='name' value={deleteAccount.name} onChange={(e) => setDeleteAccount({...deleteAccount, name: e.target.value})} />
                                                </Field.Root>
                                                <Button size="sm" variant="solid" onClick={handleDelete}>
                                                    Eliminar
                                                </Button>
                                            </Stack>
                                        </Popover.Body>
                                        <Popover.CloseTrigger />
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                    </GridItem>
                </Grid>
                {accounts.length > 0 ? (
                    <Table.Root size={"lg"} showColumnBorder interactive>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader textAlign={"center"}>Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign={"center"}>Descripción</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign={"center"}>Porcentaje asociado</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign={"center"}>Cantidad</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {accounts.map((account) => (
                                <Table.Row key={account._id}>
                                    <Table.Cell textAlign={"center"}>{account.name}</Table.Cell>
                                    <Table.Cell textAlign={"center"}>{account.description}</Table.Cell>
                                    <Table.Cell textAlign={"center"}>{account.percentage}</Table.Cell>
                                    <Table.Cell textAlign={"center"}>{account.amount}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"lightblue"}>
                    No hay cuentas creadas
                </Text>
                )}
                <Grid templateColumns={"repeat(2, 5fr)"} gap={"40"}>
                    <GridItem>
                        <Box w={"500px"} p={6} rounded={"3xl"} shadow={"xl"} >
                            <VStack spacing={4}>
                                <Input placeholder='Cantidad' variant={"subtle"} size={"xl"} name='amount' value={newAccountIncome.amount} onChange={(e) => setNewAccountIncome({...newAccountIncome, amount: e.target.value})} />
                                <Button colorScheme='blue' onClick={handleIncome} w='full'fontSize={"md"}>
                                    Añadir ingreso
                                </Button>
                            </VStack>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box w={"500px"} p={6} rounded={"3xl"} shadow={"xl"}>
                            <VStack spacing={4}>
                                <Input placeholder='Cantidad' variant={"subtle"} size={"xl"} name='amount' value={newAccountSpend.amount} onChange={(e) => setNewAccountSpend({...newAccountSpend, amount: e.target.value})} />
                                <Input placeholder='Nombre de cuenta' variant={"subtle"} size={"xl"} name='name' value={newAccountSpend.name} onChange={(e) => setNewAccountSpend({...newAccountSpend, name: e.target.value})} />
                                <Button colorScheme='blue' onClick={handleSpend} w='full'fontSize={"md"}>
                                    Añadir gasto
                                </Button>
                            </VStack>
                        </Box>
                    </GridItem>
                </Grid>
            </VStack>
        </Container>
    )
}

export default MainPage