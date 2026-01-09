import { Button, Modal } from "antd";
import axios from "axios";
import  { MouseEvent, useState } from "react";
import { MdDelete } from "react-icons/md";

function AdminRecipeDelete({recipeID}:{recipeID:string}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonEvent = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  const showModal = (event: MouseEvent) => {
    handleButtonEvent(event);
    setIsModalOpen(true);
  };

  const handleOk = async (event: MouseEvent) => {
    handleButtonEvent(event);
    await axios.delete("/api/admin/recipes",Object(recipeID));
    setIsModalOpen(false);
  };

  const handleCancel = (event:MouseEvent) => {
    handleButtonEvent(event);
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" danger onClick={showModal}>
       <MdDelete style={{fontSize:"10px"}}/>
      </Button>
      <Modal
        title="Delete Recipe"
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Do you want to Delete
      </Modal>
    </>
  );
}

export default AdminRecipeDelete;
