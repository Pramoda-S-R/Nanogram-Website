import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "../../context/AuthContext";

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-0">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-fit object-cover"
              loading="lazy"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="size-8 rounded-full bg-neutral-white p-0.5"
                  loading="lazy"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
