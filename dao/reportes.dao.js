const express = require('express');

const app = express();

const logger = require('../log/log');

const { Reporte1Model } = require('../models/reportes.model');

const utils = require('../utils/utils');
const ruta = ' [reportes.dao.js] ';

/* ********** obtieneReporte1 -----  Situación Actual Concesionarios ********** */
function obtieneReporte1(entrada) {
    // Situación Actual Concesionarios
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporte1';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporte1(entrada.IdSindicato, entrada.IdUsuario)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporte = new Reporte1Model({
                            IdPersona: datos[i].IdPersona,
                            Concesionario: datos[i].Concesionario,
                            Marca: datos[i].Marca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            VIN: datos[i].VIN,
                            Placa: datos[i].Placa,
                            Sindicato: datos[i].Sindicato,
                            PorcAhorroConcesion: datos[i].PorcAhorroConcesion,
                            PorcAhorroPropietario: datos[i].PorcAhorroPropietario,
                            PorcAhorroOperador: datos[i].PorcAhorroOperador,
                            FechaInicio: datos[i].FechaInicio,
                            FechaTermino: datos[i].FechaTermino,
                            TotalLitrosConsumir: datos[i].TotalLitrosConsumir,
                            TotalLitrosMes: datos[i].TotalLitrosMes,
                            LitrosConsumidos: datos[i].LitrosConsumidos,
                            LitrosXConsumir: datos[i].LitrosXConsumir,
                            ImporteBeneficiosConversion: datos[i].ImporteBeneficiosConversion,
                            TotalAhorro: datos[i].TotalAhorro,
                            TotalUtilizadoAhorro: datos[i].TotalUtilizadoAhorro,
                            TotalAhorroRestante: datos[i].TotalAhorroRestante
                        });
                        datosReporte.push(datReporte);
                    }

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        reporte: datosReporte
                    }

                } else {

                    resul = {
                        estatus: false,
                        mensaje: 'No se encontró información',
                        reporte: [],
                        codigo: codRespuesta.noDatos
                    }

                }
                resolve(resul);


            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el reporte: ${err}`);
    });
}

/* ********** Reporte -- Vehículos Convertidos  ********** */
function repVehiculosConvertidos(entrada) {
    // Situación Actual Concesionarios
    let etiquetaLOG = ruta + ' FUNCION: repVehiculosConvertidos';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdRepVehiculosConvertidos(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                datosReporte = JSON.parse(resultado);
                numReg = datosReporte.length;

                if (numReg > 0) {

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        reporte: datosReporte
                    }
                } else {
                    resul = {
                        estatus: false,
                        mensaje: 'No se encontró información',
                        reporte: []
                    }

                }
                resolve(resul);


            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el reporte: ${err}`);
    });
}

/* ********** Reporte -- Vehículos Sin concluir contrato e instalación  ********** */
function repVehiculosSinConcluir(entrada) {
    // Situación Actual Concesionarios
    let etiquetaLOG = ruta + ' FUNCION: repVehiculosSinConcluir';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdRepVehiculosSinConcluir(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                datosReporte = JSON.parse(resultado);
                numReg = datosReporte.length;

                if (numReg > 0) {

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        reporte: datosReporte
                    }
                } else {
                    resul = {
                        estatus: false,
                        mensaje: 'No se encontró información',
                        reporte: []
                    }

                }
                resolve(resul);


            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el reporte: ${err}`);
    });
}

/* ********** Reporte -- Ahorro de Concesionario o Propietario por perido  ********** */
function repAhorroPeriodo(entrada) {
    // Situación Actual Concesionarios
    let etiquetaLOG = ruta + ' FUNCION: repAhorroPeriodo';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdRepAhorroPeriodo(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                datosReporte = JSON.parse(resultado);
                numReg = datosReporte.length;

                if (numReg > 0) {

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        reporte: datosReporte
                    }
                } else {
                    resul = {
                        estatus: false,
                        mensaje: 'No se encontró información',
                        reporte: []
                    }

                }
                resolve(resul);


            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el reporte: ${err}`);
    });
}

/* ********** Reporte -- Ahorro de Concesionario o Propietario por perido  ********** */
function repVehiculosNoConsumen(entrada) {
    // Situación Actual Concesionarios
    let etiquetaLOG = ruta + ' FUNCION: repVehiculosNoConsumen';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdRepVehiculosNoConsumen(entrada)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                datosReporte = JSON.parse(resultado);
                numReg = datosReporte.length;

                if (numReg > 0) {

                    resul = {
                        estatus: true,
                        mensaje: 'Consulta exitosa',
                        reporte: datosReporte
                    }
                } else {
                    resul = {
                        estatus: false,
                        mensaje: 'No se encontró información',
                        reporte: []
                    }

                }
                resolve(resul);


            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al obtener el reporte: ${err}`);
    });
}


/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/

function BdConsultaReporte1(Sindicato, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaReporte1 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaSituacionActualXSindicato(${Sindicato})`;

        // logger.info(query_str);

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
        throw (`Se presentó un error en BdConsultaReporte1: ${err}`);
    });

}

/****************************************************************/

function BdRepVehiculosConvertidos(Parametro) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Parametro.IdUsuario }] METODO: BdRepVehiculosConvertidos `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let query_str = '';

        query_str = `CALL spReporteVehiculosConvertidos( 
        ${utils.paramSP(Parametro.TipoVehiculo,'S')},  
        ${utils.paramSP(Parametro.FechaInicio,'S')},  
        ${utils.paramSP(Parametro.FechaFin,'S')}
        )`;

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        // logger.info(query_str);

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
        throw (`Se presentó un error en BdRepVehiculosConvertidos: ${err}`);
    });

}

/****************************************************************/

function BdRepVehiculosSinConcluir(Parametro) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Parametro.IdUsuario }] METODO: BdRepVehiculosSinConcluir `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let query_str = '';

        query_str = `CALL spReporteUnidadesSinConcluir( )`;

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

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
        throw (`Se presentó un error en BdRepVehiculosSinConcluir: ${err}`);
    });

}

/****************************************************************/

function BdRepAhorroPeriodo(Parametro) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Parametro.IdUsuario }] METODO: BdRepAhorroPeriodo `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let query_str = '';

        query_str = `CALL spReporteAhorroPeriodo( ${utils.paramSP(Parametro.TipoPersona,'S')},  ${utils.paramSP(Parametro.IdSindicato,'N')})`;

        logger.info('query_str');
        logger.info(query_str);

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

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
        throw (`Se presentó un error en BdRepAhorroPeriodo: ${err}`);
    });

}

/****************************************************************/

function BdRepVehiculosNoConsumen(Parametro) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Parametro.IdUsuario }] METODO: BdRepVehiculosNoConsumen `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let query_str = '';

        query_str = `CALL spReporteUnidadesSinConsumir( ${utils.paramSP(Parametro.IdSindicato,'N')})`;

        logger.info('query_str');
        logger.info(query_str);

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

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
        throw (`Se presentó un error en BdRepVehiculosNoConsumen: ${err}`);
    });

}

/****************************************************************/

module.exports = {
    obtieneReporte1,
    repVehiculosConvertidos,
    repVehiculosSinConcluir,
    repAhorroPeriodo,
    repVehiculosNoConsumen
};