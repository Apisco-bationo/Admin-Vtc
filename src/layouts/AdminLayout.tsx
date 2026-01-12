import { Outlet } from "react-router-dom";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarAdmin />
      <main className="flex-1 flex flex-col min-w-0 lg:pl-0 pl-0">
        <Outlet />
      </main>
    </div>
  );
};
