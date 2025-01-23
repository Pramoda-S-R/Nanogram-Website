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

export function formatDate(isoString, format) {
  try {
    const date = new Date(isoString);

    if (isNaN(date)) {
      throw new Error("Invalid ISO string provided.");
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    switch (format) {
      case "DDMMYYYY":
        return `${day}${month}${year}`;
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "YYYYMMDD":
          return `${year}${month}${day}`;
      case "DD/MM/YYYY HH:mm:ss":
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      case "YYYY-MM-DD HH:mm":
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      case "HH:mm:ss":
        return `${hours}:${minutes}:${seconds}`;
      case "HH:mm":
        return `${hours}:${minutes}`;
      case "MMMM DD, YYYY": // Example: January 01, 2024
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[date.getMonth()]} ${day}, ${year}`;
      // Add more cases as needed
      default:
        return "Invalid format specified.";
    }
  } catch (error) {
    return error.message; // Return the error message
  }
}