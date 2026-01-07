"use client";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";


function Profile() {
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <>
      <button onClick={()=>setOpen(true)}>
        <FaUser />
      </button>
       <Modal
        onCancel={()=>setOpen(false)}
        open={open}
        footer={null}
        mask={false}
        closable={false}
        style={{position:"absolute",right:"0",padding:"0"}}
        width={180}   
      >
      </Modal>
    </>
  );
}

export default Profile;
