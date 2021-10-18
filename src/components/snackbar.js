import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Snackbarr (props) {

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
                          <Snackbar data-testid="success" open={open} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="success">
                            Cita creada con éxito!
                          </Alert>
                        </Snackbar>
            : null}

            {props.valor === 'warning' ? 
                        <Snackbar data-testid="warning" open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning">
                          Completa todos los campos
                        </Alert>
                      </Snackbar>
        : null}

            {props.valor === 'info' ? 
                          <Snackbar  data-testid="info" open={open} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="success">
                            Cinta eliminada con éxito!
                          </Alert>
                        </Snackbar>
            : null}
          </div>
        );
}

export default Snackbarr;