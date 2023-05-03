
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ethers } from 'ethers';

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

export default function OpenModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const disconnectWallet = () =>{
console.log('hi')
if (window.ethereum) {
  const provider = window.ethereum;
  if (provider.isConnected()) {
    provider.provider.disconnect();
  }
}
    
  }

  React.useEffect(()=>{
    console.log(disconnectWallet())
  },[])

  return (
    <div>
      <Button onClick={handleOpen}>{props.children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ARB Monke
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <Button variant="outlined" onClick={()=>disconnectWallet()}>Disconnect</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}