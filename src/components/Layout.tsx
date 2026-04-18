import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";


function Layout() {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
}

export default Layout;