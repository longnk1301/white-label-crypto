import { Box, Button } from '@mui/material';
import { useState } from 'react';
import Metamask from '../../assets/metamask.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    shortAddress,
    useAccount,
    useWeb3,
} from '../../contexts/web3-provider';

const Header = () => {
    const { account } = useAccount();
    const { connect, disconnect } = useWeb3();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnect = () => {
        disconnect && disconnect();
        handleClose();
    };

    const renderAccount = () => {
        if (account) {
            return (
                <>
                    <Button
                        sx={{
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
                        }}
                        variant="text"
                        onClick={handleClick}
                    >
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                display: 'inline-block',
                            }}
                        >
                            {shortAddress(account)}
                        </span>

                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={Metamask}
                                alt="metamask"
                                width="20"
                                height="20"
                            />
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
                                backgroundColor: '#fff', // set your desired background color
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
                </>
            );
        }

        return (
            <Button
                sx={{
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
                }}
                variant="text"
                onClick={connect}
            >
                <span
                    style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Connect wallet
                </span>
            </Button>
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

export default Header;
