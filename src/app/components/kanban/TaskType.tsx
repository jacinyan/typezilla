import { useTaskTypes } from "hooks/task-types";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";

const TaskType = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  return name ? (
    <img src={name === "task" ? taskIcon : bugIcon} alt="" />
  ) : null;
};

export default TaskType;
