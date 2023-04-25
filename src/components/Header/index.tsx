import { useWeb3React } from '@web3-react/core';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import Metamask from '../../assets/metamask.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { injected } from '../../config/wallet';

const Header = () => {
  const { account, activate, deactivate, error, chainId } = useWeb3React();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isAlreadyConnect, setIsAlreadyConnect] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const shortAddress = (address: string) => {
    return address != null
      ? address?.substr(0, 7) + '...' + address?.substr(-4)
      : undefined;
  };

  async function connect() {
    if (!window?.ethereum?.isMetaMask) {
      setIsAlreadyConnect(true);
      return;
    } else {
      if (!chainId) {
        setIsAlreadyConnect(true);
      }
      try {
        await activate(injected);
        localStorage.setItem('isWalletConnected', `true`);
      } catch (ex) {
        console.log(ex);
      }
      if (
        error?.message ===
        'Already processing eth_requestAccounts. Please wait.'
      ) {
        setIsAlreadyConnect(true);
      }
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', `false`);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', `true`);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', `true`);
        } catch (ex) {
          console.log(ex);
        }
      }
    };

    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSnackBar = () => {
    setIsAlreadyConnect(false);
    if (!window?.ethereum?.isMetaMask) {
      window.open(
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US'
      );
    }
  };

  const renderAccount = () => {
    if (isAlreadyConnect) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isAlreadyConnect}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {!window?.ethereum?.isMetaMask
              ? 'Please download Metamask first!'
              : !chainId
              ? 'Please connect to Goerli Test Network first!'
              : 'Please connect Metamask first!'}
          </Alert>
        </Snackbar>
      );
    }

    if (account) {
      return (
        <Box pr={5} pl={5}>
          <Button sx={styles.button} variant="text" onClick={handleClick}>
            <span style={styles.textButton}>{shortAddress(account)}</span>
            <span style={styles.textInline}>
              <img src={Metamask} alt="metamask" width="20" height="20" />
            </span>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                backgroundColor: '#fff',
                width: 200,
              },
            }}
          >
            <MenuItem
              onClick={handleDisconnect}
              sx={{ display: 'flex', gap: 1 }}
            >
              <img
                src="https://www.pngall.com/wp-content/uploads/8/Disconnect-Link-PNG-Image.png"
                alt="Disconnect"
                width="20"
                height="20"
              />
              <span>Disconnect</span>
            </MenuItem>
          </Menu>
        </Box>
      );
    }

    return (
      <Box pr={5}>
        <Button sx={styles.connectButton} variant="text" onClick={connect}>
          <span style={styles.connectButtonText}>Connect wallet</span>
        </Button>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flex={1}
      sx={{
        height: 70,
        borderBottom: '1px solid #ccc',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {renderAccount()}
    </Box>
  );
};

const styles = {
  button: {
    width: 159,
    maxWidth: 200,
    height: 48,
    textTransform: 'none',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#E8F0FF',
    color: '#6C7483',
    '&:hover': {
      backgroundColor: '#E8F0FF',
      color: '#6C7483',
    },
  },
  textButton: {
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  textInline: { display: 'flex', alignItems: 'center' },
  connectButton: {
    width: 159,
    maxWidth: 200,
    height: 48,
    textTransform: 'none',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#03A9F4',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#03A9F4',
      color: '#ffffff',
    },
  },
  connectButtonText: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default Header;
