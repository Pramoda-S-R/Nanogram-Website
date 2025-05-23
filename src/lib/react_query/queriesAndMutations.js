import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createComment,
  createEvent,
  createMessage,
  createNanogram,
  createNews,
  createPost,
  createUserAccount,
  deleteComment,
  deleteEvent,
  deleteMessage,
  deleteNanogram,
  deleteNews,
  deletePost,
  followUser,
  getAllEvents,
  getAllNanograms,
  getCurrentUser,
  getInfinitePosts,
  getMessages,
  getNews,
  getNewsById,
  getPostById,
  getRecentPosts,
  getSavedPosts,
  getTopUsers,
  getUserById,
  getUserPosts,
  getUsers,
  getUserTopPosts,
  likeComment,
  likePost,
  relatedPosts,
  savePost,
  searchPosts,
  searchUsers,
  signInAccount,
  signOutAccount,
  unFollowUser,
  unSavePost,
  updateEvent,
  updateMessage,
  updateNanogram,
  updateNews,
  updatePost,
  updateUser,
  updateUserKarma,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

// ==================
// Auth Queries
// ==================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ==================
// Post Queries
// ==================

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
    initialData: [],
    onError: (error) => {
      console.error("Error in useGetRecentPosts:", error);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }) => deletePost(postId, imageId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useLikePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likesArray }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }) => savePost(postId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useUnSavePosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId) => unSavePost(savedRecordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam = null }) => getInfinitePosts(pageParam),
    getNextPageParam: (lastPage) => {
      // If the lastPage has no documents, return null to stop fetching
      if (!lastPage || lastPage.documents.length === 0) {
        return null;
      }

      // Get the $id of the last document in the current page
      const lastDocument = lastPage.documents[lastPage.documents.length - 1];

      // Validate lastDocument and return its $id
      return lastDocument && lastDocument.$id ? lastDocument.$id : null;
    },
  });
};

export const useSearchPosts = (searchTerm) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useRelatedPosts = (post) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, post],
    queryFn: () => relatedPosts(post),
    enabled: !!post,
  });
};

export const useGetSavedPosts = (currentUser) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, currentUser?.$id],
    queryFn: () => getSavedPosts(currentUser),
    enabled: !!currentUser,
  });
};

export const useGetUserPosts = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserTopPosts = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_TOP_POSTS, userId],
    queryFn: () => getUserTopPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

// ==================
// News Queries
// ==================

export const useGetNews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS],
    queryFn: getNews,
    initialData: [],
    onError: (error) => {
      console.error("Error in useGetNews:", error);
    },
  });
};

export const useGetNewsById = (newsId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS_BY_ID, newsId],
    queryFn: () => getNewsById(newsId),
    enabled: !!newsId,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (news) => createNews(news),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS_BY_ID, data.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS],
      });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (news) => updateNews(news),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS_BY_ID, data.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS],
      });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newsId, fileId }) => deleteNews(newsId, fileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS_BY_ID, data.newsId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEWS],
      });
    },
  });
};

// ==================
// Comment Queries
// ==================

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment) => createComment(comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.post],
      });
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, likesArray }) =>
      likeComment(commentId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.post],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.post],
      });
    },
  });
};

// ==================
// Message Queries
// ==================

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message) => createMessage(message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES, data.sender.$id, data.receiver.$id],
      });
    },
  });
};

export const useGetMessages = ({ senderId, receiverId }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, senderId, receiverId],
    queryFn: ({ pageParam = null }) =>
      getMessages(pageParam, senderId, receiverId),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.documents.length === 0) {
        return null;
      }

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      return lastDocument && lastDocument.$id ? lastDocument.$id : null;
    },
    enabled: !!senderId && !!receiverId,
  });
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message) => updateMessage(message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES, data.sender.$id, data.receiver.$id],
      });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId) => deleteMessage(messageId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES],
      });
    },
  });
};

// ==================
// User Queries
// ==================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = (limit) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useSearchUsers = (searchTerm) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, searchTerm],
    queryFn: () => searchUsers(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ followerId, followedId }) =>
      followUser(followerId, followedId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data.followed],
      });
    },
  });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followedRecordId) => unFollowUser(followedRecordId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data.followedId],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

export const useUpdateUserKarma = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUserKarma(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TOP_USERS],
      });
    },
  });
};

export const useGetTopUsers = (limit) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_USERS],
    queryFn: () => getTopUsers(limit),
  });
};

// ==================
// Nanogram Queries
// ==================
export const useCreateNanogram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nanogram) => createNanogram(nanogram),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NANOGRAM],
      });
    },
  });
};

export const useUpdateNanogram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nanogram) => updateNanogram(nanogram),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NANOGRAM],
      });
    },
  });
};

export const useGetNanogram = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NANOGRAM],
    queryFn: getAllNanograms,
    initialData: [],
    onError: (error) => {
      console.error("Error in useGetNanogram:", error);
    },
  });
};

export const useDeleteNanogram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ nanogramId, avatarId }) =>
      deleteNanogram(nanogramId, avatarId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NANOGRAM],
      });
    },
  });
};

// ==================
// Event Queries
// ==================
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event) => createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EVENTS],
      });
    },
  });
};

export const useGetEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVENTS],
    queryFn: getAllEvents,
    initialData: [],
    onError: (error) => {
      console.error("Error in useGetEvents:", error);
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event) => updateEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EVENTS],
      });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, imageId }) => deleteEvent(eventId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_EVENTS],
      });
    },
  });
};
