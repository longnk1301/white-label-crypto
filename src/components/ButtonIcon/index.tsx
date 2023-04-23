import { Button } from '@mui/material';

const ButtonIcon = ({
  icon,
  text,
  selected,
  onCLick,
}: {
  icon?: any;
  text: string;
  selected?: boolean;
  onCLick?: () => void;
}) => {
  return (
    <Button
      sx={{
        width: 159,
        maxWidth: 159,
        height: 48,
        textTransform: 'none',
        flex: 1,
        display: 'flex',
        justifyContent: 'start',
        paddingLeft: 4,
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: selected ? '#03A9F4' : '#E8F0FF',
        color: selected ? '#ffffff' : '#6C7483',
        '&:hover': {
          backgroundColor: '#03A9F4',
          color: '#ffffff',
        },
      }}
      variant="text"
      startIcon={icon}
      onClick={onCLick}
    >
      {text}
    </Button>
  );
};

export default ButtonIcon;
