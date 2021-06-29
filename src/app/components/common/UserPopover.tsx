import { Popover, Typography, List, Divider } from "antd";
import { useUsers } from "hooks/users";

const UserPopover = () => {
  const { data: users, refetch } = useUsers();

  const content = (
    <div style={{ minWidth: "30rem" }}>
      <Typography.Text type={"secondary"}>Users</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Popover
      placement={"bottom"}
      content={content}
      onVisibleChange={() => refetch()}
      arrowPointAtCenter
    >
      <span style={{ fontSize: "1.8rem", color: "#fff" }}>Users</span>
    </Popover>
  );
};

export default UserPopover;
