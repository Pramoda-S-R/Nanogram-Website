import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="default-container">
      <Button onClick={() => navigate("/admin/newsletter")}>
        Newsletters Controls
      </Button>
    </div>
  );
};

export default Admin;
