import React, { useEffect, useState } from 'react';
import Formulario from './formulario';
import Citas from './citas';

function Home () {

    let citasGuardadas = JSON.parse(localStorage.getItem('citas'));

    if (!citasGuardadas) {
        citasGuardadas = []
    }
    const [citas, setCitas] = useState(citasGuardadas);

    useEffect(() => {
        let citasGuardadas = JSON.parse(localStorage.getItem('citas'));
        if (citasGuardadas) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas]);

    function agregarCitas (cita) {
        setCitas([...citas, cita]);
    }

    const eliminarCita = (id) => {
        let nuevasCitas = citas.filter(x => x.id !== id);
        setCitas(nuevasCitas);
    }

    return (<>
        <h1>Administrador de Pacientes</h1>
        <div className='container'>
          <div className='row'>
            <div className='one-half column'>
              <Formulario agregarCitas={agregarCitas}/>
            </div>
            <div className='one-half column'>
              <Citas citas={citas} eliminarCita={eliminarCita}/>
            </div>
          </div>
        </div>
        </>
    )
}

export default Home;
