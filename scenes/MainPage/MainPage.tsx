import { useContext} from "react";
import TopBar from "@scenes/Global/TopBar";
import SideNav from "@scenes/Global/SideNav";
import AppRouter from "@routers/AppRouter";
import LoginRouter from "@routers/LoginRouter";
import LoginContext from "@context/LoginContext";


const MainPage = () => {
  const { context } = useContext(LoginContext);

  return !context.isLoggedIn ? (
    <LoginRouter />
  ) : (
    <div className="app">
      <SideNav />
      <main className="content">
        <TopBar />
        <AppRouter />
      </main>
      <div id="portal-root"></div>
    </div>
  );
};

export default MainPage;
