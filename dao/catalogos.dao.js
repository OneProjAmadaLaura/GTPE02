const express = require('express');

const app = express();

const logger = require('../log/log');

const {DictamenesModel}  = require('../models/catalogos.model');
const {UsuarioFullModel} = require('../models/usuario.model');
const {PerfilesModel }  = require('../models/catalogos.model');
const {EntidadesModel }  = require('../models/catalogos.model');
const {HGasModel }  = require('../models/catalogos.model');
const {HGasolinaModel }  = require('../models/catalogos.model');
const {FormalizadosModel, FormalizadosModelQ  }  = require('../models/catalogos.model');

const ruta = ' [catalogos.dao.js] ';

function obtieneFormalizados(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneFormalizados' + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let hFormalizadosLista = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneFormalizados paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaFormalizados(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneFormalizados paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                let etiquetaLOG3L = ruta + ' FUNCION: obtieneFormalizados paso 3L: ' + resultado;
                logger.info(etiquetaLOG3L);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneFormalizados paso 4, Numero de registros: ' + numReg;
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneFormalizados paso 4L' + datos[i].Concesionario;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdUsuario: datos[i].IdUsuario,
                                Nombre: datos[i].Nombre
                            }

                            hFormalizadosLista.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneFormalizados paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneFormalizados paso 5L : ' + datos[i].Concesionario;
                            logger.info(etiquetaLOG5L);
                            let estado = false;

                            let lFormalizados = new FormalizadosModel({
                                IdContrato: datos[i].IdContrato,
                                IdConcesionario: datos[i].IdConcesionario,
                                NumeroConcesion: datos[i].NumeroConcesion,
                                Concesionario: datos[i].Concesionario,
                                email: datos[i].email,
                                Telefono: datos[i].Telefono,
                                FechaInicio: datos[i].FechaInicio,
                                FechaTermino: datos[i].FechaTermino,
                                ConsumoMes: datos[i].ConsumoMes,
                                Periodos: datos[i].Periodos,
                                FechaContrato: datos[i].FechaContrato,
                                Empresa: datos[i].Empresa,
                                TipoConvertidor: datos[i].TipoConvertidor,
                                Convertidor: datos[i].Convertidor,
                                TipoVehiculo: datos[i].TipoVehiculo,
                                Vehiculo: datos[i].Vehiculo,
                                LitrosConsumidos: datos[i].LitrosConsumidos,
                                LitroXConsumir: datos[i].LitroXConsumir,
                                PorcentajeConsumo: datos[i].PorcentajeConsumo
                            });
                            hFormalizadosLista.push(lFormalizados);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        hFormalizadosLista
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        hFormalizadosLista: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneFormalizados paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener la lista de formalizados: ${err}`);
    });
}

/* ********** Obtiene historico de gasolina ********** */

function obtieneHGasolina(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneHGasolina' + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let hGasolinaLista = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneHGasolina paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaHGasolina(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneHGasolina paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                let etiquetaLOG3L = ruta + ' FUNCION: obtieneHGasolina paso 3L: ' + resultado;
                logger.info(etiquetaLOG3L);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneHGasolina paso 4, Numero de registros: ' + numReg;
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneHGasolina paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdUsuario: datos[i].IdUsuario,
                                Nombre: datos[i].Nombre
                            }

                            hGasolinaLista.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneHGasolina paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneHGasolina paso 5L : ' + datos[i].NombreM;
                            logger.info(etiquetaLOG5L);
                            let estado = false;

                            let hgasolina = new HGasolinaModel({
                                IdHistoricoGasolina    : datos[i].IdHistoricoGasolina    ,
                                FechaAlta         : datos[i].FechaAlta         ,
                                FechaDesde        : datos[i].FechaDesde        ,
                                FechaHasta        : datos[i].FechaHasta        ,
                                IdEntidadFederal  : datos[i].IdEntidadFederal  ,
                                IdMunicipio       : datos[i].IdMunicipio       ,
                                PrecioLtr         : datos[i].PrecioLtr         ,         
                                NombreE           : datos[i].NombreE           ,
                                NombreM           : datos[i].NombreM         
                            });
                            hGasolinaLista.push(hgasolina);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        hGasolinaLista
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        hGasolinaLista: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneHGasolina paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el historico de gasolina: ${err}`);
    });
}


