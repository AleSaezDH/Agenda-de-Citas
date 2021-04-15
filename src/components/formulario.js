import React, { useState } from 'react';
import {Button, Paper, TextField, Typography, Snackbar} from '@material-ui/core';
import Snackbarr from './snackbar';

function Formulario ({agregarCitas}) {
    let datos = {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }
    const [cita, setCita] = useState(datos);
    const [alerta, setAlerta] = useState('');

    const handleChange = e => {
        setCita({...cita, [e.target.name] : e.target.value});
    }

    // el [e.target.value] me devuelve el valor actual del input donde el usuario esta escribiendo. Si yo hiciera un
    // console.log([e.target.value]) y estoy escribiendo en el input con name mascota ese log me devuelve un array
    // con una sola posicion que es un string con el nombre mascota: ['mascota']. Entonces como e.target.value siempre
    // va a tener el valor actual de lo que estoy escribiendo en la linea 14 de ccodigo se puede decir que estoy
    // asgianando el valor de lo que estoy escribiendo al campo donde lo estoy escribiendo porque [e.target.name] sabe
    // en que input estoy parado y le asigna el valor que tiene e.target.value y como queremos mantener el resto del objeto
    // necesitamos hacer un spread porque sino setCita solamente guardaria un objeto con una sola key con el valor que me
    // devuelve el evento, en vez guardar todas las key aunque esten vacias

    const {mascota, propietario, fecha, hora, sintomas} = cita

    // destructuro los valores de cita para mas adelante poder resetear el formulario

    const agregarCita = e => {
        e.preventDefault()
        
        if ((mascota && propietario && fecha && hora && sintomas).trim() === '') {
        setAlerta('warning');
        return ;
        }

        cita.id = Math.floor(Math.random()*10000000);
        agregarCitas(cita);
        setCita(datos);
        setAlerta('success');
    }

    let estilo = {
        marginBottom : 20
    }

    function modificarAlerta (dato) {
        console.log(dato);
        setAlerta(dato);
    }

    return <div style={{display:'flex', flexDirection:'column', width:'50%', textAlign:'center', marginLeft:50, marginRight:25}}>
        <Paper elevation={3}>
        <Typography variant="h4" style={{marginTop:15, marginBottom:15}}> Crea tu cita </Typography>
    <form onSubmit={agregarCita} style={{paddingRight:50, paddingLeft:50, paddingBottom:50}}>
        <div style={estilo}>
            <TextField label="Mascota" name='mascota' onChange={handleChange} value={mascota} fullWidth/>
        </div>

        <div style={estilo}>
            <TextField label="Dueño" name='propietario' onChange={handleChange} value={propietario} fullWidth/>
        </div>

        <div style={{marginTop:40, marginBottom:40, display:'flex', justifyContent:'space-around'}}>
            <TextField label="Fecha" type="date" name='fecha' onChange={handleChange} value={fecha} InputLabelProps={{shrink: true}} />
            <TextField label="Hora" type="time" name='hora' onChange={handleChange} value={hora} InputLabelProps={{shrink: true}} />
        </div>

        <TextField label="Síntomas" name='sintomas' onChange={handleChange} value={sintomas} multiline rows={4} fullWidth variant='outlined'/>

        <Button color='primary' variant='contained'  type='submit' style={{marginTop:40}}>Agregar cita</Button>
    </form>
    </Paper>
    {alerta === 'warning' ? <Snackbarr valor={'warning'} modificarAlerta={modificarAlerta}/> : null}
    {alerta === 'success' ? <Snackbarr valor={'success'} modificarAlerta={modificarAlerta}/> : null}
    </div>
}

export default Formulario;