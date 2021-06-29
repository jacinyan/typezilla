import { Link } from "react-router-dom";
import { List, Button, Modal } from "antd";
import dayjs from "dayjs";
import FlexRow from "app/components/common/FlexRow";
import {
  useDeleteEpic,
  useEpics,
  useEpicsQueryKey,
  useEpicsSearchParams,
} from "hooks/epics";
import { useProjectInURL } from "hooks/projects";
import { Container } from "./index.styles";
import { useTasks } from "hooks/tasks";
import { Epic } from "types";
import { CreateEpic } from "app/components/epic/CreateEpic";
import { useState } from "react";

const EpicScreen = () => {
  const { data: currProject } = useProjectInURL();
  const { data: epics } = useEpics(useEpicsSearchParams());

  const { data: tasks } = useTasks({ projectId: currProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());

  //locally managed open/close of CreateEpic
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `Confirm Deleting：${epic.name}`,
      content: "Click to confirm",
      okText: "Confirm",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <Container>
      <FlexRow spaceBetween>
        <h1>{currProject?.name} Epics</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>Create Epic</Button>
      </FlexRow>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <FlexRow spaceBetween>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    Delete
                  </Button>
                </FlexRow>
              }
              description={
                <div>
                  <div>
                    Starting Time: {dayjs(epic.start).format("DD-MM-YYYY")}
                  </div>
                  <div>Finish Time: {dayjs(epic.end).format("DD-MM-YYYY")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    <div>{task.name}</div>
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </Container>
  );
};

export default EpicScreen;
