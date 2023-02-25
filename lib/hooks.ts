import useSWR from 'swr';
import fetcher from './fetcher';

export const useMe = () => {
  const { data, error } = useSWR('/get/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = (resourceName: 'playlist' | 'savedPlaylist') => {
  const { data, error } = useSWR(`/get/${resourceName}`, fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useFavorite = () => {
  const { data, error } = useSWR('/get/favorite', fetcher);

  return {
    songs: (data?.songs as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
