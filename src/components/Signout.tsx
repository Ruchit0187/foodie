import { Modal } from "antd";
import { signOut } from "next-auth/react";
import { useState } from "react";

function SignoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    signOut({ redirect: false });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Signout"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to sign out?
      </Modal>
      <button
        className="block bg-black text-white mx-auto p-2.5 rounded-2xl cursor-pointer"
        onClick={showModal}
      >
        Sign out
      </button>
    </>
  );
}

export default SignoutButton;
