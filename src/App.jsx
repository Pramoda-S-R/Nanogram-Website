import { Routes, Route } from "react-router-dom";
import { Home, AboutUs, Events } from "./_default/sites";
import {
  Community,
  Blog,
  Explore,
  Saved,
  AllUsers,
  CreatePost,
  LikedPost,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
  NewsLetter,
} from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import DefaultLayout from "./_default/DefaultLayout";
import RootLayout from "./_root/RootLayout";
import { AnimatePresence } from "framer-motion";
import { ToastProvider } from "./components/ui/Toast";
import React, { Suspense } from "react";

const App = () => {
  return (
    <ToastProvider>
      <AnimatePresence>
        <main className="flex bg-neutral-white overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              {/* public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
              </Route>
              {/* default routes */}
              <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/events" element={<Events />} />
              </Route>
              {/* private routes */}
              <Route element={<RootLayout />}>
                <Route path="/community" element={<Community />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/newsletter" element={<NewsLetter />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/liked-post" element={<LikedPost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpdateProfile />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
      </AnimatePresence>
    </ToastProvider>
  );
};

export default App;
