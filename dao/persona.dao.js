const express = require('express');
const Logger = require('nodemon/lib/utils/log');

const logger = require('../log/log');

const { PersonaModel, ConcesionarioPreRegModel, ConcesionarioRegModel, ConcesionarioInstalaModel } = require('../models/persona.model');

const utils = require('../utils/utils');

const ruta = ' [persona.dao.js] ';

/****************************************************************/
/**************    P R E   --   R E G I S T R O    **************/
/****************************************************************/

/* ********** busqueda de Concesionario por RFC   ********** */
function consultaConcesionarioRFC(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioRFC';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let ok = false;
        let mensaje = '';

        let resul = [];

        BdConsultaConcesionarioRFC(entrada.RFC, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                ok = datos[0].resultado;
                mensaje = datos[0].mensaje;

                if (ok) {

                    logger.info('ok');

                    const concesionario = new PersonaModel({
                        IdConcesionario: datos[0].IdPersona,
                        Nombre: datos[0].Nombre,
                        Paterno: datos[0].Paterno,
                        Materno: datos[0].Materno,
                        RFC: datos[0].RFC,
                        CURP: datos[0].CURP,
                        IdIdentificacion: datos[0].IdIdentificacion,
                        FolioIdentificacion: datos[0].FolioIdentificacion,
                        FechaNacimiento: datos[0].FechaNacimiento,
                        TipoPersona: datos[0].TipoPersona,
                        Genero: datos[0].Genero,
                        EstadoCivil: datos[0].EstadoCivil,
                        Calle: datos[0].Calle,
                        Exterior: datos[0].Exterior,
                        Interior: datos[0].Interior,
                        IdColonia: datos[0].IdColonia,
                        Colonia: datos[0].Colonia,
                        CP: datos[0].CP,
                        EntidadFederativa: datos[0].EntidadFederativa,
                        Municipio: datos[0].Municipio,
                        Telefono: datos[0].Telefono,
                        Celular: datos[0].Celular,
                        email: datos[0].email,
                        IdSindicato: datos[0].IdSindicato,
                        IdAsignacionSindicato: datos[0].IdAsignacionSindicato,
                        NumeroConcesion: datos[0].NumeroConcesion
                    });

                    logger.info('concesionario');
                    logger.info(JSON.stringify(concesionario));
                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        concesionario
                    }

                } else {

                    resul = {
                        estatus: false,
                        mensaje,
                        concesionario: []
                    }

                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar al Concesionario por RFC: ${err}`);
    });
}

/* ********** Consulta de Concesionarios activos en prerregistro   ********** */
function consultaConcesionarioPrerreg(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioPrerreg';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let concesionarios = [];
        let numReg = 0;

        BdConsultaConcesionarioPrerreg(entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {

                        let concesionario = new ConcesionarioPreRegModel({
                            IdConcesionario: datos[i].IdConcesionario,
                            Nombre: datos[i].Nombre,
                            Paterno: datos[i].Paterno,
                            Materno: datos[i].Materno,
                            NombreCompleto: datos[i].Nombre + ' ' + datos[i].Paterno + ' ' + datos[i].Materno,
                            FechaRegistro: datos[i].FechaPreregistro,
                            IdVehiculo: datos[i].IdVehiculo,
                            IdMarca: datos[i].IdMarca,
                            Marca: datos[i].Marca,
                            IdSubmarca: datos[i].IdSubmarca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            Placa: datos[i].Placa,
                            IdPropietario: datos[i].IdPropietario,
                            IdCita: datos[i].IdCita,
                            FechaCita: datos[i].FechaCita,
                            IdDictamen: datos[i].IdDictamen,
                            Dictamen: datos[i].Dictamen,
                            EstatusCita: datos[i].EstatusCita,
                            Dictaminar: (datos[i].Dictaminar == 1) ? true : false
                        });

                        concesionarios.push(concesionario);

                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        concesionarios
                    }

                } else {

                    resul = {
                        estatus: false,
                        mensaje: 'No existe información',
                        concesionarios: []
                    }

                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar a los Concesionarios en prerregistro: ${err}`);
    });
}

