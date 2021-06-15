/** @jsxImportSource @emotion/react */
import { Input, Form } from "antd";
import { Project, User } from "types";
import UserSelect from "./UserSelect";

interface SearchPanelProps {
  users: User[];
  params: Partial<Pick<Project, "name" | "projectLeadId">>;
  //dynamically updates the type of setParams WRT params
  setParams: (params: SearchPanelProps["params"]) => void;
}

const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  return (
    // @emotion supports inline styles while React doesn't ...
    <Form layout={"inline"} css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
          placeholder={"Project Name"}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOption={"Project Lead"}
          value={params.projectLeadId}
          onChange={(value) =>
            setParams({
              ...params,
              projectLeadId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