/* ********** Obtiene historico de gas ********** */

function obtieneHGas(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneHGas' + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let hGasLista = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneHGas paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaHGas(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneHGas paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                let etiquetaLOG3L = ruta + ' FUNCION: obtieneHGas paso 3L: ' + resultado;
                logger.info(etiquetaLOG3L);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneHGas paso 4, Numero de registros: ' + numReg;
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneHGas paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdUsuario: datos[i].IdUsuario,
                                Nombre: datos[i].Nombre
                            }

                            hGasLista.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneHGas paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneHGas paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let estado = false;

                            let hgas = new HGasModel({
                                IdHistoricoGas    : datos[i].IdHistoricoGas    ,
                                FechaAlta         : datos[i].FechaAlta         ,
                                FechaDesde        : datos[i].FechaDesde        ,
                                FechaHasta        : datos[i].FechaHasta        ,
                                IdEntidadFederal  : datos[i].IdEntidadFederal  ,
                                IdMunicipio       : datos[i].IdMunicipio       ,
                                PrecioKg          : datos[i].PrecioKg          ,
                                PrecioLtr         : datos[i].PrecioLtr         ,         
                                NombreE           : datos[i].NombreE           ,
                                NombreM           : datos[i].NombreM         
                            });
                            hGasLista.push(hgas);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        hGasLista
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        hGasLista: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneHGas paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el historico de gas: ${err}`);
    });
}
/* ********** obtieneListaUsuarios ********** */

function obtieneUsuarios(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneUsuarios' + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let usuarios = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneUsuarios paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaUsuarios(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneUsuarios paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                let etiquetaLOG3L = ruta + ' FUNCION: obtieneUsuarios paso 3L: ' + resultado;
                logger.info(etiquetaLOG3L);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneUsuarios paso 4, Numero de registros: ' + numReg;
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneUsuarios paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdUsuario: datos[i].IdUsuario,
                                Nombre: datos[i].Nombre
                            }

                            usuarios.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneUsuarios paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneUsuarios paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let estado = false;
                            if(datos[i].Bloqueado == true)
                            {
                                estado = true;
                            }

                            let usuario = new UsuarioFullModel({
                                IdUsuario         : datos[i].IdUsuario     ,   
                                Nombre            : datos[i].Nombre        ,   
/*                                Contrasenia       : '*************'   ,   */
                                IdEmpleado        : datos[i].IdEmpleado    ,   
                                IdPerfil          : datos[i].IdPerfil      ,   
                                Perfil            : datos[i].Perfil        ,   
                                FechaRegistro     : datos[i].FechaRegistro.substring(0,10) ,   
                                Estatus           : datos[i].Estatus       ,   
                                email             : datos[i].email         ,   
                                Bloqueado         : estado     ,   
                                Intentos          : datos[i].Intentos      ,   
                                UltimaTransaccion : datos[i].UltimaTransaccion
                            });
                            usuarios.push(usuario);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        usuarios
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        usuarios: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneUsuarios paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener los usuarios: ${err}`);
    });
}

/* ********** obtieneDetalleUsuario ********** */

