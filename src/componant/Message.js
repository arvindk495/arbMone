import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Message(props) {
  const [open, setOpen] = React.useState(false);
  let message = props.messageText

  React.useEffect(()=>{
    setOpen(true);
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
       
      return;
    }
    clearTimeout(props.clear)
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        
        <Alert onClose={handleClose} severity={!props.error?"success":"error"} sx={{ width: '100%' }}>
            {
                !props.error?(<a target='_blank' href={'https://goerli-rollup-explorer.arbitrum.io/tx/'+message}>{message}</a>):message
            }
          
        </Alert>
      </Snackbar>
    </Stack>
  );
}