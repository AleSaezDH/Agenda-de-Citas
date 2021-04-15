import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Snackbarr (props) {

    console.log(props);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
      
      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));
      
        const classes = useStyles();
        const [open, setOpen] = React.useState(true);
      
        const handleClose = (event, reason) => {
            props.modificarAlerta('');
          if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
        };
      
        return (
          <div className={classes.root}>
              {props.valor === 'success' ? 
                          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="success">
                            Cinta creada con éxito!
                          </Alert>
                        </Snackbar>
            : null}

            {props.valor === 'warning' ? 
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning">
                          Completa todos los campos
                        </Alert>
                      </Snackbar>
        : null}

            {props.valor === 'info' ? 
                          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="success">
                            Cinta eliminada con éxito!
                          </Alert>
                        </Snackbar>
            : null}
          </div>
        );
}

export default Snackbarr;