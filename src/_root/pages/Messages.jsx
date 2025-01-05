import React from "react";
import { Outlet} from "react-router-dom";
import Contacts from "../../components/shared/Contacts";

const Messages = () => {

  return (
    <div className="default-container flex flex-row md:pb-0 pb-[3.75rem]">
      <Contacts className={"md:flex hidden "} />
      <div className="sm:flex hidden border-l border-neutral-black/10 h-full" />
      <Outlet />
    </div>
  );
};

export default Messages;
