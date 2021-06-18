import { useState } from "react";
import { Input } from "antd";
import { Container } from "app/components/kanban/swimlane/Swimlane";
import { useCreateSwimlane, useSwimlanesQueryKey } from "hooks/kanban";
import { useProjectIdInURL } from "hooks/projects";

export const CreateSwimLane = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInURL();
  const { mutateAsync: createSwimlane } = useCreateSwimlane(
    useSwimlanesQueryKey()
  );

  const submit = async () => {
    await createSwimlane({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"Create New Lane"}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
};