function consultaUsuario(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: consultaUsuario : '  + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let usuarios = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: consultaUsuario paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaUsuario(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: consultaUsuario paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);
                let etiquetaLOG3L = ruta + ' FUNCION: consultaUsuario paso 3L: ' + resultado;
                logger.info(etiquetaLOG3L);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: consultaUsuario paso 4, Numero de registros: ' + numReg;
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: consultaUsuario paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdUsuario: datos[i].IdUsuario,
                                Nombre: datos[i].Nombre
                            }

                            usuarios.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: consultaUsuario paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: consultaUsuario paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let estado = false;
                            if(datos[i].Bloqueado == true)
                            {
                                estado = true;
                            }

                            let usuario = new UsuarioFullModel({
                                IdUsuario         : datos[i].IdUsuario     ,   
                                Nombre            : datos[i].Nombre        ,   
 /*                               Contrasenia       : '*************'   ,   */
                                IdEmpleado        : datos[i].IdEmpleado    ,   
                                IdPerfil          : datos[i].IdPerfil      ,   
                                Perfil            : datos[i].Perfil        ,   
                                FechaRegistro     : datos[i].FechaRegistro.substring(0,10),   
                                Estatus           : datos[i].Estatus       ,   
                                email             : datos[i].email         ,   
                                Bloqueado         : estado     ,   
                                Intentos          : datos[i].Intentos      ,   
                                UltimaTransaccion : datos[i].UltimaTransaccion
                            });
                            usuarios.push(usuario);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        usuarios
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        usuarios: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: consultaUsuario paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener los usuarios: ${err}`);
    });
}

/* ********** Obtiene la lista de dictamenes ********** */

function obtieneDictamenes(entrada) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneDictamenes' + entrada;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let dictamenes = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneDictamenes paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaCatDictamenes(entrada)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneDictamenes paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneDictamenes paso 4';
                    logger.info(etiquetaLOG4);
             
                    if (entrada.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneDictamenes paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdDictamen: datos[i].IdDictamen,
                                Nombre: datos[i].Nombre,
                                Estatus: datos[i].Estatus
                            }

                            dictamenes.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneDictamenes paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let estado = false;
                            if(datos[i].Estatus == true)
                            {
                                estado = true;
                            }
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneDictamenes paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let dictamen = new DictamenesModel({
                                IdDictamen: datos[i].IdDictamen,
                                Nombre: datos[i].Nombre,
//                                Estatus: datos[i].Estatus
                                Estatus: estado 
                            });
                            dictamenes.push(dictamen);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        dictamenes
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        dictamenes: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneDictamenes paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener los dictamenes: ${err}`);
    });
}

/* ********** Obtiene un dictamen ********** */

function obtieneDictamenId(dictamen) {

    let etiquetaLOG = ruta + ' FUNCION: obtieneDictamenId' + dictamen;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let dictamenes = [];
        let numReg = 0;

        let etiquetaLOG2 = ruta + ' FUNCION: obtieneDictamenId paso 2';
        logger.info(etiquetaLOG2);
        
        BdConsultaCatDictamenId(dictamen)
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneDictamenId paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneDictamenId paso 4';
                    logger.info(etiquetaLOG4);
             
                    if (dictamen.TipoConsulta == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneDictamenId paso 4L' + datos[i].Nombre;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdDictamen: datos[i].IdDictamen,
                                Nombre: datos[i].Nombre,
                                Estatus: datos[i].Estatus
                            }

                            dictamenes.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneDictamenId paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneDictamenId paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let dictamen = new DictamenesModel({
                                IdDictamen: datos[i].IdDictamen,
                                Nombre: datos[i].Nombre,
                                Estatus: datos[i].Estatus
                            });
                            dictamenes.push(dictamen);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        dictamenes
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        dictamenes: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneDictamenId paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el dictamen: ${err}`);
    });
}

/* ********** Obtiene la lista de perfiles ********** */

function obtienePerfiles2() {

    let etiquetaLOG = ruta + ' FUNCION: obtienePerfiles' ;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let perfiles = [];
        let numReg = 0;
        let etiquetaLOG2 = ruta + ' FUNCION: obtienePerfiles paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaPerfiles()
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtienePerfiles paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtienePerfiles paso 4';
                    logger.info(etiquetaLOG4);
             
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let estado = false;
                            let etiquetaLOG5L = ruta + ' FUNCION: obtienePerfiles paso 5L : ' + datos[i].Descripcion;
                            logger.info(etiquetaLOG5L);
                            let perfil = new PerfilesModel({
                                IdPerfil:      datos[i].IdPerfil,
                                Descripcion:   datos[i].Descripcion,
                                FechaRegistro: datos[i].FechaRegistro,
                                Estatus:       datos[i].Estatus
                            });
                            perfiles.push(perfil);
                        }

                        resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        dictamenes
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        dictamenes: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtienePerfiles paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener los perfiles: ${err}`);
    });
}

