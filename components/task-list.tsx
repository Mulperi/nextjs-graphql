import { AddIcon } from "@chakra-ui/icons";
import { Heading, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "urql";
import Task from "./task";

export default function TaskList(props: { data: any, completed: boolean, title: string, openCreateTaskDialog?: any, selectedUsers: number[] }) {

  const UpdateTask = `
    mutation ($id: Int!, $completed: Boolean!) {
        updateTask (id: $id, completed: $completed) {
          id
          completed
        }
      }
    `;

  const DeleteTask = `
    mutation ($id: Int!) {
        deleteTask (id: $id) {
          id
        }
      }
    `;

  const [updateTaskResult, updateTask] = useMutation(UpdateTask);
  const [deleteTaskResult, deleteTask] = useMutation(DeleteTask);

  return (<section style={{ width: "100%" }}>
    <Heading as="h3" size="l">{props.title}</Heading>

    <ul style={{
      marginBlockStart: "0",
      marginBlockEnd: "0",
      paddingInlineStart: "0",
      listStyleType: "none",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "10px"
    }}>
      {props.openCreateTaskDialog && <li><IconButton aria-label='Create task' icon={<AddIcon />} onClick={() => {
        props.openCreateTaskDialog()
      }} /> </li>}
      {props.data.tasks.filter((task: any) => task.completed === props.completed).filter((task: any) => props.selectedUsers.includes(task.authorId)).map((task: any) => (
        <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </ul>
  </section>)
}