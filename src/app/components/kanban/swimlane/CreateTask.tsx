import { useEffect, useState } from "react";
import { Card, Input } from "antd";
import { useProjectIdInURL } from "hooks/projects";
import { useCreateTask, useTasksQueryKey } from "hooks/tasks";

const CreateTask = ({ swimlaneId }: { swimlaneId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: createTask } = useCreateTask(useTasksQueryKey());
  const projectId = useProjectIdInURL();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await createTask({ projectId, name, swimlaneId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+Create Task</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"What do you need to do?"}
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};

export default CreateTask;