function obtienePerfiles() {

    let etiquetaLOG = ruta + ' FUNCION: obtienePerfiles';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let perfiles = [];
        let numReg = 0;
        let entrada = 'consulta'
        let etiquetaLOG2 = ruta + ' FUNCION: obtienePerfiles paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaPerfiles()
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtienePerfiles paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtienePerfiles paso 4';
                    logger.info(etiquetaLOG4);
             
                    if (entrada == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtienePerfiles paso 4L' ;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdPerfil:      datos[i].IdPerfil,
                                Descripcion:   datos[i].Descripcion,
                                FechaRegistro: datos[i].FechaRegistro,
                                Estatus:       datos[i].Estatus
                            }

                            dictamenes.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtienePerfiles paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtienePerfiles paso 5L : ' + datos[i].Descripcion;
                            logger.info(etiquetaLOG5L);
                            let perfil = new PerfilesModel({
                                IdPerfil:     datos[i].IdPerfil,
                                Descripcion:  datos[i].Descripcion,
                                FechaRegistro:datos[i].FechaRegistro,
                                Estatus:      datos[i].Estatus
                            });
                            perfiles.push(perfil);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        perfiles
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        perfiles: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtienePerfiles paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener los perfiles: ${err}`);
    });
}

function obtieneEntidades() {

    let etiquetaLOG = ruta + ' FUNCION: obtieneEntidades';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let entidades = [];
        let numReg = 0;
        let entrada = 'consulta'
        let etiquetaLOG2 = ruta + ' FUNCION: obtieneEntidades paso 2';
        logger.info(etiquetaLOG2);
    
        BdConsultaEntidadesFed()
            .then(function(rows) {

                let etiquetaLOG3 = ruta + ' FUNCION: obtieneEntidades paso 3';
                logger.info(etiquetaLOG3);
                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    let etiquetaLOG4 = ruta + ' FUNCION: obtieneEntidades paso 4';
                    logger.info(etiquetaLOG4);
             
                    if (entrada == 'Lista') {
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG4L = ruta + ' FUNCION: obtieneEntidades paso 4L' ;
                            logger.info(etiquetaLOG4L);
                            var elemento = {
                                IdEntidadFederal:   datos[i].IdEntidadFederal,
                                Nombre:             datos[i].Nombre,
                                Abreviacion:        datos[i].Abreviacion
                            }

                            dictamenes.push(elemento);
                        }
                    } else {
                        let etiquetaLOG5 = ruta + ' FUNCION: obtieneEntidades paso 5';
                        logger.info(etiquetaLOG5);
        
                        for (var i = 0, l = datos.length; i < l; i++) {
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneEntidades paso 5L : ' + datos[i].Nombre;
                            logger.info(etiquetaLOG5L);
                            let entidad = new EntidadesModel({
                                IdEntidadFederal:   datos[i].IdEntidadFederal,
                                Nombre:             datos[i].Nombre,
                                Abreviacion:        datos[i].Abreviacion
                            });
                            entidades.push(entidad);

                        }
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        entidades
                    }

                } else {

                    resul = {
                        estatus: true,
                        mensaje: 'No se encontró información',
                        entidades: []
                    }

                }
                resolve(resul);

            }).catch((err) => setImmediate(() => {
                let etiquetaLOG99 = ruta + ' FUNCION: obtieneEntidades paso 99';
                logger.info(etiquetaLOG99);

                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener las entidades: ${err}`);
    });
}
/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/



function BdAltaUsuario(Usuario) {

    let etiquetaLOG = `${ ruta }[Estatus: ${ Usuario.IdUsuario }] METODO: BdAltaUsuario `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spAltaUsuario('${Usuario.IdUsuario}',
                                            '${Usuario.Nombre}',
                                            '${Usuario.Contrasenia}',
                                            '${Usuario.IdEmpleado}',
                                            '${Usuario.IdPerfil}',
                                            '${Usuario.FechaRegistro}',
                                            '${Usuario.Estatus}',
                                            '${Usuario.email}',
                                            '${Usuario.Bloqueado}',
                                            '${Usuario.Intentos}',
                                            '${Usuario.UltimaTransaccion}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en spAltaUsuario: ${err}`);
    });

}

function BdModificaUsuario(Usuario) {

    let etiquetaLOG = `${ ruta }[Estatus: ${ Usuario.IdUsuario }] METODO: BdModificaUsuario `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spModificacionUsuario('${Usuario.IdUsuario}',
                                            '${Usuario.Nombre}',
                                            '${Usuario.Contrasenia}',
                                            '${Usuario.IdEmpleado}',
                                            '${Usuario.IdPerfil}',
                                            '${Usuario.FechaRegistro}',
                                            '${Usuario.Estatus}',
                                            '${Usuario.email}',
                                            '${Usuario.Bloqueado}',
                                            '${Usuario.Intentos}',
                                            '${Usuario.UltimaTransaccion}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdModificaUsuario: ${err}`);
    });

}


