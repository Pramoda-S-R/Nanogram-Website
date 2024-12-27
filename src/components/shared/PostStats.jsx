import React, { useEffect, useState } from "react";
import {
  useGetCurrentUser,
  useLikePosts,
  useSavePosts,
  useUnSavePosts,
} from "../../lib/react_query/queriesAndMutations";
import { checkIsLiked } from "../../lib/utils";
import SpinLoader from "./SpinLoader";

const PostStats = ({ post, userId }) => {
  if (!post) return null;

  const likesList = post.likes.map((user) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePosts();
  const { mutate: savePost, isPending: isSavingPost } = useSavePosts();
  const { mutate: unSavePost, isPending: isUnSavingPost } = useUnSavePosts();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((id) => id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray: likesArray });
  };

  const handleSavePost = (e) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      unSavePost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex-between z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isSavingPost || isUnSavingPost ? (
          <SpinLoader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
