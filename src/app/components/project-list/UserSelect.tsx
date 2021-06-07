import React from "react";
import { useUsers } from "hooks";
import IdSelect from "../misc/IdSelect";

const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();

  return <IdSelect options={users || []} {...props} />;
};

export default UserSelect;
