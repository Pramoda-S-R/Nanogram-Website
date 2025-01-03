import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { commentFormSchema } from "../../lib/validation";
import { checkIsLiked } from "../../lib/utils";
import { useCreateComment } from "../../lib/react_query/queriesAndMutations";
import { useToast } from "../ui/Toast";
import CommentList from "./CommentList";
import { comment } from "postcss";

function CommentForm({ post, currentUser, onAddComment }) {
  const toast = useToast();

  const { mutateAsync: createComment, isPending: isCommenting } =
    useCreateComment();

  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const comment = watch("comment");

  // Form Submit Handler
  const onSubmit = async (data) => {
    setValue("comment", "");
    const optimisticComment = {
      $id: Math.random().toString(36),
      content: data.comment,
      commentor: currentUser,
      likes: [],
    };
    onAddComment(optimisticComment);
    const newComment = await createComment({
      postId: post.$id,
      userId: currentUser.$id,
      content: data.comment,
    });
    if (!newComment) {
      toast({
        title: "Upload Failed!",
        description:
          "There was an error in Uploading your post. Please try again.",
      });
    }
  };

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      <Input
        type="text"
        id="comment"
        placeholder="Write a Comment"
        icon={<MessageCircle />}
        className="pr-12"
        {...register("comment")}
      />
      <Button
        variant="link"
        type="submit"
        className="absolute right-0 top-1"
        disabled={!comment?.trim()}
      >
        <SendHorizontal />
      </Button>
    </form>
  );
}

const Comments = ({ post, currentUser }) => {
  const [commentList, setCommentList] = useState(
    post?.comments.sort(
      (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
    ) || []
  );

  const handleAddComment = (newComment) => {
    setCommentList((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = (commentId) => {
    setCommentList((prev) =>
      prev.filter((comment) => comment.$id !== commentId)
    );
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="flex gap-2 items-center">
            <MessageCircle strokeWidth={1.5} />
            <p className="small-medium lg:base-medium">{commentList.length}</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <hr className="w-full" />
          <CommentList
            comments={commentList}
            currentUser={currentUser}
            onDeleteComment={handleDeleteComment}
          />
          <CommentForm
            post={post}
            currentUser={currentUser}
            onAddComment={handleAddComment}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex gap-2 items-center">
          <MessageCircle strokeWidth={1.5} />
          <p className="small-medium lg:base-medium">{commentList.length}</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px]">
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription></DrawerDescription>
        <hr className="w-full" />
        <CommentList
          comments={commentList}
          currentUser={currentUser}
          onDeleteComment={handleDeleteComment}
        />
        <CommentForm
          post={post}
          currentUser={currentUser}
          onAddComment={handleAddComment}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default Comments;