/* ********** Consulta de Concesionario por id y vehículo   ********** */
function consultaConcesionarioVehiculo(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioVehiculo';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let concesionarios = [];
        let numReg = 0;

        BdConsultaConcesionarioVehiculo(entrada.IdPersona, entrada.IdVehiculo, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    let concesionario = new PersonaModel({
                        IdConcesionario: datos[0].IdPersona,
                        Nombre: datos[0].Nombre,
                        Paterno: datos[0].Paterno,
                        Materno: datos[0].Materno,
                        RFC: datos[0].RFC,
                        CURP: datos[0].CURP,
                        IdIdentificacion: datos[0].IdIdentificacion,
                        FolioIdentificacion: datos[0].FolioIdentificacion,
                        FechaNacimiento: datos[0].FechaNacimiento,
                        TipoPersona: datos[0].TipoPersona,
                        Genero: datos[0].Genero,
                        EstadoCivil: datos[0].EstadoCivil,
                        Calle: datos[0].Calle,
                        Exterior: datos[0].Exterior,
                        Interior: datos[0].Interior,
                        IdColonia: datos[0].IdColonia,
                        Colonia: datos[0].Colonia,
                        CP: datos[0].CP,
                        EntidadFederativa: datos[0].EntidadFederativa,
                        Municipio: datos[0].Municipio,
                        Telefono: datos[0].Telefono,
                        Celular: datos[0].Celular,
                        email: datos[0].email,
                        IdSindicato: datos[0].IdSindicato,
                        IdAsignacionSindicato: datos[0].IdAsignacionSindicato,
                        NumeroConcesion: datos[0].NumeroConcesion
                    });

                    concesionarios.push(concesionario);

                }

                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
                    concesionarios
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar a la Persona indicada: ${err}`);
    });
}

/* ********** Edicion de Concesionario ********** */
function edicionConcesionario(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: edicionConcesionario';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];

        let estatus = false;
        let mensaje = '';
        let mensajeDet = '';
        let IdConcesionario = 0;

        editaPersona('C', entrada)
            .then(function(rows) {

                logger.info('rows');
                logger.info(rows);
                logger.info(JSON.stringify(rows));

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                estatus = datos.estatus;
                mensaje = datos.mensaje;
                mensajeDet = datos.mensajeDet;
                IdConcesionario = datos.IdPersona;

                resul = {
                    estatus,
                    mensaje,
                    mensajeDet,
                    IdConcesionario
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al editar al Concesionario en prerregistro: ${err}`);
    });
}

/* ********** Edita una Persona (Concesionario, Propietario, Operador)   ********** */
function editaPersona(TipoPersona, Entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${Entrada.IdUsuario}] METODO: EditaPersona `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let ok = false;
        let mensaje = '';
        let mensajeDet = '';


        let query_str = '';

        query_str = `CALL spPersona('${TipoPersona}',
        ${utils.paramSP(Entrada.IdPersona,'N')},  
        ${utils.paramSP(Entrada.Nombre,'S')}, 
        ${utils.paramSP(Entrada.Paterno,'S')},
        ${utils.paramSP(Entrada.Materno,'S')},
        ${utils.paramSP(Entrada.RFC,'S')},
        ${utils.paramSP(Entrada.CURP,'S')},
        ${utils.paramSP(Entrada.IdIdentificacion,'N')},
        ${utils.paramSP(Entrada.FolioIdentificacion,'S')},
        ${utils.paramSP(Entrada.FechaNacimiento,'S')},
        ${utils.paramSP(Entrada.TipoPersona,'S')},
        ${utils.paramSP(Entrada.Genero,'S')},
        ${utils.paramSP(Entrada.EstadoCivil,'S')},
        ${utils.paramSP(Entrada.Calle,'S')},
        ${utils.paramSP(Entrada.Exterior,'S')},
        ${utils.paramSP(Entrada.Interior,'S')}, 
        ${utils.paramSP(Entrada.IdColonia,'S')},
        ${utils.paramSP(Entrada.Telefono,'S')},
        ${utils.paramSP(Entrada.Celular,'S')},
        ${utils.paramSP(Entrada.email,'S')},
        ${utils.paramSP(Entrada.IdAsignacionSindicato,'N')},
        ${utils.paramSP(Entrada.IdSindicato,'N')},
        ${utils.paramSP(Entrada.NumeroConcesion,'S')},
        ${utils.paramSP(Entrada.IdVehiculo,'N')},
        ${utils.paramSP(Entrada.Licencia,'S')},
        ${utils.paramSP(Entrada.Estatus,'S')}
        )`;

        BdEdicionPersona(query_str, Entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                ok = datos[0].resultado;
                mensaje = datos[0].mensaje;
                mensajeDet = datos[0].mensajeDet;
                IdPersona = datos[0].IdPersona;

                resul = {
                    estatus: ok,
                    mensaje,
                    mensajeDet,
                    IdPersona
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al editar a la Persona: ${err}`);
    });
}

