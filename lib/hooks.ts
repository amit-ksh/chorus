import useSWR from 'swr';
import fetcher from './fetcher';

export const useMe = () => {
  const { data, error } = useSWR('/get/user/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useUserPlaylist = () => {
  const { data, error } = useSWR('/get/user/playlist/', fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useFavorite = (itemType: 'song' | 'playlist' | 'artist') => {
  const { data, error } = useSWR(`/get/user/favorite/${itemType}`, fetcher);

  return {
    favorites: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
