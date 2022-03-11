const express = require('express');
const Logger = require('nodemon/lib/utils/log');

const logger = require('../log/log');    //PREGUNTAR cuál de las 2 es la buena

//const { CitaModel, CitaIdModel } = require('../models/cita.model');

const utils = require('../utils/utils');

const ruta = ' [dashboard.dao.js] ';


/* ********** Consulta las Disponibilidad    ********** */
function consultaElementoDashboard(entrada) {
    let etiquetaLOG = ruta + ' FUNCION: consultaElementoDashboard' ;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let numReg = 0;
        
        
        BdConsultaElementoDasboard(entrada)
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
        throw (`Se presentó un error al consultar información de Pre-registro : ${err}`);
    });
}



/****************************************************************/
/**************    B A S E     D E    D A T O S    **************/
/****************************************************************/
function BdConsultaElementoDasboard(IdConsulta) {

    //let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: function BdConsultaElementoDasboard() {
    let etiquetaLOG = `${ ruta }[Usuario: ] METODO: function BdConsultaElementoDasboard(${IdConsulta}) {
        `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spDashPreregistro(${IdConsulta})`;
        
        logger.info(query_str);

        con.query(query_str, function(err, rows) {

            if (err) {
                if (err.message != 'connect ETIMEDOUT')
                    con.end();

                return reject(err);
            }

            con.end();
            resolve(rows);
        });
    })

    .catch((err) => {
        throw (`Se presentó un error en BdConsultaElementoDasboard: ${err}`);
    });

}
/****************************************************************/



module.exports = {
    consultaElementoDashboard
};