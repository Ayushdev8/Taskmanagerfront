import { Outlet } from "react-router-dom";
import NavbarCom from "./Navbar";
import FooterCom from "./footer";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <NavbarCom />

        {/* Page Content */}
        <main className="flex-1">
          
          <Outlet />
        </main>

        {/* Footer */}
        <FooterCom />
      </div>
    </>
  );
}
export default Layout