import React from "react";
import { useTaskTypes } from "hooks/task-types";
import IdSelect from "../common/IdSelect";

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();

  return <IdSelect options={taskTypes || []} {...props} />;
};

export default TaskTypeSelect;
