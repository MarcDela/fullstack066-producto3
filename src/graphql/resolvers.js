let ofertas = [
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
];

export const root = {
    getOfertas: () => ofertas,
    getDemandas: () => demandas,
    getUsuarios: () => usuarios,

    crearOferta: (args) => {
        const nuevaOferta = { 
            id: String(ofertas.length + 1), 
            titulo: args.titulo,
            empresa: args.empresa,
            ubicacion: args.ubicacion,
            descripcion: args.descripcion,
            fecha: args.fecha
        };
        ofertas.push(nuevaOferta);
        return nuevaOferta;
    },

    crearDemanda: (args) => {
        const nuevaDemanda = {
            id: String(demandas.length + 1),
            nombre: args.nombre,
            profesion: args.profesion,
            disponibilidad: args.disponibilidad,
            descripcion: args.descripcion,
            fecha: args.fecha
        };
        demandas.push(nuevaDemanda);
        return nuevaDemanda;
    },

    crearUsuario: (args) => {
        const nuevoUsuario = {
            id: String(usuarios.length + 1),
            nombre: args.nombre,
            email: args.email,
            password: args.password,
            rol: args.rol
        };
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
};