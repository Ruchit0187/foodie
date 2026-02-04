"use client";
import axios from "axios";
import { userData } from "../types";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Modal } from "antd";
import { useState } from "react";
import LoadingLoader from "./Loading";
import { toast } from "react-toastify";

const handleRoleButton = async (
  id: string,
  isAdmin: boolean,
  router: AppRouterInstance,
) => {
  try {
    const value = await axios.patch(`/api/admin/users`, { id, isAdmin });
    if (value.status === 200) {
      router.refresh();
      toast.success("role update successfully");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      toast.error(error.response?.data.error || error.message);
      router.refresh();
    }
  }
};

function RoleUpdate({ userData }: { userData: userData }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (
    id: string,
    isAdmin: boolean,
    router: AppRouterInstance,
  ) => {
    try {
      setLoading(true);
      await handleRoleButton(id, isAdmin, router);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading && (
        <div>
          <LoadingLoader cssClass="fixed inset-0 bg-black/30 z-9 h- flex items-center justify-center" />
        </div>
      )}
      <Modal
        title={`${userData.isAdmin ? "Remove" : "Make"} Admin `}
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
