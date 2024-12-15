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
          <Button
            variant="link"
            className="absolute h-12 m-10 items-center"
            onClick={() => navigate("/")}
          >
            <ArrowLeft /> Home
          </Button>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <div className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat">
            <Player
              autoplay
              loop
              src="https://lottie.host/d2c3220d-7f05-481e-9f23-4d22f67fad20/z19J5GYRIf.json"
              style={{ height: "100vh", width: "50vw" }}
            >
              <Controls
                visible={false}
              />
            </Player>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
