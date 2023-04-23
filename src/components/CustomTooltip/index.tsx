import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontWeight: '500',
    padding: 10,
    maxWidth: 280,
  },
}));

const CustomTooltip = ({ title }: { title: string }) => {
  return (
    <StyledTooltip title={title} placement="right">
      <InfoOutlinedIcon color="disabled" />
    </StyledTooltip>
  );
};

export default CustomTooltip;
