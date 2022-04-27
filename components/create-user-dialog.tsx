import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { useMutation } from "urql";

const MutationCreateUser = `
mutation ($email: String!, $name: String!) {
    createUser (email: $email, name: $name) {
      id
      name
      email
    }
  }
`;


export default function CreateUserDialog(props: { open: boolean, onClose: any, users: any }) {
    const [createUserResult, createUser] = useMutation(MutationCreateUser);
    const toast = useToast()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const nameError = name === '';
    const emailError = email === '';

    const handleNameChange = (e: any) => setName(e.target.value)
    const handleEmailChange = (e: any) => setEmail(e.target.value)
    return (
        <>
            <Modal isOpen={props.open} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <FormControl isInvalid={nameError}>
                                <FormLabel htmlFor='Name'>Name</FormLabel>
                                <Input id='Name' type='Name' onChange={handleNameChange} value={name} />
                                {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>
                                }
                            </FormControl>
                            <FormControl isInvalid={emailError}>
                                <FormLabel htmlFor='Email'>Email</FormLabel>
                                <Input id='Email' type='Email' onChange={handleEmailChange} value={email} />
                                {nameError && <FormErrorMessage>Email is required.</FormErrorMessage>
                                }

                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            const variables = { name, email };
                            createUser(variables).then((result: any) => {
                                toast({
                                    title: `New user created.`,
                                    status: "success",
                                    isClosable: true,
                                    duration: 3000
                                })
                                props.onClose();
                            }).catch((e) => {
                                console.log(e)
                                toast({
                                    title: `Error creating user: ${e}`,
                                    status: "error",
                                    isClosable: true,
                                    duration: 3000
                                })
                            });;
                        }} disabled={nameError || emailError}>
                            Create
                        </Button>
                        <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}