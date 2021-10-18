import React from 'react';
import {IconButton, Paper, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

function Citas ({citas, eliminarCita}) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.secondary,
        },
      }));

      const classes = useStyles();

    return <div data-testid="cita" style={{display:'flex', flexDirection:'column', width:'50%', textAlign:'center', marginLeft:25, marginRight:50}}>
        <Paper elevation={3}>
        {citas.length !== 0 ? <Typography variant="h4" style={{marginTop:15, marginBottom:30}}> Citas pendientes </Typography> : <Typography variant="h4" style={{marginTop:15, marginBottom:15}}> Sin citas </Typography>}
        {citas.map(cita => (
        <div data-testid="eachCita" className={classes.root}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>{cita.mascota}</Typography>
            <Typography className={classes.secondaryHeading} style={{marginLeft:140}}>{cita.fecha} {cita.hora}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                <div style={{display:'flex', flexDirection:'column', textAlign:'left', marginLeft:30}}>
                    <p>Dueño: {cita.propietario}</p>
                    <p>Síntomas: {cita.sintomas}</p>
                </div>
                <IconButton style={{marginLeft:500}} area-label='delete'><DeleteIcon color='error' style={{cursor:'pointer'}} onClick={() => eliminarCita(cita.id)} /></IconButton>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
        ))}
    </Paper>
    </div>
}

Citas.propTypes = {
  citas: PropTypes.array.isRequired,
  eliminarCita: PropTypes.func.isRequired
}
export default Citas;
