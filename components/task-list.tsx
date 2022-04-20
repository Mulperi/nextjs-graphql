import { useMutation } from "urql";

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

    const [updateTaskResult, updateTask] = useMutation(UpdateTask);

    return (<section>
        <h4>{props.title}</h4>
        <ul style={ulStyle}>
            {props.data.tasks.filter((task: any) => task.completed === props.completed).map((task: any) => (
                <li key={task.id} style={{
                    padding: "10px", borderRadius: "1px", border: "1px solid grey", boxShadow: "2px 2px 10px rgba(0,0,0,0.10)"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        <div onClick={() => {
                            const variables = { id: task.id, completed: !task.completed };
                            updateTask(variables).then(result => {
                                console.log(result)
                                // The result is almost identical to `updateTodoResult` with the exception
                                // of `result.fetching` not being set.
                                // It is an OperationResult.
                            });
                        }} style={{ height: "8px", background: props.color, borderRadius: "4px", marginBottom: "4px", cursor: "pointer" }}></div>
                        <div>{task.title}</div>
                    </div>
                </li>
            ))}
        </ul>
    </section>)
}