/* ********** busqueda de Propietario por RFC   ********** */
function consultaPropietarioRFC(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaPropietarioRFC';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let propietario = [];
        let numReg = 0;

        BdConsultaPropietarioRFC(entrada.RFC, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let datPropietario = new PersonaModel({
                        IdPropietario: datos[0].IdPersona,
                        Nombre: datos[0].Nombre,
                        Paterno: datos[0].Paterno,
                        Materno: datos[0].Materno,
                        RFC: datos[0].RFC,
                        CURP: datos[0].CURP,
                        IdIdentificacion: datos[0].IdIdentificacion,
                        FolioIdentificacion: datos[0].FolioIdentificacion,
                        FechaNacimiento: datos[0].FechaNacimiento,
                        TipoPersona: datos[0].TipoPersona,
                        Genero: datos[0].Genero,
                        EstadoCivil: datos[0].EstadoCivil,
                        Calle: datos[0].Calle,
                        Exterior: datos[0].Exterior,
                        Interior: datos[0].Interior,
                        IdColonia: datos[0].IdColonia,
                        Colonia: datos[0].Colonia,
                        CP: datos[0].CP,
                        EntidadFederativa: datos[0].EntidadFederativa,
                        Municipio: datos[0].Municipio,
                        Telefono: datos[0].Telefono,
                        Celular: datos[0].Celular,
                        email: datos[0].email

                    });
                    propietario.push(datPropietario);

                } else {
                    let datPropietario = new PersonaModel({
                        IdPropietario: 0
                    });
                    propietario.push(datPropietario);

                }

                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
                    propietario
                }


                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar al Propietario por RFC: ${err}`);
    });
}

/* ********** Edicion de Propietario ********** */
function edicionPropietario(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: edicionPropietario';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];

        let estatus = false;
        let mensaje = '';
        let mensajeDet = '';
        let IdPropietario = 0;

        editaPersona('P', entrada)
            .then(function(rows) {

                logger.info('rows');
                logger.info(rows);
                logger.info(JSON.stringify(rows));

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                estatus = datos.estatus;
                mensaje = datos.mensaje;
                mensajeDet = datos.mensajeDet;
                IdPropietario = datos.IdPersona;

                resul = {
                    estatus,
                    mensaje,
                    mensajeDet,
                    IdPropietario
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al editar al Propietario en prerregistro: ${err}`);
    });
}

