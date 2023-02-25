import GradientLayout from '../components/gradientLayout';
import FavoriteSongs from '../components/favoriteSongs';
import Artists from '../components/Artists';

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
      <FavoriteSongs />
      <Artists
        heading="Artists you following"
        emptyMessage="You have not followed anyone"
      />
    </GradientLayout>
  );
};

export default FavoritePage;
