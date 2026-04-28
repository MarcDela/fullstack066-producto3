//Importaciones librerias
import { Almacenaje } from "../../js/almacenaje.js";

export const root = {
    getOfertas: async() => {return await Almacenaje.obtenerOfertas();},
    getDemandas: async() => {return await Almacenaje.obtenerDemandas();},
    getUsuarios: async() => {return await Almacenaje.obtenerUsuarios()},

    crearOferta: async ({titulo,empresa,ubicacion,descripcion,fecha}) => {
        const lista=await Almacenaje.obtenerOfertas();
        const nueva={id:String(lista.length+1),titulo,empresa,ubicacion,descripcion,fecha};
        return await Almacenaje.guardarOferta(nueva);
    },   

    crearDemanda: async ({nombre,profesion,disponibilidad,descripcion,fecha}) =>{
        const lista=await Almacenaje.obtenerDemandas();
        const nueva={id:String(lista.length+1),nombre,profesion,disponibilidad,descripcion,fecha};
          return await Almacenaje.guardarDemanda(nueva);
    }, 

    crearUsuario: async ({nombre,email,password,rol}) => {
        const lista =await Almacenaje.obtenerUsuarios();
        const nuevo ={id:String(lista.length+1), nombre,email,password,rol};
        return await Almacenaje.guardarUsuario(nuevo);
    }

};