/* ********** Consulta de Propietario por id y Vehículo    ********** */
function consultaPropietarioVehiculo(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaPropietarioVehiculo';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let propietario = [];
        let numReg = 0;

        BdConsultaPropietarioVehiculo(entrada.IdPersona, entrada.IdVehiculo, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    let datPropietario = new PersonaModel({
                        IdPropietario: datos[0].IdPersona,
                        Nombre: datos[0].Nombre,
                        Paterno: datos[0].Paterno,
                        Materno: datos[0].Materno,
                        RFC: datos[0].RFC,
                        CURP: datos[0].CURP,
                        IdIdentificacion: datos[0].IdIdentificacion,
                        FolioIdentificacion: datos[0].FolioIdentificacion,
                        FechaNacimiento: datos[0].FechaNacimiento,
                        TipoPersona: datos[0].TipoPersona,
                        Genero: datos[0].Genero,
                        EstadoCivil: datos[0].EstadoCivil,
                        Calle: datos[0].Calle,
                        Exterior: datos[0].Exterior,
                        Interior: datos[0].Interior,
                        IdColonia: datos[0].IdColonia,
                        Colonia: datos[0].Colonia,
                        CP: datos[0].CP,
                        EntidadFederativa: datos[0].EntidadFederativa,
                        Municipio: datos[0].Municipio,
                        Telefono: datos[0].Telefono,
                        Celular: datos[0].Celular,
                        email: datos[0].email,
                        IdSindicato: datos[0].IdSindicato,
                        IdAsignacionSindicato: datos[0].IdAsignacionSindicato,
                        NumeroConcesion: datos[0].NumeroConcesion
                    });

                    propietario.push(datPropietario);

                }

                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
                    propietario
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar a la Persona indicada: ${err}`);
    });
}

/****************************************************************/
/**************          R E G I S T R O           **************/
/****************************************************************/

/* ********** Consulta de Concesionarios activos en registro   ********** */
function consultaConcesionarioReg(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioReg';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let concesionarios = [];
        let numReg = 0;

        BdConsultaConcesionarioReg(entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {

                        let concesionario = new ConcesionarioRegModel({
                            IdConcesionario: datos[i].IdConcesionario,
                            NombreConcesionario: datos[i].NombreConcesionario,
                            FechaRegistro: datos[i].FechaPreregistro,
                            IdVehiculo: datos[i].IdVehiculo,
                            Marca: datos[i].Marca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            Placa: datos[i].Placa,
                            Estatus: datos[i].Estatus,
                            IdSindicato: datos[i].IdSindicato,
                            Sindicato: datos[i].Sindicato,
                            IdAsignacionSindicato: datos[i].IdAsignacionSindicato,
                            EditaContrato: (datos[i].EditaContrato == 1) ? true : false,
                            EditaDocumentos: (datos[i].EditaDocumentos == 1) ? true : false,
                        });

                        concesionarios.push(concesionario);

                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        concesionarios
                    }

                } else {

                    resul = {
                        estatus: false,
                        mensaje: 'No existe información',
                        concesionarios: []
                    }

                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar a los Concesionarios en prerregistro: ${err}`);
    });
}

/* ********** Consulta de Concesionarios activos en registro   ********** */
function consultaConcesionarioVerifica(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioVerifica';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let concesionarios = [];
        let numReg = 0;

        BdConsultaConcesionarioVerifica(entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {

                        let concesionario = new ConcesionarioRegModel({
                            IdConcesionario: datos[i].IdConcesionario,
                            NombreConcesionario: datos[i].NombreConcesionario,
                            FechaRegistro: datos[i].FechaPreregistro,
                            IdVehiculo: datos[i].IdVehiculo,
                            Marca: datos[i].Marca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            Placa: datos[i].Placa,
                            Estatus: datos[i].Estatus,
                            IdSindicato: datos[i].IdSindicato,
                            Sindicato: datos[i].Sindicato,
                            IdAsignacionSindicato: datos[i].IdAsignacionSindicato
                        });

                        concesionarios.push(concesionario);

                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        concesionarios
                    }

                } else {

                    resul = {
                        estatus: false,
                        mensaje: 'No existe información',
                        concesionarios: []
                    }

                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar a los Concesionarios en prerregistro: ${err}`);
    });
}

/* ********** Edicion de Operador ********** */
function edicionOperador(entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${entrada.IdUsuario}] FUNCION: edicionOperador `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];

        let estatus = false;
        let mensaje = '';
        let mensajeDet = '';
        let IdOperador = 0;

        BdEditaOperador(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                estatus = datos[0].resultado;
                mensaje = datos[0].mensaje;
                mensajeDet = datos[0].mensajeDet;
                IdOperador = datos[0].IdOperador;

                resul = {
                    estatus,
                    mensaje,
                    mensajeDet,
                    IdOperador
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        throw (`Se presentó un error al editar al Operador: ${err}`);
    });
}

