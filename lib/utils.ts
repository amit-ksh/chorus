export const getRandomBGColor = () => {
  const colors = [
    'red',
    'green',
    'telegram',
    'orange',
    'purple',
    'linkedin',
    'teal',
    'facebook',
    'yellow',
    'messenger',
    'twitter',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
