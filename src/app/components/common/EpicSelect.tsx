import { useEpics, useEpicsSearchParams } from "hooks/epics";
import React from "react";
import IdSelect from "./IdSelect";

const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics } = useEpics(useEpicsSearchParams());

  return <IdSelect options={epics || []} {...props} />;
};

export default EpicSelect;