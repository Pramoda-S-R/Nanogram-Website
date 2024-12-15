import { Routes, Route } from "react-router-dom";
import { AboutUS, Home } from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { AnimatePresence } from "framer-motion";
import { ToastProvider } from "./components/ui/Toast";

const App = () => {
  return (
    <ToastProvider>
      <AnimatePresence>
        <main className="flex h-screen bg-neutral-white">
          <Routes location={location} key={location.pathname}>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
            </Route>
            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </main>
      </AnimatePresence>
    </ToastProvider>
  );
};

export default App;
