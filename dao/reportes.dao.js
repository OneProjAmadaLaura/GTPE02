const express = require('express');

const app = express();

const logger = require('../log/log');

const { Reporte1Model, ReporteR01Model, ReporteR02Model } = require('../models/reportes.model');
const { ReporteR03Model, ReporteR04Model, ReporteR05Model } = require('../models/reportes.model');
const { ReporteR06Model } = require('../models/reportes.model');

const utils = require('../utils/utils');
const ruta = ' [reportes.dao.js] ';

/* ********** obtieneReporte1 -----  Situación Actual Concesionarios ********** */
function obtieneReporte1(entrada) {
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

/* ********** Reporte -- Vehículos que no consumen lo acordado en el contrato  ********** */
function repVehiculosNoConsumen(entrada) {

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

/* ********** Reporte -- Ventas, recaudación y ahorros por un periodo determinado  ********** */
function repVentasRecauda(entrada) {
    // 
    let etiquetaLOG = ruta + ' FUNCION: repVentasRecauda';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdRepVentasRecauda(entrada)
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

/* ********** obtieneReporteR01 -----  Reporte Resumen Consumo Estaciones ********** */
function obtieneReporteR01(FechaIni,FechaFin) {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR01:(' + FechaIni + ') FF: (' + FechaFin +')';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR01(FechaIni, FechaFin)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR01 = new ReporteR01Model({
                            Empresa: datos[i].Empresa,
                            Estacion: datos[i].Estacion,
                            Periodo: datos[i].Periodo,
                            TotalMovimientos: datos[i].TotalMovimientos,
                            Litros: datos[i].Litros,
                            ImporteCobrado: datos[i].ImporteCobrado
                        });
                        datosReporte.push(datReporteR01);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR01): ${err}`);
    });
}


/* ********** obtieneReporteR02 -----  Reporte Contratos sin cita instalacion ********** */
function obtieneReporteR02() {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR02 ';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR02()
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR02 = new ReporteR02Model({
                            IdConcesionario: datos[i].IdConcesionario,
                            Concesionario: datos[i].Concesionario,
                            Marca: datos[i].Marca,
                            Submarca: datos[i].Submarca,
                            Modelo: datos[i].Modelo,
                            VIN: datos[i].VIN,
                            Placa: datos[i].Placa,
                            Sindicato: datos[i].Sindicato,
                            FechaContrato: datos[i].FechaContrato,
                            DiasTranscurridos: datos[i].DiasTranscurridos,
                            Aviso: datos[i].Aviso
                        });
                        datosReporte.push(datReporteR02);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR02): ${err}`);
    });
}

/* ********** obtieneReporteR03 -----  Reporte Analisis Situaciones Citas ********** */
function obtieneReporteR03(FechaIni,FechaFin) {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR03:(' + FechaIni + ') FF: (' + FechaFin +')';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR03(FechaIni, FechaFin)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR03 = new ReporteR03Model({
                            Fecha: datos[i].Fecha,
                            Registros: datos[i].Registros,
                            Alerta: datos[i].Alerta
                        });
                        datosReporte.push(datReporteR03);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR03): ${err}`);
    });
}

/* ********** obtieneReporteR04-----  Consumo litros completos con aportación del Ahorro ********** */
function obtieneReporteR04(Fecha) {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR04:(' + Fecha +')';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR04(Fecha)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR04 = new ReporteR04Model({
                            Concesionario: datos[i].Concesionario,
                            Marca: datos[i].Marca,
                            Modelo: datos[i].Modelo,
                            Serie: datos[i].Serie,
                            Placa: datos[i].Placa,
                            Sindicato: datos[i].Sindicato,
                            PorcAhorroConcesion: datos[i].PorcAhorroConcesion,
                            PorcAhorroPropietario: datos[i].PorcAhorroPropietario,
                            FechaInicio: datos[i].FechaInicio,
                            FechaCorte: datos[i].FechaCorte,
                            ConsumoMes: datos[i].ConsumoMes,
                            ConsumoTotal: datos[i].ConsumoTotal,
                            AhorroUtilizado: datos[i].AhorroUtilizado
                        });
                        datosReporte.push(datReporteR04);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR04): ${err}`);
    });
}


