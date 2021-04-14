import React from 'react'

function Citas ({citas, eliminarCita}) {

    return <>
    {citas.length !== 0 ? <h1>Citas Pendientes</h1> : <h1>Sin Citas</h1>}
    {citas.map(cita => (
    <div className='cita' style={{marginBottom:30}}>
        <p>Mascota: <span> {cita.mascota} </span></p>
        <p>Dueño: <span> {cita.propietario} </span></p>
        <p>Fecha: <span> {cita.fecha} </span></p>
        <p>Hora: <span> {cita.hora} </span></p>
        <p>Síntomas: <span> {cita.sintomas} </span></p>

        <button className='button eliminar u-full-width' onClick={() => eliminarCita(cita.id)}>Eliminar</button>
    </div>
    ))}
    </>
}
export default Citas;
