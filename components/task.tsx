import { Badge, Box, Stack, StackDivider, Switch, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Task(props: { task: any, updateTask: any, color: string, deleteTask: any }) {
    const { task, updateTask, deleteTask, color } = props;
    const [showDelete, toggleShowDelete] = useState(false);

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
                        <Badge colorScheme='default'>{task.author.name}</Badge>
                    </Stack>

                    {/* <div onClick={() => {
                    const variables = { id: task.id, completed: !task.completed };
                    updateTask(variables).then((result: any) => {
                    });
                }}></div> */}
                    {/* <div style={{}}>
                    {showDelete && <button onClick={() => {
                        const variables = { id: task.id };
                        deleteTask(variables).then((result: any) => {
                        });
                    }}>Delete</button>}
                </div> */}
                </VStack>
            </Box>
        </li>
    )
}