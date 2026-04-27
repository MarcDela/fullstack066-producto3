//Importaciones librerias
import { Almacenaje } from "../../js/almacenaje.js";

export const root = {
    getOfertas: () => Almacenaje.obtenerOfertas(),
    getDemandas: () => Almacenaje.obtenerDemandas(),
    getUsuarios: () => Almacenaje.obtenerUsuarios(),

    crearOferta: ({titulo,empresa,ubicacion,descripcion,fecha}) => {
        const lista=Almacenaje.obtenerOfertas();
        const nueva={id:String(lista.length+1),titulo,empresa,ubicacion,descripcion,fecha};
        lista.push(nueva);
        Almacenaje.guardarOfertas(lista);
        return nueva;
    },   

    crearDemanda: ({nombre,profesion,disponibilidad,descripcion,fecha}) =>{
        const lista=Almacenaje.obtenerDemandas();
        const nueva={id:String(lista.length+1),nombre,profesion,disponibilidad,descripcion,fecha};
          lista.push(nueva);
          Almacenaje.guardarDemandas(lista);
          return nueva;
    }, 

    crearUsuario: ({nombre,email,password,rol}) => {
        const lista = Almacenaje.obtenerUsuarios();
        const nuevo ={id:String(lista.length+1), nombre,email,password,rol};
        lista.push(nuevo);
        Almacenaje.guardarUsuarios(lista);
        return nuevo;
    }

};