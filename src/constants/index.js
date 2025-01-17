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
  MessageCircleMore,
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
  { to: "/messages", icon: MessageCircleMore, label: "Messages" },
];

export const BOTTOMBAR_ITEMS = [
  { to: "/community", icon: Play, label: "FYP" },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/create-post", icon: SquarePlus, label: "Create Post" },
  { to: "/messages", icon: MessageCircleMore, label: "Messages" },
  { to: "/saved", icon: Album, label: "Saved" },
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
  "/newsletter",
];

export const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/",
  "/about-us",
  "/events",
  "/gallery",
  "*",
];

export const adminId = "676ad11a00039ac69abb";
export const noProfileImage =
  "https://cloud.appwrite.io/v1/storage/buckets/675d64d90024c9563ca3/files/emptyuser/view?project=675d5bfa000fc9c80137&project=675d5bfa000fc9c80137&mode=admin";
