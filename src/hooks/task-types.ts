import { useQuery } from "react-query";
import { useConfigureFetch } from "./api";
import { TaskType } from "types";

export const useTaskTypes = () => {
  const $fetch = useConfigureFetch();

  return useQuery<TaskType[]>(["taskTypes"], () => $fetch("taskTypes"));
};
