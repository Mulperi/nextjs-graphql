import { useState } from "react";

export default function Task(props: { task: any, updateTask: any, color: string, deleteTask: any }) {
    const { task, updateTask, deleteTask, color } = props;
    const [showDelete, toggleShowDelete] = useState(false);

    return (
        <li key={task.id}
            onMouseEnter={() => {
                toggleShowDelete(!showDelete);
            }}
            onMouseLeave={() => {
                toggleShowDelete(!showDelete);
            }}
            style={{
                padding: "10px", borderRadius: "1px", border: "1px solid grey", boxShadow: "2px 2px 10px rgba(0,0,0,0.10)"
            }}>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div onClick={() => {
                    const variables = { id: task.id, completed: !task.completed };
                    updateTask(variables).then((result: any) => {
                    });
                }} style={{ height: "8px", background: props.color, borderRadius: "4px", marginBottom: "4px", cursor: "pointer" }}></div>
                <div>{task.title}</div>
                <div style={{}}>
                    {showDelete && <button onClick={() => {
                        const variables = { id: task.id };
                        deleteTask(variables).then((result: any) => {
                        });
                    }}>Delete</button>}
                </div>
            </div>
        </li>
    )
}