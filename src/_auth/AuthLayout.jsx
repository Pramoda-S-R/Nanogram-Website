import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const AuthLayout = () => {
  const isAuthenticated = false;

  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="absolute h-screen w-1/2 left-[-24%] overflow-hidden">
            <Player
              autoplay
              loop
              src="https://lottie.host/8160f306-be03-4268-b093-3549bc73dcea/vqAfkRJUo8.json"
              style={{ height: "100vh", width: "50vw" }}
            >
              <Controls visible={false} />
            </Player>
          </div>
          <Button
            variant="link"
            className="absolute h-12 m-10 items-center"
            onClick={() => navigate("/")}
          >
            <ArrowLeft /> Home
          </Button>
          <section className="flex flex-1 justify-center items-center flex-col py-10 w-1/2 h-screen">
            <Outlet />
          </section>
          <div className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat">
            <Player
              autoplay
              loop
              src="https://lottie.host/3dbcb94a-b753-4f43-a28c-b7c39b968833/LuwT4MaJgv.json"
              style={{ height: "100vh", width: "50vw" }}
            >
              <Controls visible={false} />
            </Player>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
