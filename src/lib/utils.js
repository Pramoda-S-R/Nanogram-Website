export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};

export function userAge(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const defaultText = "You have been a indispensable part of Nanogram since";

  if (diffInSeconds < 60) {
    return `${defaultText} just now`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${defaultText} ${minutes} min${minutes > 1 ? "s" : ""}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${defaultText} ${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${defaultText} ${days} day${days > 1 ? "s" : ""}`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${defaultText} ${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${defaultText} ${years} year${years > 1 ? "s" : ""}`;
  }
}

export function getUserKarma(user) {
  let karma = 0;
  let postlikes = 0;
  let commentlikes = 0;
  let post = 0;
  let comment = 0;
  let follower = 0;
  let following = 0;

  if (user) {
    post = user.posts.length;
    comment = user.comments.length;
    follower = user.followers.length;
    following = user.following.length;
    for (const post of user.posts) {
      postlikes += post.likes.length;
    }
    for (const comment of user.comments) {
      commentlikes += comment.likes.length;
    }
  }

  karma =
    postlikes * 5 +
    commentlikes * 2 +
    post * 3 +
    comment +
    follower * 10 +
    following * 10;

  return karma;
}

export function formatReadableTime(isoTimestamp) {
  const date = new Date(isoTimestamp);

  // Options for formatting the date and time
  const options = {
    weekday: "long", // e.g., "Monday"
    year: "numeric", // e.g., "2025"
    month: "long", // e.g., "January"
    day: "numeric", // e.g., "6"
    hour: "numeric", // e.g., "5 PM"
    minute: "2-digit", // e.g., "22"
    second: "2-digit", // e.g., "45"
    timeZoneName: "short", // e.g., "GMT"
  };


  return date.toLocaleString("en-US", options);
}
