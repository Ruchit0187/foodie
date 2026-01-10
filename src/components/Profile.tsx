"use client";
import { signOut } from "next-auth/react";
import { Modal } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

function Profile({ sessionValue }: any) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <FaUser />
      </button>
      <Modal
        onCancel={() => setOpen(false)}
        open={open}
        footer={null}
        mask={false}
        closable={false}
        style={{
          position: "absolute",
          right: "0",
          padding: "0",
          top: "60px",
          marginRight: "20px",
        }}
        width={250}
      >
        <div className="flex flex-col items-center justify-between gap-3">
          <span className="text-2xl">
            <FaRegUserCircle />
          </span>
          <div className="flex flex-col">
            <span>{sessionValue.user.email}</span>
          </div>
          <button
            className="block bg-black text-white mx-auto p-2.5 rounded-2xl"
            onClick={() => signOut({redirectTo:"/"})}
          >
            Sign out
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
