import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, database, storage } from "./config";

// ==================
// Auth Functions
// ==================

// Check if username is available
export async function checkUsernameAvailability(username) {
  try {
    const sanitizedUsername = username.trim();

    const userDocuments = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("username", sanitizedUsername)]
    );

    return userDocuments.total === 0;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
}
// Create a new user account
export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// Save user to database
export async function saveUserToDB(user) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
// Sign in to user account
export async function signInAccount(user) {
  try {
    let email = user.email;

    if (user.username) {
      const userDocuments = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("username", user.username)]
      );

      if (!userDocuments || userDocuments.total === 0) {
        throw new Error("Username not found");
      }

      email = userDocuments.documents[0].email;
    }

    const session = await account.createEmailPasswordSession(
      email,
      user.password
    );
    console.log("Session created:", session);

    return session;
  } catch (error) {
    console.log("Error signing in:", error);
  }
}
// Get account details
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("Account not found");

    return currentAccount;
  } catch (error) {
    if (error?.message === "User (role: guests) missing scope (account)") {
      console.log("No user session found. Proceeding as unauthenticated.");
      return null;
    }
  }
}
// Get current user details
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No account found");

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length)
      throw new Error("User not found in database");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw Error;
  }
}
// Sign out of account
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ==================
// Post Functions
// ==================

// Create a new post
export async function createPost(post) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.image);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post in database
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
// Upload file to storage
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}
// Get File Preview
export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}
// Delete File
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
// Update post
export async function updatePost(post) {
  const hasFileTOUpdate = post.image > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileTOUpdate) {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.image);
      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Update post to database
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        tags: tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
// Delete post
export async function deletePost(postId, imageId) {
  if (!postId || !imageId) throw new Error("Missing postId or imageId");
  try {
    // Delete the post from the database
    await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    // Delete the image associated with the post
    await deleteFile(imageId);

    return { status: "ok" };
  } catch (error) {
    console.error("Error deleting post or related saves:", error);
  }
}
// Get recent posts
export async function getRecentPosts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts || posts.total === 0) {
      throw new Error("No posts found.");
    }

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
// Like a post
export async function likePost(postId, likesArray) {
  try {
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
// Save a post
export async function savePost(postId, userId) {
  try {
    const updatedPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
// Unsave a post
export async function unSavePost(savedRecordId) {
  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
// Get post by ID
export async function getPostById(postId) {
  try {
    const post = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}
// Get Infinite Posts
export async function getInfinitePosts(pageParam) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(10)];

  if (pageParam && typeof pageParam === "string") {
    queries.push(Query.cursorAfter(pageParam));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw new Error("Failed to fetch posts");

    return posts;
  } catch (error) {
    console.error("Error in getInfinitePosts:", error);
  }
}
// Search posts
export async function searchPosts(searchTerm) {
  try {
    // Determine the query field based on input
    const queries = [];
    if (searchTerm.startsWith("#")) {
      // Search in 'tags' field
      const tagTerm = searchTerm.slice(1); // Remove '#' from the search term
      queries.push(Query.search("tags", tagTerm));
    } else {
      // Search in 'caption' field
      queries.push(Query.search("caption", searchTerm));
    }

    // Fetch posts based on the generated query
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw new Error("No posts found");

    return posts;
  } catch (error) {
    console.error("Error in searchPosts:", error);
  }
}
// Related posts
export async function relatedPosts(post) {
  try {
    const words = post?.caption.split(" ").filter((word) => word.trim() !== "");
    const tagQueries = post?.tags.map((tag) => Query.search("tags", tag));

    // Create an array of promises for caption search queries
    const captionQueries = words.map((word) => Query.search("caption", word));

    // Run all queries concurrently for both captions and tags using Promise.all
    const results = await Promise.all([
      ...captionQueries.map((query) =>
        database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          [query]
        )
      ),
      ...tagQueries.map((query) =>
        database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          [query]
        )
      ),
    ]);

    // Use a Set to keep track of unique post IDs
    const uniquePostIds = new Set();
    const relatedPosts = [];

    // Process the results
    results.forEach((res) => {
      if (res?.documents) {
        res.documents.forEach((relatedPost) => {
          if (
            relatedPost.$id !== post.$id &&
            !uniquePostIds.has(relatedPost.$id)
          ) {
            relatedPosts.push(relatedPost);
            uniquePostIds.add(relatedPost.$id);
          }
        });
      }
    });

    return relatedPosts;
  } catch (error) {
    console.error("Error searching posts:", error);
  }
}
// Get saved posts
export async function getSavedPosts(currentUser) {
  if (!currentUser?.save?.length) {
    return [];
  }
  try {
    const savedPosts = await Promise.all(
      currentUser.save.map((save) => getPostById(save.post.$id))
    );
    if (!savedPosts) throw Error;
    return savedPosts.reverse();
  } catch (error) {
    console.error("Error fetching saved posts:", error);
  }
}
// Get user posts
export async function getUserPosts(userId) {
  if (!userId) return;

  try {
    const post = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ==================
// User Functions
// ==================
// Get users
export async function getUsers(limit) {
  const queries = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}
// Search users
export async function searchUsers(searchTerm) {
  try {
    // Determine the query field based on input
    const queries = [];
    if (searchTerm.startsWith("@")) {
      // Search in 'username' field
      const usernameTerm = searchTerm.slice(1); // Remove '@' from the search term
      queries.push(Query.search("username", usernameTerm));
    } else {
      // Search in 'name' field
      queries.push(Query.search("name", searchTerm));
    }

    // Fetch posts based on the generated query
    const users = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw new Error("No users found");

    return users;
  } catch (error) {
    console.error("Error in searchPosts:", error);
  }
}
// Get user by ID
export async function getUserById(userId) {
  try {
    const user = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}