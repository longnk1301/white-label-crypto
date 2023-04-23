import { Box, FormControlLabel, Switch } from '@mui/material';
import CustomTooltip from '../CustomTooltip';

const CustomCheckBox = ({
  label,
  checked,
  tooltipTitle,
  handleChange,
  name,
}: {
  name: string;
  label: string;
  tooltipTitle?: string;
  checked?: boolean;
  handleChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}) => {
  return (
    <Box alignItems={'center'} display={'flex'} mb={5}>
      <FormControlLabel
        control={
          <Switch
            name={name}
            checked={checked}
            onChange={handleChange}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#03A9F4',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#03A9F4',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track .MuiFormControlLabel-label':
                {
                  color: '#03A9F4',
                },
            }}
          />
        }
        label={label}
      />
      {tooltipTitle && <CustomTooltip title={tooltipTitle} />}
    </Box>
  );
};

export default CustomCheckBox;
