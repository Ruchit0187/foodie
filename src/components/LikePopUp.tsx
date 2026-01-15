import { Modal } from "antd";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

function LikePopUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOk = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>
        <FcLikePlaceholder className="text-2xl cursor-pointer" />
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        footer={null}
        closable={false}
        width={324}
      >
        <div className="w-full flex flex-col text-center justify-center items-center gap-5 py-9">
          <span className="text-xl font-medium">
            Please login to like the recipe
          </span>
          <span className="bg-[#c14242] border-2 text-xl p-3 rounded-2xl ">
            <Link
              href={"/signup"}
              style={{ color: "white", fontWeight: "bold" }}
            >
              login
            </Link>
          </span>
        </div>
      </Modal>
    </>
  );
}

export default LikePopUp;