/* ********** Cambio del Estatus del Operador ********** */
function cambioEstatusOperador(entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${entrada.IdUsuario}] FUNCION: cambioEstatusOperador `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];

        let estatus = false;
        let mensaje = '';
        let mensajeDet = '';

        BdCambioEstatusOperador(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                estatus = datos[0].resultado;
                mensaje = datos[0].mensaje;
                mensajeDet = datos[0].mensajeDet;

                resul = {
                    estatus,
                    mensaje,
                    mensajeDet
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        throw (`Se presentó un error al editar al Operador: ${err}`);
    });
}

/* ********** busqueda de Operador por RFC   ********** */
function consultaOperadorRFC(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaOperadorRFC';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let operador = [];
        let numReg = 0;

        BdConsultaOperadorRFC(entrada.RFC, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let datOperador = new PersonaModel({
                        IdOperador: datos[0].IdOperador,
                        Nombre: datos[0].Nombre,
                        Paterno: datos[0].Paterno,
                        Materno: datos[0].Materno,
                        RFC: datos[0].RFC,
                        CURP: datos[0].CURP,
                        IdIdentificacion: datos[0].IdIdentificacion,
                        FolioIdentificacion: datos[0].FolioIdentificacion,
                        FechaNacimiento: datos[0].FechaNacimiento,
                        TipoPersona: datos[0].TipoPersona,
                        Genero: datos[0].Genero,
                        EstadoCivil: datos[0].EstadoCivil,
                        Calle: datos[0].Calle,
                        Exterior: datos[0].Exterior,
                        Interior: datos[0].Interior,
                        IdColonia: datos[0].IdColonia,
                        Colonia: datos[0].Colonia,
                        CP: datos[0].CP,
                        EntidadFederativa: datos[0].EntidadFederativa,
                        Municipio: datos[0].Municipio,
                        Telefono: datos[0].Telefono,
                        Celular: datos[0].Celular,
                        email: datos[0].email,
                        Licencia: datos[0].Licencia

                    });
                    operador.push(datOperador);

                } else {
                    let datOperador = new PersonaModel({
                        IdOperador: 0
                    });

                    operador.push(datOperador);

                }

                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
                    operador
                }


                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar al Operador por RFC: ${err}`);
    });
}

