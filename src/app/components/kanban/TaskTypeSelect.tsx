import { useTaskTypes } from "hooks/task-types";
import React from "react";
import IdSelect from "../misc/IdSelect";

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes || []} {...props} />;
};

export default TaskTypeSelect;
