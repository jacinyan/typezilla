import { Card } from "antd";
import TaskType from "../TaskType";
import Highlighting from "./Highlighting";
import { useTaskModal, useTasksSearchParams } from "hooks/tasks";
import { Task } from "types";

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();

  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Highlighting keyword={keyword} name={task.name} />
      </p>
      <TaskType id={task.typeId} />
    </Card>
  );
};

export default TaskCard;
