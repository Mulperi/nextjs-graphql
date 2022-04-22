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
    FormHelperText,
    VStack,
    FormErrorMessage,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useMutation } from "urql";


const MutationCreateTask = `
mutation ($title: String!, $authorId: Int!) {
    createTask (title: $title, authorId: $authorId) {
      id
      title
      authorId
      completed
    }
  }
`;


export default function CreateTaskDialog(props: { open: boolean, onClose: any, users: any }) {
    const [createTaskResult, createTask] = useMutation(MutationCreateTask);
    const [title, setTitle] = useState('New task');
    const [authorId, setAuthorId] = useState<string>("");
    const titleError = title === '';
    const authorError = !authorId;
    const handleTitleChange = (e: any) => setTitle(e.target.value)
    const handleAuthorChange = (e: any) => {
        console.log(e.target.value)
        setAuthorId(e.target.value)
    }
    return (
        <>
            <Modal isOpen={props.open} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <FormControl isInvalid={titleError}>
                                <FormLabel htmlFor='Description'>Description</FormLabel>
                                <Input id='Description' type='Description' onChange={handleTitleChange} value={title} />
                                {titleError && <FormErrorMessage>Description is required.</FormErrorMessage>
                                }
                            </FormControl>
                            <FormControl isInvalid={authorError}>
                                <Select placeholder='Author' onChange={handleAuthorChange} value={authorId}>
                                    {props.users.map((user: any) => (<option key={user.id} value={user.id}>{user.name}</option>))}
                                </Select>
                                {authorError && <FormErrorMessage>Author is required.</FormErrorMessage>
                                }
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            const variables = { title, authorId: parseInt(authorId) };
                            createTask(variables).then((result: any) => {
                                props.onClose();
                            });
                        }} disabled={titleError || authorError}>
                            Create
                        </Button>
                        <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}