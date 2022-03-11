const express = require('express');
const Logger = require('nodemon/lib/utils/log');

const logger = require('../log/log');    //PREGUNTAR cuál de las 2 es la buena

//const { CitaModel, CitaIdModel } = require('../models/cita.model');

const utils = require('../utils/utils');

const ruta = ' [dashboard.dao.js] ';


/* ********** Consulta las Disponibilidad    ********** */
function consultaCitasXTipoVehiculo() {
    let etiquetaLOG = ruta + ' FUNCION: consultaCitasXTipoVehiculo';
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        let resul = [];
        let numReg = 0;

        BdConsultaDasboardPreregistro()
            .then(function(rows) {

                let data = JSON.stringify(rows);
                let datos = JSON.parse(data);
                numReg = datos.length;
                let msg= (datos.length>0 ? datos.length + "Consulta extosa" : "No hay datos") ;
                
                resul = {
                    estatus: true,
                    mensaje: 'Consulta exitosa',
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
function BdConsultaDasboardPreregistro() {

    //let etiquetaLOG = `${ ruta }[Usuario: ${ Usuario }] METODO: function BdConsultaDasboardPreregistro() {
    let etiquetaLOG = `${ ruta }[Usuario: ] METODO: function BdConsultaDasboardPreregistro() {
        `;
    logger.info(etiquetaLOG);

    return new Promise(function(resolve, reject) {

        const mysql = require('mysql2');

        const con = mysql.createConnection(configBD);

        var query_str = `CALL spDashPreregistro(1)`;

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
        throw (`Se presentó un error en BdConsultaDasboardPreregistro: ${err}`);
    });

}
/****************************************************************/



module.exports = {
    consultaCitasXTipoVehiculo
};