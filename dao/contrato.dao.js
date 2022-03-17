const express = require('express');
const { json } = require('express/lib/response');

const logger = require('../log/log');

const { ContratoDatosModel } = require('../models/contrato.model');

const utils = require('../utils/utils');

const ruta = ' [contrato.dao.js] ';


/* ********** Muestra datos para la generación del contrato   ********** */
function consultaDatosContrato(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaDatosContrato';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {
        let mensaje = '';
        let contrato = [];
        let resul = [];

        BdConsultaDatosContrato([entrada.IdVehiculo, entrada.IdUsuario])
            .then(function(rows) {

                let resultado = JSON.stringify(rows);
                let datos = JSON.parse(resultado);

                numReg = datos.length;

                if (numReg > 0) {
                    const contratoDat = new ContratoDatosModel({
                        IdContrato: datos[0].IdContrato,
                        IdTipoConvertidor: datos[0].IdTipoConvertidor,
                        Convertidor: datos[0].Convertidor,
                        ConsumoRequerido: datos[0].ConsumoRequerido,
                        ConsumoMensual: datos[0].ConsumoMensual,
                        NumeroPeriodos: datos[0].NumeroPeriodos,
                        IdTipoVehiculo: datos[0].IdTipoVehiculo,
                        TipoVehiculo: datos[0].TipoVehiculo
                    });

                    logger.info("consultaDatosContrato(): \n"+JSON.stringify(contratoDat));
                    contrato.push(contratoDat);

                    mensaje = 'Consulta exitosa'
                } else {
                    mensaje = 'No se encontró información'
                }

                resul = {
                    estatus: true,
                    mensaje,
                    contrato
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar los datos del contrato: ${err}`);
    });
}

/* ********** Registra información de instalación ********** */
function registraInstalacion(entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${entrada.IdUsuario}] FUNCION: registraInstalacion `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];

        let estatus = false;
        let mensaje = '';
        let mensajeDet = '';

        BdRegistraInstalacion(entrada)
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
        throw (`Se presentó un error al registrar la fecha de instalación: ${err}`);
    });
}

function informacionDocumentoContrato(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: informacionDocumentoContrato' ;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let numReg = 0;
        
        
        BDInformacionDocumentoContrato(entrada.IdContrato, entrada.IdUsuario)
            .then(function(rows) {

                let data = JSON.stringify(rows);
                let datos = JSON.parse(data);
                numReg = datos.length;
                let msg= (datos.length>0 ?  "Consulta extosa "   : "No hay datos") ;
                
                resul = {
                    estatus: true,
                    mensaje: msg,
                    elementos: numReg,
                    datos
                }

                resolve(resul);

            }).catch((err) => setImmediate(() => {
                return reject(err);
            }));

    })

    .catch((err) => {
        logger.error(err);
        throw (`Se presentó un error al consultar información para elaborar el Documento "Contrato" : ${err}`);
    });
}


/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/
function BdConsultaDatosContrato(IdVehiculo, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BdConsultaDatosContrato `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spContratoRegistroConsulta(${IdVehiculo})`;

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
        throw (`Se presentó un error en BdConsultaDatosContrato: ${err}`);
    });

}

/****************************************************************/
function BdRegistraInstalacion(entrada) {

    let etiquetaLOG = `${ ruta }[Usuario: ${entrada.IdUsuario}] METODO: BdRegistraInstalacion `;
    logger.info(etiquetaLOG);

    let query_str = '';

    query_str = `CALL spConvertidorInstalacion(
        ${utils.paramSP(entrada.IdVehiculo,'N')},
        ${utils.paramSP(entrada.IdConcesionario,'N')},
        ${utils.paramSP(entrada.FechaInstalacion,'S')},
        ${utils.paramSP(entrada.IdUsuario,'S')}
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

        throw (`Se presentó un error en BdRegistraInstalacion: ${err}`);
    });


}

/****************************************************************/
/*                           OMDA                               */
function BDInformacionDocumentoContrato( IdContrato, Usuario) {

    let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: BDInformacionDocumentoContrato `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spConsultaInfContrato(${IdContrato})`;

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
        throw (`Se presentó un error en BDInformacionDocumentoContrato: ${err}`);
    });
}

module.exports = {
    consultaDatosContrato,
    registraInstalacion,
    informacionDocumentoContrato
};