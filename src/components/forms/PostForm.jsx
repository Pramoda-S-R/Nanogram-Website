import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash } from "lucide-react";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useToast } from "../ui/Toast";
import FileUploader from "../shared/FileUploader";
import { postFormSchema } from "../../lib/validation";
import {
  useCreatePost,
  useUpdatePost,
} from "../../lib/react_query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post, action }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      tags: post ? post?.tags : "",
      image: [],
    },
  });

  // Form Submission
  const onSubmit = async (data) => {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...data,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: "Update Failed!",
          description:
            "There was an error in updating your post. Please try again.",
        });
      }
      toast({
        title: "Update Successful!",
        description: "Your post has been updated successfully. 🎉",
      });
      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...data,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Upload Failed!",
        description:
          "There was an error in Uploading your post. Please try again.",
      });
    } else {
      toast({
        title: "Upload Successful!",
        description: "Your post has been uploaded successfully. 🎉",
      });
      navigate("/community");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-5xl px-3"
      >
        {/* Caption Field */}
        <div className="px-3">
          <label className="block text-neutral-black font-semibold">
            Caption
          </label>
          <TextArea
            placeholder="Write a caption..."
            rows={4}
            className="mt-2 custom-scrollbar"
            {...register("caption")}
          />
          {errors.caption && (
            <p className="text-red-500 text-sm mt-1">
              {errors.caption.message}
            </p>
          )}
        </div>

        {/* Add Photos */}
        <div className="px-3">
          <label className="block text-neutral-black font-semibold">
            Add Photo
          </label>
          <FileUploader
            onFileChange={(file) => setValue("image", file)}
            mediaUrl={post?.imageUrl}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Add Tags */}
        <div className="px-3 ">
          <label className="block text-neutral-black font-semibold">
            Add Tags
          </label>
          <Input
            type="text"
            id="tags"
            placeholder="VLSI, Semiconductors, Analog Circuits, ..."
            icon={<Hash />}
            {...register("tags")}
          />
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex gap-4 items-center justify-end mb-14 md:mb-0">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || (isLoadingUpdate && "Validating...  ")} {action}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
