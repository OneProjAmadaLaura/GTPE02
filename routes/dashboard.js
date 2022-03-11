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
app.get('/dashboard-preregistro', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: dashboard-preregistro';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        dashboard.consultaCitasXTipoVehiculo()
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