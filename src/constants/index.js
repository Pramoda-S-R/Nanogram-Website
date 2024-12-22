import {
  House,
  Info,
  Calendar,
  Users,
  FileText,
  Compass,
  Album,
  SquarePlus,
  Play,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", icon: House, label: "Home" },
  { to: "/about-us", icon: Info, label: "About Us" },
  { to: "/events", icon: Calendar, label: "Events" },
  { to: "/community", icon: Users, label: "Community" },
  { to: "/blog", icon: FileText, label: "Blog" },
];

export const SIDEBAR_ITEMS = [
  { to: "/community", icon: Play, label: "FYP" },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/all-users", icon: Users, label: "People" },
  { to: "/saved", icon: Album, label: "Saved" },
  { to: "/create-post", icon: SquarePlus, label: "Create Post" },
];

export const communityPaths = [
  "/community",
  "/explore",
  "/all-users",
  "/saved",
  "/create-post",
  "/liked-post",
  "/update-post",
  "/posts",
  "/profile",
  "/update-profile",
];

export const privateRoutes = [
  "/community",
  "/blog",
  "/explore",
  "/all-users",
  "/saved",
  "/create-post",
  "/liked-post",
  "/update-post",
  "/posts",
  "/profile",
  "/update-profile",
];
