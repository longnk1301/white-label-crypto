import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      display="flex"
      flex={1}
      sx={{
        height: 70,
        borderBottom: '1px solid #ccc',
      }}
    />
  );
};

export default Header;
