"use client";

import { Button } from "@/components/ui/button";
import { logOutUser } from "@/services/logOutUser";

const LogOutButton = () => {
  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <div>
      <Button variant={"destructive"} onClick={handleLogOut}>
        LogOut
      </Button>
    </div>
  );
};

export default LogOutButton;
