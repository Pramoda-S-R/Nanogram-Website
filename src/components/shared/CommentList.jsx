import React, { useState } from "react";
import { checkIsLiked } from "../../lib/utils";
import Button from "../ui/Button";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { useDeleteComment, useLikeComment } from "../../lib/react_query/queriesAndMutations";
import { useToast } from "../ui/Toast";

const CommentList = ({ comments, currentUser, onDeleteComment, postDetail=false, showLikes=true }) => {
  return (
    <ul className={`flex w-full flex-col gap-2 ${postDetail ? "min-h-0" :"h-[65vh]"} overflow-y-auto p-2 custom-scrollbar`}>
      {comments?.map((comment) => {
        return (
          <Comment
            key={comment?.$id}
            comment={comment}
            currentUser={currentUser}
            onDeleteComment={onDeleteComment}
            showLikes={showLikes}
          />
        );
      })}
    </ul>
  );
};

function Comment({ comment, currentUser, onDeleteComment, showLikes }) {
  const likesList = comment.likes.map((user) => user.$id);
  const [likes, setLikes] = useState(likesList);

  const toast = useToast();

  const { mutateAsync: likeComment } = useLikeComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleLikeComment = (e) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(currentUser?.$id)) {
      likesArray = likesArray.filter((id) => id !== currentUser?.$id);
    } else {
      likesArray.push(currentUser?.$id);
    }

    setLikes(likesArray);
    likeComment({ commentId: comment?.$id, likesArray: likesArray });
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.$id);
    } catch (error) {
      toast({
        title: "Delete Failed!",
        description:
          "There was an error in deleting your comment. Please try again.",
      });
    }
    onDeleteComment(comment.$id);
  };

  return (
    <li key={comment.$id} className="flex flex-col w-full gap-2">
      <div className="w-full flex">
        <div className="flex w-full gap-2">
          <img
            src={comment.commentor.imageUrl || "/assets/icons/user.svg"}
            alt={comment.commentor.name || "commentor"}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{comment.commentor.name}</p>
            <p className="flex text-xs">{comment.content}</p>
          </div>
        </div>
        {currentUser?.$id === comment.commentor.$id ? (
          <div className="flex mx-2 items-center">
            <AlertDialog>
              <AlertDialogTrigger className="w-fit size-4">
                <TrashIcon size={16} className="text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to
                    delete this comment?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteComment}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
        { showLikes && <div className="flex gap-2 mr-3 items-center">
          <img
            src={
              checkIsLiked(likes, currentUser?.$id)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }
            alt="like"
            width={16}
            height={16}
            onClick={handleLikeComment}
            className="cursor-pointer ml-2"
          />
          <p className="small-medium">{likes.length}</p>
        </div>}
      </div>
    </li>
  );
}

export default CommentList;
