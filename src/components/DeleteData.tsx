"use client";
import { Modal } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

function DeleteData({
  recipeID,
  userID,
  blogID,
}: {
  recipeID?: string;
  userID?: string;
  blogID?: string;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (recipeID) {
      await axios.delete("/api/admin/recipes", { data: { recipeID } });
      router.back();
    }
    if (userID) {
      await axios.delete("/api/admin/users", { data: { userID } });
    }
    if (blogID) {
      await axios.delete("/api/blogs", { data: { blogID } });
      router.back();
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal} className="text-2xl cursor-pointer">
        <MdDelete />
      </button>
      <Modal
        title={`Delete ${recipeID ? "Recipe" : blogID ? "Blog" : "User"}`}
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Do you want to Delete Data
      </Modal>
    </>
  );
}

export default DeleteData;
