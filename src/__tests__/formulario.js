import Formulario from '../components/formulario';
import Citas from "../components/citas";
import Snackbarr from '../components/snackbar';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import "@testing-library/user-event"
import userEvent from '@testing-library/user-event';

const agregarCitas = jest.fn();
let formulario
afterEach(cleanup)
//beforeEach(() => formulario = <Formulario agregarCitas={agregarCitas}/>) PROBAR COMO HACERLO PARA NO RENDERIZAR EL COMPONENTE
// EN CADA TEST
/* jest nos provee de after y beforeEach que son funciones que se van a ejecutar después o antes de cada test. En este caso como 
 estamos montando a Formulario en varios test diferentes necesitamos limpiar la memoria cuando termina el primer test antes de 
 volver a montar el componente en el segundo test. Para eso testing-library nos provee de una función cleanup que realiza esa 
 tarea y con el afterEach declaramos que haga la limpieza despues de termianar cada test. Algunos frameworks lo hacen 
 automáticamente asique en este caso no haría falta agregarlo*/


describe("<Formulario />", () => {
    test('renderiza el componente y revisa su correcto funcionamiento', () => {
        render(<Formulario agregarCitas={agregarCitas}/>);

        expect(screen.getByText('Crea tu cita')).toBeInTheDocument();

        const titulo = screen.getByTestId("titulo");
        expect(titulo.textContent).toBe("Crea tu cita");
        expect(titulo.tagName).toBe("H4");
        expect(titulo.tagName).not.toBe("H1");
    });

/*
    1. para comprobar que el componente se monta ejecutar: formComponent.debug(); esto hay que hacerlo cada vez que creamos un 
    nuevo test. Una vez confirmado podemos eliminarlo.
    2. console.log(render())
    3. tambien se podria hacer de otra manera, podriamos hacer const {getByText} = formComponent; y evitar usar screen
    4. los metodos get suelen usarse para cosas fijas del dom y los find para llamados asincronos
    5. toBeInTheDocument es un metodo que para usarlo necesitamos importarlo desde testing-library
    6. getAllByTestId permite seleccionar las nodos jsx que tengan data-testid. Si consologueamos eso nos trae el elemento html
    asique a eso podemos aplicarle los metodos de js, por eso usamos textContent
    7. jest.fn() permite crear una mock o funcion espia. El componente formulario recibe una prop que es una funcion llamada 
    agregarCita y que declaramos en las propTypes que es obligatoria por lo tanto si en el test renderizamos este componente 
    necesitamos enviarle esa prop. Esta mock va a hacer de cuenta como si fuera esa funcion para que el componente se pueda 
    renderizar
*/

    test("validacion del formulario", () => {
        render(<Formulario agregarCitas={agregarCitas}/>);

        const boton = screen.getByTestId("boton-submit");
        fireEvent.click(boton);
        expect(screen.getByText("Completa todos los campos")).toBeInTheDocument();
    });

/*
    1. fireEvent ya no se usa mucho pero sirve para disparar un evento. Despues de hacerlo, corroboramos que aparezca el warning
*/

    test("llenar el formulario", () => {
        render(<Formulario agregarCitas={agregarCitas}/>);

        const botonSubmit = screen.getByTestId("boton-submit");
        const inputMascota = screen.getByTestId("mascota");
        //fireEvent.change(inputMascota, { target: {value:"Baxter"}});
        const inputDueño = screen.getByTestId("dueño");
        const inputFecha = screen.getByTestId("fecha");
        const inputHora = screen.getByTestId("hora");
        const inputSintomas = screen.getByTestId("sintomas");

        userEvent.type(inputMascota, "Baxter");
        userEvent.type(inputDueño, "Ale");
        userEvent.type(inputFecha, "2021-02-10");
        userEvent.type(inputHora, "10:30"); 
        userEvent.type(inputSintomas, "Ninguno");

        userEvent.click(botonSubmit);

        render(<Snackbarr />);

        const alertaSuccess = screen.queryByTestId("success");
        const alertaWarning = screen.queryByTestId("warning");
        expect(alertaSuccess).toBeInTheDocument();
        expect(alertaWarning).not.toBeInTheDocument();

        expect(agregarCitas).toHaveBeenCalled();
        expect(agregarCitas).toHaveBeenCalledTimes(1);
    });

/*
    1. userEvent sirve para aplicar eventos, igual que fireEvent pero con la diferencia de una sintaxis más sencilla. El fireEvent
    ya no es tan usado, se está reemplazando por userEvent. userEvent.type es como hacer un fireEvent.change (evento onChange).
    2. cuando clickeo el botón de submit, necesito montar el componente Snackbar por eso el render. Porque necesito chequear 
    que, una vez llenado el form y clickeado el botón, salga el cartel de success y no el de warning. 
    3. después de chequear eso quiero confirmar que se ejecute la función agregarCitas para confirmar que los datos se guarden en 
    el state
    4. cuando algo puede o no estar se usa query en vez de get. Por ejemplo si hay algún nodo o componente que su montado depende de 
    algo (osea si está dentro de un ternario por ejemplo) se usa el mismo método pero con query y no con get.
*/

    test("chequear que la cita se haya creado y aparezca en el dom", async () => {
        let eliminarCita = jest.fn();
        let citaComponent = render(<Citas citas={[]} eliminarCita={eliminarCita}/>);
        expect(citaComponent).toBeDefined();

        /*let citaComponentDT = screen.getByTestId("cita");
        console.log(citaComponentDT.toString());*/

        let cadaCita = await screen.getAllByTestId("eachCita");
        console.log(cadaCita);
    });

    /*
    1. Primero chequeo que el componente de citas se esté renderizando (renderizando el componente y usando toBeDefined para confirmar
        que lo esté haciendo bien y luego re confirmo usando getByTestId), luego que las citas lo hagan
    */
});