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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FullCard({ item, handleRoute }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button style={{
                margin: 0, padding: 0, fontWeight: 600, background: 'transparent',
            }}
                onClick={handleOpen}>read more</Button>
            <Modal
                open={open}
                onClose={handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="">
                        <div className="" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', }}>
                            <div className=''>
                                <img src={item.pic} className="" style={{ width: 600, objectFit: 'cover', height: 200 }} alt="none" />
                            </div>
                            <div className="p-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 style={{
                                    'fontSize': '1.4rem',
                                    'fontFamily': 'sans-serif',
                                    'color': '#34b4eb'
                                }}>{item.name}</h5>
                                <div className="h-32 w-14  text-ellipsis whitespace-normal overflow-y-hidden overflow-scroll"><p style={{ color: "#8c378b", fontFamily: 'monospace' }} className="">{item.description}

                                </p></div>
                                <div><p style={{ color: "#e6b935", fontWeight: "700" }} className="mt-1">Placements stats :{item.placements}</p></div>
                                <div className="mt-1"><a style={{ color: "#e85a72", cursor: 'pointer' }} onClick={() => handleRoute(item)}>
                                    Schedule Meet<i class="material-icons left">send</i>
                                </a> </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}