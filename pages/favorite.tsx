import GradientLayout from '../components/gradientLayout';
import UserFavorite from '../components/userFavorite';
import Artists from '../components/artists';

const FavoritePage = () => {
  return (
    <GradientLayout
      as="main"
      gradient={
        'linear(40deg, purple.400 0%, purple.800 30%, rgba(0,0,0,0.6) 100%)'
      }
      p={4}
      color="white"
    >
      <UserFavorite
        itemType="song"
        heading="Favorite Songs"
        emptyMessage="0 Favorite Songs"
      />
      <Artists
        heading="Artists you following"
        emptyMessage="You have not followed anyone"
      />
    </GradientLayout>
  );
};

export default FavoritePage;
