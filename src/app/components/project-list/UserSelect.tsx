import { useUsers } from "hooks/users";
import React from "react";
import IdSelect from "../common/IdSelect";

const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();

  return <IdSelect options={users || []} {...props} />;
};

export default UserSelect;
