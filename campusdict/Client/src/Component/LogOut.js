import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ setLogin }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory();
    const handleLogOut = () => {
        setLogin(false);
        localStorage.removeItem('jwt');
        history.push('/');
    }

    return (
        <div>
            <Button style={{
                color: 'black', border: '1px solid ', marginRight: 10, cursor: 'pointer',
                fontSize: '1.2rem',
                background:'transparent',
                letterSpacing: .5,
                fontFamily: 'monospace',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
            }}
                onClick={handleOpen}>LogOut</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h1">
                        Log Out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you really want to logout ☹️ ?
                    </Typography>
                    <div class="modal-footer">
                        <a onClick={handleLogOut} class="modal-close waves-effect waves-green btn-flat"
                            style={{ backgroundColor: 'orange', color: 'white', marginRight: 8 }}>Yes, Logout</a>
                        <a class="modal-close waves-effect waves-green btn-flat"
                            style={{ backgroundColor: 'dodgerBlue', color: 'white' }}>No</a>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}