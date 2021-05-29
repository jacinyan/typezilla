/** @jsxImportSource @emotion/react */
import { Input, Select, Form } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  team: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  paramsObj: {
    name: string;
    teamLeadId: string;
  };
  //dynamically updates setParamsObj type WRT paramsObj
  setParamsObj: (paramsObj: SearchPanelProps["paramsObj"]) => void;
}
const SearchPanel = ({ paramsObj, setParamsObj, users }: SearchPanelProps) => {
  return (
    <Form layout={"inline"} css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={paramsObj.name}
          onChange={(e) =>
            setParamsObj({
              ...paramsObj,
              name: e.target.value,
            })
          }
          placeholder={"Project Name"}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={paramsObj.teamLeadId}
          onChange={(value) =>
            setParamsObj({
              ...paramsObj,
              teamLeadId: value,
            })
          }
        >
          <Select.Option value="">Select Team Lead</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
