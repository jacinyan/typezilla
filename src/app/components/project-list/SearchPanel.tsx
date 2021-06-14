/** @jsxImportSource @emotion/react */
import { Input, Form } from "antd";
import { Project, User } from "types";
import UserSelect from "./UserSelect";

interface SearchPanelProps {
  users: User[];
  paramsObj: Partial<Pick<Project, "name" | "projectLeadId">>;
  //dynamically updates the type of setParamsObj WRT paramsObj
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
        <UserSelect
          defaultOption={"Project Lead"}
          value={paramsObj.projectLeadId}
          onChange={(value) =>
            setParamsObj({
              ...paramsObj,
              projectLeadId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
