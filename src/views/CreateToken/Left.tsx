import { Box, Stack } from '@mui/material';
import TextIcon from '../../components/TextIcon';
import ButtonIcon from '../../components/ButtonIcon';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { ICreateToken } from '.';

const Left = ({
  state,
  handleSetState,
}: {
  state: ICreateToken;
  handleSetState: (value: string) => void;
}) => {
  return (
    <Box>
      <TextIcon text={'Simple, fast and convenient token generator'} />
      <TextIcon text={'No smart contract programming required'} />
      <TextIcon text={'Get 100% ownership of generated tokens'} />
      <TextIcon text={'Set custom token name, symbol and initial supply'} />
      <TextIcon text={'Sign and create with your own wallet'} />
      <Box mt={5} width={335}>
        <Stack spacing={2} mb={2} direction="row">
          <ButtonIcon
            selected={state.tokenType === 'Ethereum'}
            icon={<CurrencyBitcoinIcon />}
            text="Ethereum"
            onCLick={() => handleSetState('Ethereum')}
          />
          <ButtonIcon
            selected={state.tokenType === 'Avalanche'}
            icon={<CurrencyExchangeIcon />}
            text="Avalanche"
            onCLick={() => handleSetState('Avalanche')}
          />
        </Stack>
        <Stack spacing={2} mb={2} direction="row">
          <ButtonIcon
            selected={state.tokenType === 'Polygon'}
            icon={<CurrencyFrancIcon />}
            text="Polygon"
            onCLick={() => handleSetState('Polygon')}
          />
          <ButtonIcon
            selected={state.tokenType === 'BSC'}
            icon={<CurrencyRubleIcon />}
            text="BSC"
            onCLick={() => handleSetState('BSC')}
          />
        </Stack>
        <Stack spacing={2} mb={2} direction="row">
          <ButtonIcon
            selected={state.tokenType === 'Fantom'}
            icon={<MonetizationOnIcon />}
            text="Fantom"
            onCLick={() => handleSetState('Fantom')}
          />
          <ButtonIcon
            selected={state.tokenType === 'Arbitrum'}
            icon={<EuroSymbolIcon />}
            text="Arbitrum"
            onCLick={() => handleSetState('Arbitrum')}
          />
        </Stack>
        <Stack spacing={2} mb={2} direction="row">
          <ButtonIcon
            selected={state.tokenType === 'Optimism'}
            icon={<CurrencyLiraIcon />}
            text="Optimism"
            onCLick={() => handleSetState('Optimism')}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Left;
