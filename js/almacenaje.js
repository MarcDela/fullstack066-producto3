/**const CLAVE_USUARIOS = "usuarios";
const CLAVE_SESION = "usuarioLogueado";*/

import { MongoClient } from 'mongodb';

//Código de conexión a MongoDB + declaración nombre de nuestra BBDD
const uri ="mongodb+srv://sridaopa_db_user:eZA4S7JM6cG8OZQQ@cluster0.jl1bafx.mongodb.net/?appName=Cluster0";
const dbName = "BBDD_AgroJobs";

const client = new MongoClient(uri);

//Conexion con la BBDD y comprobvación de no conexiones simultáneas cada vez
export const Almacenaje = {
    conectar: async () => {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        return client.db(dbName);
    },

    obtenerUsuarios: async () => {const db=await Almacenaje.conectar();
        return await db.collection("usuarios").find().toArray();
    },
    guardarUsuario: async (usuario) => {const db=await Almacenaje.conectar();
        await db.collection("usuarios").insertOne(usuario);
        return usuario;
    },

    buscarUsuario:async (email) => {const db=await Almacenaje.conectar();
        return await db.collection("usuarios").findOne({ email: email });
    },
    borrarUsuario: async (email) => {const db=await Almacenaje.conectar();
        return await db.collection("usuarios").deleteOne({ email: email });
    },
    
    // --- DATOS DE OFERTAS Y DEMANDAS ---
    obtenerOfertas: async() => {const db=await Almacenaje.conectar();
        return await db.collection("ofertas").find().toArray();
    },
    guardarOferta: async(oferta) => {const db=await Almacenaje.conectar();
        await db.collection("ofertas").insertOne(oferta);
        return oferta;
    },
    obtenerDemandas: async() => {const db=await Almacenaje.conectar();
        return await db.collection("demandas").find().toArray();
    },
    guardarDemanda: async(demanda) => {const db=await Almacenaje.conectar();
        await db.collection("demandas").insertOne(demanda);
        return demanda;
    },
};

//Declaramos variables
/**let ofertas = [
    {id:"1", titulo:"Tractorista", empresa:"Campo Grande",ubicacion:"Tórrec", descripcion:"Manejo de maquinaria agrícola y apoyo en tareas de campo.", fecha:"27/03/2026"},
    {id: "2", titulo: "Ingeniero agrónomo", empresa: "Monmalo", ubicacion: "Agramunt", descripcion: "Gestión de fincas, mejora de producción y coordinación técnica.", fecha: "25/03/2026"}
];

let demandas = [
    {id: "3", nombre: "Laura Gómez", profesion: "Marketing Digital", disponibilidad: "Inmediata", descripcion: "Interesada en comunicación digital, redes sociales y campañas online.", fecha: "26/03/2026"},
    {id: "4", nombre: "Carlos Pérez", profesion: "Soporte IT", disponibilidad: "15 días", descripcion: "Experiencia en soporte técnico, incidencias y atención a usuarios.", fecha: "27/03/2026"}
];

let usuarios = [
    {id: "1", nombre: "Admin", email: "admin@agrojobs.com", password: "123456aA", rol: "Administrador"},
    {id: "2", nombre: "Laura Gómez", email: "laura@correo.com", password: "123456aA", rol: "Candidato"},
    {id: "3", nombre: "Campo Grande", email: "rrhh@campogrande.com", password: "123456aA", rol: "Empresa"}
];*/

    // --- DATOS DE SESION ---
    /**getSesion: () => localStorage.getItem(CLAVE_SESION),
    setSesion: (email) => localStorage.setItem(CLAVE_SESION, email),
    borrarSesion: () => localStorage.removeItem(CLAVE_SESION),*/

// --- LÓGICA DE INTERFAZ REUTILIZABLE --- (Evitamos repetir funciones en todos los archivos js)
/**export function actualizarNavbar() {
    const emailLogueado = Almacenaje.getSesion();
    const zonaSesion = document.getElementById("zona-sesion");

    if (!zonaSesion) return;

    if (emailLogueado) {
        zonaSesion.innerHTML = `
            <span class="nav-link mb-0">${emailLogueado}</span>
            <button id="btn-logout" class="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0" type="button">
                Cerrar sesión
            </button>
        `;
        
        const botonLogout = document.getElementById("btn-logout");
        if (botonLogout) {
            botonLogout.onclick = cerrarSesion; 
        }
    } else {
        zonaSesion.innerHTML = `
            <a class="nav-link" href="login.html">Login</a>
        `;
    }
}

export function cerrarSesion() {
    Almacenaje.borrarSesion(); 
    window.location.href = "index.html"; 
}*/