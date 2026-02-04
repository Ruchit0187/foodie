"use client";
import { Modal } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingLoader from "./Loading";

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
  const [loading, setLoading] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (recipeID) {
      setLoading(true);
      try {
        const value = await axios.delete("/api/admin/recipes", {
          data: { recipeID },
        });
        if (value.status === 200) {
          toast.success("Recipe deleted successfully");
          router.back();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error("Recipe not  Deletes");
        }
      } finally {
        setLoading(false);
      }
    }
    if (userID) {
      setLoading(true);
      try {
        const value = await axios.delete("/api/admin/users", {
          data: { userID },
        });
        if (value.status === 200) {
          toast.success("User deleted successfully");
          router.refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.success("User not deleted ");
          router.refresh();
        }
      } finally {
        setLoading(false);
      }
    }
    if (blogID) {
      try {
        const value = await axios.delete("/api/blogs", { data: { blogID } });

        if (value.status === 200) {
          toast.success("Recipe deleted successfully");
          router.back();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error("Blog not  Deleted");
        }
      } finally {
        setLoading(false);
      }
      toast.success("User deleted successfully");
      router.back();
    }
    setIsModalOpen(false);
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
      <button onClick={showModal} className="text-2xl cursor-pointer">
        <MdDelete />
      </button>
      <Modal
        title={`Delete ${recipeID ? "Recipe" : blogID ? "Blog" : "User"}`}
        open={isModalOpen}
        closable={!loading}
        confirmLoading={loading}
        okButtonProps={{ disabled: loading }}
        cancelButtonProps={{ disabled: loading }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Do you want to Delete Data
      </Modal>
    </>
  );
}

export default DeleteData;