/* ********** busqueda de Operadores del vehículo  ********** */
function consultaOperadoresVehiculo(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaOperadoresVehiculo';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let operadores = [];
        let numReg = 0;

        BdConsultaOperadoresVehiculos(entrada.Placa, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    if (datos[0].IdOperador > 0) {
                        for (i = 0; i < numReg; i++) {

                            const operador = new PersonaModel({
                                IdOperador: datos[i].IdOperador,
                                NombreCompleto: datos[i].Nombre + ' ' + datos[i].Paterno + ' ' + datos[i].Materno,
                                Nombre: datos[i].Nombre,
                                Paterno: datos[i].Paterno,
                                Materno: datos[i].Materno,
                                RFC: datos[i].RFC,
                                CURP: datos[i].CURP,
                                IdIdentificacion: datos[i].IdIdentificacion,
                                FolioIdentificacion: datos[i].FolioIdentificacion,
                                FechaNacimiento: datos[i].FechaNacimiento,
                                TipoPersona: datos[i].TipoPersona,
                                Genero: datos[i].Genero,
                                EstadoCivil: datos[i].EstadoCivil,
                                Calle: datos[i].Calle,
                                Exterior: datos[i].Exterior,
                                Interior: datos[i].Interior,
                                IdColonia: datos[i].IdColonia,
                                Colonia: datos[i].Colonia,
                                CP: datos[i].CP,
                                EntidadFederativa: datos[i].EntidadFederativa,
                                Municipio: datos[i].Municipio,
                                Telefono: datos[i].Telefono,
                                Celular: datos[i].Celular,
                                email: datos[i].email,
                                Licencia: datos[i].Licencia,
                                Estatus: datos[i].Estatus
                            });

                            operadores.push(operador);

                        }
                    }
                    resul = {
                        estatus: true,
                        IdVehiculo: datos[0].IdVehiculo,
                        IdConcesionario: datos[0].IdConcesionario,
                        mensaje: 'Consulta exitosa',
                        operadores
                    }



                } else {

                    resul = {
                        estatus: false,
                        mensaje: 'No existe la placa indicada',
                        IdVehiculo: 0,
                        IdConcesionario: 0,
                        operadores: []
                    }

                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar los Concesionarios del Vehículo indicado: ${err}`);
    });
}

/* ********** Consulta de Concesionarios activos en registro   ********** */
function consultaConcesionarioInstalacion(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaConcesionarioInstalacion';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let concesionarios = [];
        let numReg = 0;

        BdConsultaConcesionarioInstalacion(entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                logger.info('resultado');
                logger.info(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {

                        let concesionario = new ConcesionarioInstalaModel({
                            IdConcesionario: datos[i].IdConcesionario,
                            NombreConcesionario: datos[i].NombreConcesionario,
                            FechaRegistro: datos[i].FechaPreregistro,
                            IdVehiculo: datos[i].IdVehiculo,
                            Marca: datos[i].Marca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            Placa: datos[i].Placa,
                            TipoVehiculo: datos[i].TipoVehiculo,
                            TipoConvertidor: datos[i].TipoConvertidor,
                            FechaCitaInstalacion: datos[i].FechaCitaInstalacion,
                            EstatusCitaInstalacion: datos[i].EstatusCitaInstalacion,
                            ConfirmaCita: (datos[i].ConfirmaCita == 1) ? true : false
                        });

                        concesionarios.push(concesionario);

                    }
                }

                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
                    concesionarios
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar los Concesionarios con Documentación Correcta: ${err}`);
    });
}

/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/
/********************** PRE REGISTRO ****************************/
function BdConsultaConcesionarioRFC(RFC, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioRFC `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioRFC('${RFC}')`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioRFC: ${err}`);
    });

}
/****************************************************************/
function BdConsultaConcesionarioPrerreg(Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioPrerreg `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioPrereg()`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioPrerreg: ${err}`);
    });

}

/****************************************************************/
function BdEdicionPersona(pQuery_str, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${Usuario }] METODO: BdEdicionPersona `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        logger.info(pQuery_str);

        con.query(pQuery_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdEdicionPersona: ${err}`);
    });

}

/****************************************************************/
function BdConsultaConcesionarioVehiculo(IdConcesionario, IdVehiculo, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioVehiculo `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioVehiculo(${utils.paramSP(IdConcesionario,'N')}, ${utils.paramSP(IdVehiculo,'N')})`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioVehiculo: ${err}`);
    });

}

/****************************************************************/
function BdConsultaPropietarioRFC(RFC, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaPropietarioRFC `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaPropietarioRFC('${RFC}')`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaPropietarioRFC: ${err}`);
    });

}

/****************************************************************/
function BdConsultaPropietarioVehiculo(IdPropietario, IdVehiculo, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaPropietarioVehiculo `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaPropietarioVehiculo(${utils.paramSP(IdPropietario,'N')}, ${utils.paramSP(IdVehiculo,'N')})`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaPropietarioVehiculo: ${err}`);
    });

}


/************************* REGISTRO *****************************/
/****************************************************************/
function BdConsultaConcesionarioReg(Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioReg `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioRegis()`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioReg: ${err}`);
    });

}

