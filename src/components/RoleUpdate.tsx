"use client";
import axios from "axios";
import { userData } from "../types";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Modal } from "antd";
import { useState } from "react";

const handleRoleButton = async (
  id: string,
  isAdmin: boolean,
  router: AppRouterInstance,
) => {
  try {
    const value = await axios.patch(`/api/admin/users`, { id, isAdmin });
    if (value.status === 200) {
      router.refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

function RoleUpdate({ userData }: { userData: userData }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (
    id: string,
    isAdmin: boolean,
    router: AppRouterInstance,
  ) => {
    await handleRoleButton(id, isAdmin, router);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={`${userData.isAdmin ? "Remove Admin" : "Make Admin"}`}
        open={isModalOpen}
        onOk={() => handleOk(userData._id, userData.isAdmin, router)}
        onCancel={handleCancel}
        closable={false}
      ></Modal>
      <button
        className="bg-black  text-white p-1 rounded-2xl cursor-pointer"
        onClick={showModal}
      >
        {`${userData.isAdmin ? "Remove Admin" : "Make Admin"}`}
      </button>
    </>
  );
}

export default RoleUpdate;