function BdUsuarioDesbloquea(Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario.IdUsuario }] METODO: BdUsuarioDesbloquea `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spUsuarioDesbloquea('${Usuario.IdUsuario}','${Usuario.Bloqueado}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en spUsuarioDesbloquea: ${err}`);
    });

}


function BdActualizaCatDictamenes(Dictamen) {

    let etiquetaLOG = `${ ruta }[Estatus: ${ Dictamen.Estatus }] METODO: BdConsultaDictamenes `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spCambiaEstadoDictamen('${Dictamen.IdDictamen}','${Dictamen.Estatus}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en spCambiaEstadoDictamen: ${err}`);
    });

}

function BdConsultaCatDictamenes(Estatus) {

    let etiquetaLOG = `${ ruta }[Estatus: ${ Estatus }] METODO: BdConsultaDictamenes `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaCatDictamenes('${Estatus}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en spConsultaCatDictamenes: ${err}`);
    });

}

function BdConsultaCatDictamenId(Dictamen) {

    let etiquetaLOG = `${ ruta }[Dictamen: ${ Dictamen }] METODO: BdConsultaCatDictamenId `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaCatDictamenIdDictamen('${Dictamen}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaCatDictamenId: ${err}`);
    });

}


function BdConsultaUsuarios(Estatus) {

    let etiquetaLOG = `${ ruta }[Estatus: ${ Estatus }] METODO: BdConsultaUsuarios `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaUsuarios('${Estatus}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaUsuarios: ${err}`);
    });

}


function BdConsultaUsuario(IdUsuario) {

    let etiquetaLOG = `${ ruta }[IdUsuario: ${ IdUsuario }] METODO: BdConsultaUsuarios `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaUsuario('${IdUsuario}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaUsuarios: ${err}`);
    });

}

function BdConsultaPerfiles() {

    let etiquetaLOG = `${ ruta }[] METODO: BdConsultaPerfiles `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaPerfiles()`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaPerfiles: ${err}`);
    });

}

function BdConsultaEntidadesFed() {

    let etiquetaLOG = `${ ruta }[] METODO: BdConsultaEntidadesFed `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL SPConsultaListaEntidad()`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaEntidadesFed: ${err}`);
    });

}
function BdConsultaEntidadFed(entrada) {

    let etiquetaLOG = `${ ruta }[] METODO: BdConsultaEntidadFed `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaClaveEntidadFed(entrada.IdEntidadFederativa)`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaEntidadFed: ${err}`);
    });

}

function BdConsultaHGas(HGas) {

    let etiquetaLOG = `${ ruta }[IdUsuario: ${ HGas }] METODO: BdConsultaHGas `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaHGas('${HGas.FechaDesde}','${HGas.FechaHasta}','${HGas.IdEntidadFederal}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaHGas: ${err}`);
    });

}

function BdConsultaHGasolina(HGasolina) {

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaHGasolina('${HGasolina.FechaDesde}','${HGasolina.FechaHasta}','${HGasolina.IdEntidadFederal}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaHGasolina: ${err}`);
    });

}

function BdConsultaFormalizados(entrada) {

    let etiquetaLOG = `${ ruta }[] METODO: BdConsultaFormalizados `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaFormalizados('${entrada.IdEmpresa}')`;

        logger.info('query_str');
        logger.info(query_str);

        con.query(query_str, function(err, rows, fields) {

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
        throw (`Se presentó un error en BdConsultaFormalizados: ${err}`);
    });

}

module.exports = { obtienePerfiles,
                   obtieneUsuarios,
                   consultaUsuario,
                   obtieneDictamenes,
                   obtieneDictamenId,
                   BdUsuarioDesbloquea,
                   BdActualizaCatDictamenes,
                   BdAltaUsuario,
                   BdModificaUsuario,
                   obtieneEntidades,
                   obtieneHGas,
                   obtieneHGasolina,
                   obtieneFormalizados}
