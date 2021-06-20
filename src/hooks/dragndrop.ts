import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  useReorderSwimlane,
  useSwimlanes,
  useSwimlanesQueryKey,
  useSwimlanesSearchParams,
} from "./kanban";
import {
  useReorderTask,
  useTasks,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./tasks";

export const useDragEnd = () => {
  const { data: swimlanes } = useSwimlanes(useSwimlanesSearchParams());
  const { mutate: reorderSwimlane } = useReorderSwimlane(
    useSwimlanesQueryKey()
  );
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  const { data: allTasks = [] } = useTasks(useTasksSearchParams());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }

      if (type === "COLUMN") {
        const fromId = swimlanes?.[source.index].id;
        const toId = swimlanes?.[destination.index].id;

        if (!fromId || !toId || fromId === toId) {
          return;
        }

        const type = destination.index > source.index ? "after" : "before";
        reorderSwimlane({ fromId, referenceId: toId, type });
      }

      if (type === "ROW") {
        const fromSwimlaneId = +source.droppableId;
        const toSwimlaneId = +destination.droppableId;

        const fromTask = allTasks.filter(
          (task) => task.swimlaneId === fromSwimlaneId
        )[source.index];
        const toTask = allTasks.filter(
          (task) => task.swimlaneId === toSwimlaneId
        )[destination.index];

        if (fromTask?.id === toTask?.id) {
          return;
        }

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromSwimlaneId,
          toSwimlaneId,
          type:
            fromSwimlaneId === toSwimlaneId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [swimlanes, reorderSwimlane, reorderTask, allTasks]
  );
};
