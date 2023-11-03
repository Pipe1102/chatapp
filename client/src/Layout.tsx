import LeftSideBar from "./components/LeftSideBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div style={{ display: "flex" }}>
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full">{children}</div>
        </section>
      </div>
    </div>
  );
}

export default Layout;
