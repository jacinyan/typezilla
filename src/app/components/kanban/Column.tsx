import { useTasks, useTasksSearchParams } from "hooks/tasks";
import { Kanban } from "types";

const Column = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <div>
      <h3>{kanban.name}</h3>
      <div>
        {tasks?.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Column;
