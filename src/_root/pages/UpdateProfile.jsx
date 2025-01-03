import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, Mail, Type } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/AlertDialog";
import Button from "../../components/ui/Button";
import TextArea from "../../components/ui/TextArea";
import { useToast } from "../../components/ui/Toast";
import Input from "../../components/ui/Input";
import FileUploader from "../../components/shared/FileUploader";
import SpinLoader from "../../components/shared/SpinLoader";
import {
  useGetCurrentUser,
  useGetUserTopPosts,
  useUpdateUser,
} from "../../lib/react_query/queriesAndMutations";
import { userProfileFormSchema } from "../../lib/validation";
import { noProfileImage } from "../../constants";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { data: currentUser } = useGetCurrentUser();
  const {
    data: posts,
    isLoading: isTopPostsLoading,
    isError: isTopPostsError,
  } = useGetUserTopPosts(currentUser?.$id);
  const { mutateAsync: updateProfile, isPending: isUpdatingUser } =
    useUpdateUser();

  const [isRemoveAlertOpen, setRemoveAlertOpen] = useState(false);
  const [updatedAvatar, setUpdatedAvatar] = useState();
  const [removeAvatar, setRemoveAvatar] = useState();
  const [updatedAvatarUrl, setUpdatedAvatarUrl] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      avatar: [],
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      bio: currentUser?.bio || "",
    },
  });

  const handleAvatarChange = (file) => {
    setUpdatedAvatarUrl(URL.createObjectURL(file));
    setValue("avatar", file);
  };

  const handleRemoveAvatar = () => {
    setUpdatedAvatarUrl(noProfileImage);
    setRemoveAvatar(noProfileImage);
    setRemoveAlertOpen(false);
  };

  async function onSubmit(data) {
    setIsSubmitting(true);
    const updatedUser = await updateProfile({
      ...data,
      userId: currentUser.$id,
      imageUrl: removeAvatar || currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      return toast({
        title: "Update Failed!",
        description:
          "There was an error in updating your profile. Please try again.",
      });
    }

    navigate(-1);
  }

  return (
    <div className="update_profile-container flex">
      <div className="flex flex-col gap-3 justify-start w-full pt-6 px-6 overflow-y-scroll custom-scrollbar">
        <div className="flex-start gap-3 justify-start w-full">
          <FilePenLine size={36} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>
        <div className="flex items-center gap-3 px-6">
          <img
            src={updatedAvatarUrl || currentUser?.imageUrl}
            alt={currentUser?.username || "user"}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <Dialog>
              <DialogTrigger>
                <div className="text-sm font-semibold py-2 px-4 rounded-md border-2 border-neutral-black text-neutral-black bg-neutral-white hover:bg-neutral-white/70">
                  Change Profile Picture
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile Picture</DialogTitle>
                  <DialogDescription>
                    Change your profile picture by uploading a new one.
                  </DialogDescription>
                  <FileUploader
                    onFileChange={(file) => setUpdatedAvatar(file)}
                    mediaUrl={updatedAvatarUrl || currentUser?.imageUrl}
                  />
                </DialogHeader>
                <div className="w-full flex justify-end gap-4 mt-4">
                  <DialogClose
                    className="bg-primary text-neutral-white hover:bg-primary/85 py-2 px-4 rounded-md font-semibold text-sm"
                    onClick={() => handleAvatarChange(updatedAvatar)}
                  >
                    Save Changes
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="py-2 px-4 rounded-md font-semibold text-sm bg-red-600 text-white hover:bg-red-700">Remove Profile Picture</div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your profile picture.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRemoveAvatar()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full px-3"
        >
          {/* Add Name */}
          <div className="px-3 ">
            <label className="block text-neutral-black font-semibold">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              icon={<Type />}
              {...register("name")}
            />
          </div>

          {/* Add Email */}
          <div className="px-3 ">
            <label className="block text-neutral-black font-semibold">
              Email
            </label>
            <Input
              type="text"
              id="email"
              placeholder="johndoe@email.com"
              icon={<Mail />}
              {...register("email")}
            />
          </div>

          {/* Bio Field */}
          <div className="px-3">
            <label className="block text-neutral-black font-semibold">
              Bio
            </label>
            <TextArea
              placeholder="Write a bio..."
              rows={4}
              className="mt-2 custom-scrollbar"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex gap-4 items-center justify-end mb-14 md:mb-0">
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <SpinLoader /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
      {/* Right Sidebar */}
      <div className="md:w-1/3 hidden lg:flex flex-col gap-3 items-center overflow-y-scroll custom-scrollbar">
        <div className="flex flex-col items-center pt-6">
          <img
            src={currentUser?.imageUrl}
            alt={currentUser?.username || "user"}
            className="w-16 h-16 rounded-full"
          />
          <p className="text-lg font-semibold">{currentUser?.name}</p>
          <p className="font-light text-sm text-neutral-black">
            @{currentUser?.username}
          </p>
        </div>
        <h3 className="text-lg px-6 font-bold">Top Posts by you</h3>
        {!currentUser || isTopPostsLoading || isTopPostsError ? (
          <SpinLoader />
        ) : posts?.documents.length === 0 ? (
          <p className="text-light-4">No available posts</p>
        ) : (
          <ul className="w-full flex flex-col justify-center gap-3 mb-14 px-6">
            {posts?.documents.map((post) => (
              <li key={post.$id} className="relative min-w-0">
                <Link to={`/posts/${post.$id}`} className="grid-post_link">
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="h-full w-fit object-cover"
                    loading="lazy"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <AlertDialog
        isOpen={isRemoveAlertOpen}
        onClose={() => setRemoveAlertOpen(false)}
        title="Are you sure?"
        description="This process will remove your profile picture."
        confirmButtonTitle="Yes, Remove"
        onConfirm={() => handleRemoveAvatar()}
        cancelButtonTitle="No, Abort"
        onCancel={() => setRemoveAlertOpen(false)}
      /> */}
    </div>
  );
};

export default UpdateProfile;
