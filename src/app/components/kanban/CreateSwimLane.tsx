import { useState } from "react";
import { Input } from "antd";
import { LanesWrapper } from "app/screens/kanban/index.styles";
import { useCreateSwimlane, useSwimlaneQueryKey } from "hooks/kanban";
import { useProjectIdInURL } from "hooks/projects";

export const CreateSwimLane = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInURL();
  const { mutateAsync: createSwimlane } = useCreateSwimlane(
    useSwimlaneQueryKey()
  );

  const submit = async () => {
    await createSwimlane({ name, projectId });
    setName("");
  };

  return (
    <LanesWrapper>
      <Input
        size={"large"}
        placeholder={"Create New Lane"}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </LanesWrapper>
  );
};
