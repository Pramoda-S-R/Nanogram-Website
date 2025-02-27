import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="default-container flex justify-center">
      <div className="flex flex-col gap-5 py-10 w-fit">
        <Button onClick={() => navigate("/admin/newsletter")}>
          Newsletters Controls
        </Button>
        <Button onClick={() => navigate("/admin/about-us")}>
          About Us Controls
        </Button>
        <Button onClick={() => navigate("/admin/events")}>
          Events Controls
        </Button>
      </div>
    </div>
  );
};

export default Admin;
