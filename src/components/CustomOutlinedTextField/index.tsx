import { Box, FormHelperText, OutlinedInput } from '@mui/material';

const CustomOutlinedTextField = ({
  name,
  placeholder,
  label,
  required,
  helpText,
  onChange,
  type = 'text',
  value,
}: {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  helpText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string | number;
}) => {
  return (
    <Box mb={5} display={'flex'} flex={1} flexDirection={'column'}>
      <p style={{ fontSize: 12, fontWeight: 500 }}>
        {label} {required ? <span style={{ color: 'red' }}>*</span> : null}
      </p>
      <OutlinedInput
        value={value}
        type={type}
        onChange={onChange}
        fullWidth
        name={name}
        sx={{
          '&:hover > .MuiOutlinedInput-notchedOutline': {
            borderColor: '#03A9F4',
          },
        }}
        placeholder={placeholder}
      />
      {helpText && (
        <FormHelperText id="outlined-weight-helper-text">
          {helpText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomOutlinedTextField;
