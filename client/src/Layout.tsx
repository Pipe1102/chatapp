import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";

function Layout() {
  return (
    <main className="relative">
      <div className="flex h-screen">
        <LeftSideBar />
        <section className="flex pt-10 w-full flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default Layout;
