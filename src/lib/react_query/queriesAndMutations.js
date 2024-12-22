import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePost,
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  likePost,
  savePost,
  searchPosts,
  signInAccount,
  signOutAccount,
  unSavePost,
  updatePost,
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

// ==================
// User Queries
// ==================
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};
