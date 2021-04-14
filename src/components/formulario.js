import React, { useState } from 'react';
import swal from 'sweetalert';

function Formulario ({agregarCitas}) {
    let datos = {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }
    const [cita, setCita] = useState(datos);

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
            swal('Por favor completa todos los campos');
            return;
        }

        cita.id = Math.floor(Math.random()*10000000);
        agregarCitas(cita);
        setCita(datos)
    }


    return <>
    <h1>Crear cita</h1>
    <form onSubmit={agregarCita}>
        <label>Nombre mascota</label>
        <input type='text' name='mascota' className='u-full-width' placeholder='Nombre mascota' onChange={handleChange} value={mascota}></input>

        <label>Nombre del dueño</label>
        <input type='text' name='propietario' className='u-full-width' placeholder='Nombre dueño' onChange={handleChange} value={propietario}></input>

        <label>Fecha de alta</label>
        <input type='date' name='fecha' className='u-full-width' onChange={handleChange} value={fecha}></input>

        <label>Hora de alta</label>
        <input type='time' name='hora' className='u-full-width' onChange={handleChange} value={hora}></input>

        <label>Síntomas</label>
        <textarea name='sintomas' className='u-full-width' onChange={handleChange} value={sintomas}></textarea>

        <button type='submit' className='u-full-width button-primary'>Agregar cita</button>
    </form>
    </>
}

export default Formulario;
