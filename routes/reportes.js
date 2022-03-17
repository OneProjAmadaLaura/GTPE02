const express = require('express');
const app = express();

const logger = require('../log/log');

const { verificaToken } = require('../middleware/autenticacion');

const { ParametrosModel } = require('../models/parametros.model');
const reportes = require('../dao/reportes.dao');

const ruta = ' [reportes.js] ';

/****************************************************************************
 * Reporte 1 --Situación Actual Concesionarios
 ****************************************************************************/
app.get('/reporte-situacion-vehiculo', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-situacion-vehiculo';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || '',
            IdSindicato: req.query.IdSindicato || 0
        });

        reportes.obtieneReporte1(parametrosModel)
            .then(result => {
                let resultado = JSON.stringify(result);
                let usuarioDat = JSON.parse(resultado);

                ok = usuarioDat.estatus;
                mensaje = usuarioDat.mensaje;

                if (ok) {

                    res.json({
                        estatus: true,
                        mensaje,
                        reporte: usuarioDat.reporte
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

/****************************************************************************
 * Reporte -- Vehículos Convertidos  --spReporteVehiculosConvertidos
 ****************************************************************************/
app.get('/reporte-vehiculos-convertidos', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-vehiculos-convertidos';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || '',
            TipoVehiculo: req.query.TipoVehiculo || '',
            FechaInicio: req.query.FechaInicio || '',
            FechaFin: req.query.FechaFin || ''
        });

        if (parametrosModel.TipoVehiculo == '') {
            mensaje = 'El tipo de vehículo e requerido.';
            logger.info(ruta + 'Atención: ' + mensaje);
            res.json({
                estatus: false,
                mensaje
            });
        } else {

            reportes.repVehiculosConvertidos(parametrosModel)
                .then(result => {
                    let resultado = JSON.stringify(result);
                    let usuarioDat = JSON.parse(resultado);

                    ok = usuarioDat.estatus;
                    mensaje = usuarioDat.mensaje;

                    if (ok) {

                        res.json({
                            estatus: true,
                            mensaje,
                            reporte: usuarioDat.reporte
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            estatus: false,
                            mensaje,
                            reporte: []
                        });
                    }

                }, (err) => {

                    logger.error(ruta + 'ERROR: ' + err);
                    res.json({
                        estatus: false,
                        mensaje: err
                    });

                })
        }

    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

/****************************************************************************
 * Reporte -- Vehículos Sin concluir contrato e instalación  -- spReporteUnidadesSinConcluir
 ****************************************************************************/
app.get('/reporte-vehiculos-sinconcluir', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-vehiculos-sinconcluir';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || ''

        });

        reportes.repVehiculosSinConcluir(parametrosModel)
            .then(result => {
                let resultado = JSON.stringify(result);
                let usuarioDat = JSON.parse(resultado);

                ok = usuarioDat.estatus;
                mensaje = usuarioDat.mensaje;

                if (ok) {

                    res.json({
                        estatus: true,
                        mensaje,
                        reporte: usuarioDat.reporte
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        reporte: []
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

/****************************************************************************
 * Reporte -- Ahorro de Concesionario o Propietario por perido  -- spReporteAhorroPeriodo
 ****************************************************************************/
app.get('/reporte-ahorro-periodo', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-ahorro-periodo';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        logger.info('req.query.TipoPersona');
        logger.info(req.query.TipoPersona);

        logger.info('req.query.IdSindicato');
        logger.info(req.query.IdSindicato);

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || '',
            TipoPersona: req.query.TipoPersona || '',
            IdSindicato: req.query.IdSindicato || 0
        });



        if (parametrosModel.TipoPersona == '') {
            mensaje = 'Debe indicar Tipo de persona (Concesionario o Propietario).';
            logger.info(ruta + 'Atención: ' + mensaje);
            res.json({
                estatus: false,
                mensaje
            });
        } else {

            reportes.repAhorroPeriodo(parametrosModel)
                .then(result => {
                    let resultado = JSON.stringify(result);
                    let usuarioDat = JSON.parse(resultado);

                    ok = usuarioDat.estatus;
                    mensaje = usuarioDat.mensaje;

                    if (ok) {

                        res.json({
                            estatus: true,
                            mensaje,
                            reporte: usuarioDat.reporte
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            estatus: false,
                            mensaje,
                            reporte: []
                        });
                    }

                }, (err) => {

                    logger.error(ruta + 'ERROR: ' + err);
                    res.json({
                        estatus: false,
                        mensaje: err
                    });

                })

        }
    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

/****************************************************************************
 * Reporte -- vehículos sin consumir cantidad de gas acordado  -- spReporteUnidadesSinConsumir
 ****************************************************************************/
app.get('/reporte-vehiculos-noconsumen', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-vehiculos-noconsumen';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || '',
            IdSindicato: req.query.IdSindicato || 0
        });

        if (parametrosModel.IdSindicato == 0) {
            mensaje = 'Debe indicar el Sindicato.';
            logger.info(ruta + 'Atención: ' + mensaje);
            res.json({
                estatus: false,
                mensaje
            });
        } else {

            reportes.repVehiculosNoConsumen(parametrosModel)
                .then(result => {
                    let resultado = JSON.stringify(result);
                    let usuarioDat = JSON.parse(resultado);

                    ok = usuarioDat.estatus;
                    mensaje = usuarioDat.mensaje;

                    if (ok) {

                        res.json({
                            estatus: true,
                            mensaje,
                            reporte: usuarioDat.reporte
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            estatus: false,
                            mensaje,
                            reporte: []
                        });
                    }

                }, (err) => {

                    logger.error(ruta + 'ERROR: ' + err);
                    res.json({
                        estatus: false,
                        mensaje: err
                    });

                })

        }
    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

module.exports = app;