/* ********** obtieneReporteR05-----  Consumo litros incompletos ********** */
function obtieneReporteR05(Fecha) {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR05:(' + Fecha +')';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR05(Fecha)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR05 = new ReporteR05Model({
                            Concesionario: datos[i].Concesionario,
                            Marca: datos[i].Marca,
                            Modelo: datos[i].Modelo,
                            Serie: datos[i].Serie,
                            Placa: datos[i].Placa,
                            Sindicato: datos[i].Sindicato,
                            PorcAhorroConcesion: datos[i].PorcAhorroConcesion,
                            PorcAhorroPropietario: datos[i].PorcAhorroPropietario,
                            FechaInicio: datos[i].FechaInicio,
                            FechaCorte: datos[i].FechaCorte,
                            ConsumoMes: datos[i].ConsumoMes,
                            ConsumoTotal: datos[i].ConsumoTotal,
                            AhorroUtilizado: datos[i].AhorroUtilizado,
                            LitrosPendientes: datos[i].LitrosPendientes
                        });
                        datosReporte.push(datReporteR05);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR05): ${err}`);
    });
}


/* ********** obtieneReporteR06-----  Beneficio Salud ********** */
function obtieneReporteR06(Fecha) {
    
    let etiquetaLOG = ruta + ' FUNCION: obtieneReporteR06:(' + Fecha +')';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let datosReporte = [];
        let numReg = 0;

        BdConsultaReporteR06(Fecha)
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {

                    for (var i = 0, l = datos.length; i < l; i++) {
                        const datReporteR06 = new ReporteR06Model({
                            Concesionario: datos[i].Concesionario,
                            Marca: datos[i].Marca,
                            Modelo: datos[i].Modelo,
                            Serie: datos[i].Serie,
                            Placa: datos[i].Placa,
                            Operador: datos[i].Operador
                        });
                        datosReporte.push(datReporteR06);
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
        throw (`Se presentó un error al obtener el reporte (obtieneReporteR06): ${err}`);
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

function BdRepVentasRecauda(Parametro) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Parametro.IdUsuario }] METODO: BdRepVentasRecauda `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let query_str = '';

        query_str = `CALL spReporteVentasRecauda(${utils.paramSP(Parametro.FechaInicio,'S')}, ${utils.paramSP(Parametro.FechaFin,'S')})`;

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
        throw (`Se presentó un error en BdRepVentasRecauda: ${err}`);
    });

}

function BdConsultaReporteR01(FechaIni, FechaFin) {

    let etiquetaLOG = `${ ruta }[Fecha: ${ FechaIni }] METODO: BdConsultaReporteR01 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteResumenConsumoEstaciones('${FechaIni}','${FechaFin}')`;

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
        throw (`Se presentó un error en BdConsultaReporteR01: ${err}`);
    });

}

function BdConsultaReporteR02() {

    let etiquetaLOG = `${ ruta }[ ] METODO: BdConsultaReporteR01 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteContratosSinCitaInstalacion()`;

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
        throw (`Se presentó un error en BdConsultaReporteR02: ${err}`);
    });

}

function BdConsultaReporteR03(FechaIni, FechaFin) {

    let etiquetaLOG = `${ ruta }[Fecha: ${ FechaIni }] METODO: BdConsultaReporteR03 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteAnalisisSituacionCitas('${FechaIni}','${FechaFin}')`;

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
        throw (`Se presentó un error en BdConsultaReporteR03: ${err}`);
    });

}


function BdConsultaReporteR04(Fecha) {

    let etiquetaLOG = `${ ruta }[Fecha: ${ Fecha }] METODO: BdConsultaReporteR04 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteConsumoLitrosCompletosAportacionHorro('${Fecha}')`;

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
        throw (`Se presentó un error en BdConsultaReporteR04: ${err}`);
    });

}

function BdConsultaReporteR05(Fecha) {

    let etiquetaLOG = `${ ruta }[Fecha: ${ Fecha }] METODO: BdConsultaReporteR05 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteConsumoLitrosIncompletos('${Fecha}')`;

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
        throw (`Se presentó un error en BdConsultaReporteR05: ${err}`);
    });

}


function BdConsultaReporteR06(Fecha) {

    let etiquetaLOG = `${ ruta }[Fecha: ${ Fecha }] METODO: BdConsultaReporteR06 `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spReporteBeneficioSalud('${Fecha}')`;

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
        throw (`Se presentó un error en BdConsultaReporteR06: ${err}`);
    });

}

/****************************************************************/

module.exports = {
    obtieneReporte1,
    repVehiculosConvertidos,
    repVehiculosSinConcluir,
    repAhorroPeriodo,
    repVehiculosNoConsumen,
    repVentasRecauda,
    obtieneReporteR01,
    obtieneReporteR02,
    obtieneReporteR03,
    obtieneReporteR04,
    obtieneReporteR05,
    obtieneReporteR06
};
