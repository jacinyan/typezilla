import { Button, Drawer } from "antd";

const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      width={"100%"}
      onClose={props.onClose}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>Cancel</Button>
    </Drawer>
  );
};

export default ProjectModal;
