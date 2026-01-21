"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { Session } from "next-auth";
import fetchUserData from "../function/fetchUserData";
import { userData } from "../types";
import SignoutButton from "./Signout";

function Profile({ sessionValue }: { sessionValue: Session | undefined }) {
  const [open, setOpen] = useState<boolean>(false);
  const [userNewData, setUserNewData] = useState<userData>();
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData(sessionValue!);
      setUserNewData(userData);
    };
    fetchData();
  }, [open]);
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
            <span className="text-center">{userNewData?.name}</span>
            <span>{userNewData?.email}</span>
          </div>
         <SignoutButton/>
          <Link href={"/profile"}>Change Details</Link>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
