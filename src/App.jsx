import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home, AboutUs, Events, Gallery } from "./_default/sites";
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
import { Admin } from "./_admin/controls";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import NotFound from "./components/shared/NotFound";
import AuthLayout from "./_auth/AuthLayout";
import DefaultLayout from "./_default/DefaultLayout";
import RootLayout from "./_root/RootLayout";
import AdminLayout from "./_admin/AdminLayout";
import { ToastProvider } from "./components/ui/Toast";

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
                <Route path="/gallery" element={<Gallery />} />
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
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>
              {/* admin route */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </AnimatePresence>
    </ToastProvider>
  );
};

export default App;
