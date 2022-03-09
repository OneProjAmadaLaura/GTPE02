const express = require('express');

const app = express();

const logger = require('../log/log');

//const {
//    UsuarioModel
//} = require('../models/usuario.model');

const {
    DictamenesModel
    } = require('../models/catalogos.model');

const ruta = ' [catalogos.dao.js] ';

/* ********** obtieneListaUsuarios ********** */

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
                            let etiquetaLOG5L = ruta + ' FUNCION: obtieneDictamenes paso 5L : ' + datos[i].Nombre;
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



/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/
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

module.exports = { obtieneDictamenes }