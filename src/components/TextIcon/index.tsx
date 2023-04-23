import AdjustIcon from '@mui/icons-material/Adjust';

const TextIcon = ({
  icon = <AdjustIcon sx={{ color: '#03A9F4', marginRight: 1 }} />,
  text,
}: {
  icon?: any;
  text: string;
}) => {
  return (
    <p
      style={{
        justifyContent: 'start',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {icon}
      <span>{text}</span>
    </p>
  );
};

export default TextIcon;
