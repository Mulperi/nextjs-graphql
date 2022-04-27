import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, ButtonGroup, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Stack, StackDivider, Switch, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
    PopoverTrigger as OrigPopoverTrigger
} from '@chakra-ui/react'

const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
    OrigPopoverTrigger

export default function Task(props: { task: any, updateTask: any, deleteTask: any }) {
    const { task, updateTask, deleteTask } = props;
    const [showDelete, toggleShowDelete] = useState(false);
    const toast = useToast();
    const closePopover = () => toggleShowDelete(false);
    const showPopover = () => toggleShowDelete(true);


    return (
        <li key={task.id}
            onMouseEnter={() => {
                // toggleShowDelete(!showDelete);
            }}
            onMouseLeave={() => {
                // toggleShowDelete(!showDelete);
            }}>
            <Box p={2} border="1px solid grey" borderRadius={3} boxShadow="2px 2px 10px rgba(0,0,0,0.10)">
                <VStack spacing={2} divider={<StackDivider borderColor='gray.200' />}>

                    <Stack direction='column'>
                        <Badge colorScheme={task.completed ? 'green' : 'purple'} onClick={() => {
                            const variables = { id: task.id, completed: !task.completed };
                            updateTask(variables).then((result: any) => {
                            });
                        }} style={{ cursor: "pointer" }}>{task.title}</Badge>

                        <HStack justify="space-between">
                            <Badge colorScheme='default'>{task.author.name}</Badge>
                            <Popover isOpen={showDelete}
                                onClose={closePopover}>
                                <PopoverTrigger>
                                    <div>
                                        {showDelete && <ChevronDownIcon as="button" style={{ cursor: "pointer" }} onClick={closePopover} />}
                                        {!showDelete && <ChevronUpIcon as="button" style={{ cursor: "pointer" }} onClick={showPopover} />}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Are you sure?</PopoverHeader>
                                    <PopoverBody>
                                        The task will be permanently deleted!
                                    </PopoverBody>
                                    <PopoverFooter
                                        border='0'
                                        d='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        pb={4}
                                    >
                                        <ButtonGroup size='sm'>
                                            <Button colorScheme="red" onClick={() => {
                                                const variables = { id: task.id };
                                                deleteTask(variables).then((result: any) => {
                                                    toast({
                                                        title: `Task deleted.`,
                                                        status: "success",
                                                        isClosable: true,
                                                        duration: 3000
                                                    })
                                                    closePopover();
                                                });
                                            }}>Delete</Button>
                                            <Button colorScheme='blue' onClick={closePopover}>
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                    </Stack>
                </VStack>
            </Box>
        </li>
    )
}