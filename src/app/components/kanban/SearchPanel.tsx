import { Input } from "antd";
import { useTasksSearchParams } from "hooks/tasks";
import { useSetSearchParams } from "hooks/_helpers";
import { Button, Row } from "../misc/General";
import UserSelect from "../project-list/UserSelect";
import TaskTypeSelect from "./TaskTypeSelect";

const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetSearchParams();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      assigneeId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap>
      <Input
        style={{ width: "20rem" }}
        placeholder={"Task Name"}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOption={"Assignee"}
        value={searchParams.assigneeId}
        onChange={(value) => setSearchParams({ assigneeId: value })}
      />
      <TaskTypeSelect
        defaultOption={"Type"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>Clear Filter</Button>
    </Row>
  );
};

export default SearchPanel;
