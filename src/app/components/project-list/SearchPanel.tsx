/** @jsxImportSource @emotion/react */
import { Input, Select, Form } from "antd";
import { SearchPanelProps } from "types";

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
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
