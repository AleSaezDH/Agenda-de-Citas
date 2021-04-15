import React, { useEffect, useState } from 'react';
import Formulario from './formulario';
import Citas from './citas';
import Snackbarr from './snackbar';

function Home () {

    const [alerta, setAlerta] = useState('');

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
        setAlerta('info');
    }

    function modificarAlerta (dato) {
        console.log(dato);
        setAlerta(dato);
    }

    return (<>
        <div style={{display:'flex', justifyContent:'space-around', marginTop:50}}>
              <Formulario agregarCitas={agregarCitas}/>
              <Citas citas={citas} eliminarCita={eliminarCita}/>
        </div>
              {alerta === 'info' ? <Snackbarr valor={'info'} modificarAlerta={modificarAlerta}/> : null}
        </>
    )
}

export default Home;