function BdConsultaConcesionarioVerifica(Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioVerifica `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioVerifica()`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioVerifica: ${err}`);
    });

}

function BdEditaOperador(Entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${Entrada.IdUsuario}] METODO: BdEditaOperador `;
    logger.info(etiquetaLOG);

    let query_str = '';

    query_str = `CALL spOperador(
    ${utils.paramSP(Entrada.IdOperador,'N')},  
    ${utils.paramSP(Entrada.Nombre,'S')}, 
    ${utils.paramSP(Entrada.Paterno,'S')},
    ${utils.paramSP(Entrada.Materno,'S')},
    ${utils.paramSP(Entrada.RFC,'S')},
    ${utils.paramSP(Entrada.CURP,'S')},
    ${utils.paramSP(Entrada.IdIdentificacion,'N')},
    ${utils.paramSP(Entrada.FolioIdentificacion,'S')},
    ${utils.paramSP(Entrada.FechaNacimiento,'S')},
    ${utils.paramSP(Entrada.TipoPersona,'S')},
    ${utils.paramSP(Entrada.Genero,'S')},
    ${utils.paramSP(Entrada.EstadoCivil,'S')},
    ${utils.paramSP(Entrada.Calle,'S')},
    ${utils.paramSP(Entrada.Exterior,'S')},
    ${utils.paramSP(Entrada.Interior,'S')}, 
    ${utils.paramSP(Entrada.IdColonia,'S')},
    ${utils.paramSP(Entrada.Telefono,'S')},
    ${utils.paramSP(Entrada.Celular,'S')},
    ${utils.paramSP(Entrada.email,'S')},
    ${utils.paramSP(Entrada.IdConcesionario,'N')},
    ${utils.paramSP(Entrada.IdVehiculo,'N')},
    ${utils.paramSP(Entrada.Licencia,'S')}
    )`;
    logger.info('query_str');
    logger.info(query_str);
    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        con.query(query_str, function(err, rows) {
            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();

            resolve(rows[0]);
        });
    })

    .catch((err) => {

        throw (`Se presentó un error en BdEditaOperador: ${err}`);
    });

}

function BdCambioEstatusOperador(Entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${Entrada.IdUsuario}] METODO: BdCambioEstatusOperador `;
    logger.info(etiquetaLOG);

    let query_str = '';

    query_str = `CALL spOperadorEstatus(
    ${utils.paramSP(Entrada.IdOperador,'N')},  
    ${utils.paramSP(Entrada.IdVehiculo,'N')},
    ${utils.paramSP(Entrada.Estatus,'S')}
    )`;
    logger.info('query_str');
    logger.info(query_str);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        con.query(query_str, function(err, rows) {
            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();

            resolve(rows[0]);
        });
    })

    .catch((err) => {

        throw (`Se presentó un error en BdCambioEstatusOperador: ${err}`);
    });

}

/****************************************************************/
function BdConsultaOperadorRFC(RFC, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaOperadorRFC `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaOperadorRFC('${RFC}')`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaOperadorRFC: ${err}`);
    });

}

/****************************************************************/
function BdConsultaOperadoresVehiculos(Placa, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaOperadoresVehiculos `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaOperadores('${Placa}')`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaOperadoresVehiculos: ${err}`);
    });

}

/****************************************************************/
function BdConsultaConcesionarioInstalacion(Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaConcesionarioInstalacion `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaConcesionarioInstala()`;

        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows[0]);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaConcesionarioInstalacion: ${err}`);
    });

}


module.exports = {
    consultaConcesionarioRFC,
    consultaConcesionarioPrerreg,
    edicionConcesionario,
    consultaConcesionarioVehiculo,
    consultaPropietarioRFC,
    edicionPropietario,
    consultaPropietarioVehiculo,
    consultaConcesionarioReg,
    consultaConcesionarioVerifica,
    edicionOperador,
    cambioEstatusOperador,
    consultaOperadorRFC,
    consultaOperadoresVehiculo,
    consultaConcesionarioInstalacion
};