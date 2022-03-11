const express = require('express');
const app = express();

const logger = require('../log/log');

const { verificaToken } = require('../middleware/autenticacion');

const { ParametrosModel } = require('../models/parametros.model');
const dashboard = require('../dao/dashboard.dao');

const ruta = ' [dashboard.js] ';

/****************************************************************************
 * Reporte 1 --Situación Actual Concesionarios
 ****************************************************************************/
app.get('/dashboard', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: dashboard';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        //console.log(JSON.stringify(req.body));
        //console.log(JSON.stringify(req.params));
        console.log("Request qry: " + req.query.IdConsulta);
        console.log("Request param: " + req.params.IdConsulta);

        let mensaje = '';
        let ok = false;

        dashboard.consultaElementoDashboard(req.query.IdConsulta)
            .then(result => {
                let resultado = JSON.stringify(result);
                let usuarioDat = JSON.parse(resultado);

                ok = usuarioDat.estatus;
                mensaje = usuarioDat.mensaje;

                if (ok) {

                    res.json({
                        estatus: true,
                        mensaje,
                        datos: usuarioDat.datos
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje
                    });
                }

            }, (err) => {

                logger.error(ruta + 'ERROR: ' + err);
                res.json({
                    estatus: false,
                    mensaje: err
                });

            })

    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

module.exports = app;