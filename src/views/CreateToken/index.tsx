import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import './style.css';
import { useState } from 'react';
import CustomOutlinedTextField from '../../components/CustomOutlinedTextField';
import Left from './Left';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomTooltip from '../../components/CustomTooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, Typography } from '@mui/material';

const flags = [
  'canBurn',
  'canMint',
  'canPause',
  'canBlacklist',
  'changeOwner',
  'hasDocument',
  'maxNumberOfTokensPerAddress',
  'canBeForceTransferred',
  'requiresWhitelisting',
];

export interface ICreateToken {
  tokenType: string;
  tokenName: string;
  symbol: string;
  initialSupply: number;
  decimals: number;
  canBurn?: boolean;
  canMint?: boolean;
  canPause?: boolean;
  canBlacklist?: boolean;
  changeOwner?: boolean;
  changeOwnerValue?: string;
  hasDocument?: boolean;
  hasDocumentValue?: string;
  maxNumberOfTokensPerAddress?: boolean;
  maxNumberOfTokensPerAddressValue?: string;
  canBeForceTransferred?: boolean;
  requiresWhitelisting?: boolean;
}

const CreateToken = () => {
  const [state, setState] = useState<ICreateToken>({
    tokenType: 'Ethereum',
    tokenName: '',
    symbol: '',
    initialSupply: 0,
    decimals: 0,
  });

  const handleSetTokenType = (value: string) => {
    setState({ ...state, tokenType: value });
  };

  function _handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'decimals') {
      if (Number(e.target.value) >= 0 && Number(e.target.value) <= 18) {
        setState({ ...state, [e.target.name]: Number(e.target.value) });
      }
      return;
    }

    if (flags.includes(e.target.name)) {
      setState({ ...state, [e.target.name]: e.target.checked });

      return;
    }

    setState({ ...state, [e.target.name]: e.target.value });
  }
  console.log('state, ', state);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#F7FAFF' }}>
      <Box pl={5} pr={5}>
      <Header />
      </Box>
      <Box display="flex" flex={1} p={5}>
        <span style={{ fontSize: 24, fontWeight: 500 }}>
          Create {state.tokenType} token
        </span>
      </Box>
      <Grid pl={5} pr={5} container flex={1} minHeight="100vh">
        <Grid textAlign="start" item xs={5} p={5} pt={4} bgcolor={'#ffffff'}>
          <Left state={state} handleSetState={handleSetTokenType} />
        </Grid>
        <Grid item xs={7} bgcolor={'#ffffff'} padding={5} textAlign="start">
          <Box>
            <p style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>
              Basic settings
            </p>
            <CustomOutlinedTextField
              value={state.tokenName}
              onChange={_handleChange}
              name="tokenName"
              label="Token name"
              required
              placeholder="e.g. Nice Token Name"
            />
            <CustomOutlinedTextField
              value={state.symbol}
              onChange={_handleChange}
              name="symbol"
              label="Symbol"
              required
              placeholder="e.g.NT"
            />
            <Box
              display={'flex'}
              flex={1}
              flexDirection={'row'}
              gap={3}
              width={'100%'}
            >
              <CustomOutlinedTextField
                value={state.initialSupply === 0 ? '' : state.initialSupply}
                type="number"
                onChange={_handleChange}
                name="initialSupply"
                label="Initial supply"
                required
                placeholder="e.g. 21,000,000"
              />
              <CustomOutlinedTextField
                value={state.decimals === 0 ? '' : state.decimals}
                type="number"
                onChange={_handleChange}
                name="decimals"
                label="Decimals (0-18)"
                required
                placeholder="e.g.18"
              />
            </Box>
            <Box>
              <p style={{ fontSize: 20, fontWeight: 500 }}>
                Token configuration
              </p>
              <CustomCheckBox
                name="canBurn"
                checked={state.canBurn}
                handleChange={_handleChange}
                label={'Can Burn'}
                tooltipTitle={
                  'Enables token burning after initial token creation to decrease supply.'
                }
              />
              <CustomCheckBox
                name="canMint"
                checked={state.canMint}
                handleChange={_handleChange}
                label={'Can Mint'}
                tooltipTitle="Enables additional token minting after initial token creation to increase supply."
              />
              <CustomCheckBox
                name="canPause"
                checked={state.canPause}
                handleChange={_handleChange}
                label={'Can Pause'}
                tooltipTitle="Specifies whether your token and all associated operations can be halted and resumed whenever needed. This can be useful in case of a vulnerability or a malicious attack. Be aware that enabling pausing gives central authority to the token creator."
              />
              <CustomCheckBox
                name="canBlacklist"
                checked={state.canBlacklist}
                handleChange={_handleChange}
                label={'Can Blacklist'}
                tooltipTitle="Specifies whether individual accounts such as malicious actors can be blacklisted after initial token creation. Be aware that enabling blacklisting gives central authority to the token creator."
              />
              <CustomCheckBox
                name="changeOwner"
                checked={state.changeOwner}
                handleChange={_handleChange}
                label={'Change Owner'}
              />
              {state.changeOwner && (
                <CustomOutlinedTextField
                  value={state.changeOwnerValue}
                  onChange={_handleChange}
                  name="changeOwnerValue"
                  label="Owner"
                  required
                  placeholder="e.g. 0x352b..."
                  helpText="The default owner is the address of the connected wallet. Note: if you change the owner to an address that you don’t control, you will not be able to make any changes to the token after its creation."
                />
              )}
            </Box>
            <Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <p style={{ fontSize: 20, fontWeight: 500, marginRight: 8 }}>
                  Security token configuration
                </p>
                <CustomTooltip title="Activation of these features increases the cost of token creation (see Token Tool terms) and may make your token incompatible with some DeFi protocols." />
              </Box>
              <CustomCheckBox
                name="hasDocument"
                checked={state.hasDocument}
                handleChange={_handleChange}
                label={'Has document'}
                tooltipTitle={
                  'A hash or URL can be used to reference documentation of the underlying asset. Can be edited after a token is successfully minted.'
                }
              />
              {state.hasDocument && (
                <CustomOutlinedTextField
                  value={state.hasDocumentValue}
                  onChange={_handleChange}
                  name="hasDocumentValue"
                  label="Has document"
                  placeholder="Type here"
                />
              )}
              <CustomCheckBox
                name="maxNumberOfTokensPerAddress"
                checked={state.maxNumberOfTokensPerAddress}
                handleChange={_handleChange}
                label={'Max number of tokens per address is limited'}
                tooltipTitle="Sets maximum token balance per individual address. Limit can be increased after initial token creation."
              />
              {state.maxNumberOfTokensPerAddress && (
                <CustomOutlinedTextField
                  name="maxNumberOfTokensPerAddressValue"
                  value={state.maxNumberOfTokensPerAddressValue}
                  onChange={_handleChange}
                  label="Max number of tokens per address"
                  placeholder="e.g. 200"
                />
              )}
              <CustomCheckBox
                name="canBeForceTransferred"
                checked={state.canBeForceTransferred}
                handleChange={_handleChange}
                label={'Can be force transferred'}
                tooltipTitle="Regulates the permissions of the token issuer to enforce token transfers without approval or signature of the token holder. Cannot be deactivated after initial token creation."
              />
              <CustomCheckBox
                name="requiresWhitelisting"
                checked={state.requiresWhitelisting}
                handleChange={_handleChange}
                label={'Requires Whitelisting'}
                tooltipTitle="Defines if token transfers are only possible to whitelisted addresses or if the token is freely transferable."
              />
            </Box>
            <Box p={1} display={'flex'} flexDirection={'row'}>
              <InfoOutlinedIcon color="info" />
              <Typography ml={1} color="rgb(3, 169, 244)">
                It takes approximately 10 seconds to create the tokens after you
                confirm. The token will be automatically transferred to the
                address of the creator/owner after the creation is successful.
              </Typography>
            </Box>
            <Box p={1} pt={5} display={'flex'} flexDirection={'row'}>
              <InfoOutlinedIcon color="error" />
              <Typography ml={1} color="#FB5A5F">
                It takes approximately 10 seconds to create the tokens after you
                confirm. The token will be automatically transferred to the
                address of the creator/owner after the creation is successful.
              </Typography>
            </Box>
            <Box p={1} pt={5} display={'flex'} flexDirection={'row'}>
              <Button
                disabled={
                  state.tokenName === '' &&
                  state.symbol === '' &&
                  state.initialSupply === 0 &&
                  state.decimals === 0
                }
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
                  backgroundColor: '#03A9F4',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#03A9F4',
                    color: '#ffffff',
                    cursor: 'pointer',
                  },
                }}
                variant="contained"
                onClick={() => {
                  alert(JSON.stringify(state));
                }}
              >
                Create token
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateToken;
