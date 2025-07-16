"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/(auth)/actions/handleLogout";

export const CloseSession: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-10 bg-red-500 text-red-50 px-6 py-4 rounded text-2xl font-semibold">
        Tu cuenta debe ser verificada por un administrador !
      </p>
      <Button
        type="submit"
        className="text-2xl"
        size="xl"
        onClick={() => logout()}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};

export default CloseSession;
