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
 * Reporte -- Vehículos sin consumir cantidad de gas acordado  -- spReporteUnidadesSinConsumir
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

/****************************************************************************
 * Reporte -- Ventas, recaudación y ahorros por un periodo determinado -- spReporteVentasRecauda
 ****************************************************************************/
app.get('/reporte-ventas-recauda', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-ventas-recauda';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const parametrosModel = new ParametrosModel({
            IdUsuario: pUsuarioOperacion || '',
            FechaInicio: req.query.FechaInicio || '',
            FechaFin: req.query.FechaFin || ''
        });

        if (parametrosModel.FechaInicio == '' || parametrosModel.FechaFin == '') {
            mensaje = 'Debe indicar el rango de fechas.';
            logger.info(ruta + 'Atención: ' + mensaje);
            res.json({
                estatus: false,
                mensaje
            });
        } else {

            reportes.repVentasRecauda(parametrosModel)
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
 * Reporte R01 --Reporte Resumen Consumo Estaciones
 ****************************************************************************/
 app.get('/reporte-consumo-estaciones', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-consumo-estaciones';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR01(req.query.FechaIni, req.query.FechaFin)
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
 * Reporte R02 --Reporte Contratos sin cita instalacion
 ****************************************************************************/
 app.get('/reporte-contratos-sin-cita', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: reporte-contratos-sin-cita';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR02()
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
 * Reporte R03 --Reporte Analisis Situaciones Citas
 ****************************************************************************/
 app.get('/reporte-analisis-sit-citas', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Reporte Analisis Situaciones Citas';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR03(req.query.FechaIni, req.query.FechaFin)
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
 * Reporte R04 --Consumo litros completos con aportación del Ahorro
 ****************************************************************************/
 app.get('/reporte-consumo-lt-ahorro', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Consumo litros completos con aportación del Ahorro';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR04(req.query.Fecha)
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
 * Reporte R05 --Consumo litros incompletos
 ****************************************************************************/
 app.get('/reporte-consumo-lt-incompletos', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Consumo litros incompletos';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR05(req.query.Fecha)
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
 * Reporte R06 --Beneficio Salud
 ****************************************************************************/
 app.get('/reporte-beneficio-salud', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Beneficio Salud';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        reportes.obtieneReporteR06(req.query.Fecha)
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

module.exports = app;
