import { useState } from "react";
import { useMutation } from "urql";
import Task from "./task";

const ulStyle = {
    marginBlockStart: "0",
    marginBlockEnd: "0",
    paddingInlineStart: "0",
    listStyleType: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px"
}

export default function TaskList(props: { data: any, completed: boolean, title: string, color: string }) {

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

    return (<section>
        <h4>{props.title}</h4>
        <ul style={ulStyle}>
            {props.data.tasks.filter((task: any) => task.completed === props.completed).map((task: any) => (
                <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} color={props.color} />
            ))}
        </ul>
    </section>)
}