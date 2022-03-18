const express = require('express');
const app = express();

const logger = require('../log/log');
const { DictamenesModel } = require('../models/catalogos.model');
const { UsuarioFullModel } = require('../models/usuario.model');
const { PerfilesModel } = require('../models/catalogos.model');
const { EntidadesModel } = require('../models/catalogos.model');
const { HGasModel,HGasolinaModel }  = require('../models/catalogos.model');
const { verificaToken } = require('../middleware/autenticacion');

const catalogos = require('../dao/catalogos.dao');

const ruta = ' [catalogos.js] ';

/* ********** catalogos historico de gas ********** */

app.get('/hgasolina', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: usuario-lista';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;

        const gasolinaModel = new HGasolinaModel({
            FechaDesde        : req.query.FechaDesde,
            FechaHasta        : req.query.FechaHasta,
            IdEntidadFederal  : req.query.IdEntidadFederal
        });
        logger.info(etiquetaLOG);

        catalogos.obtieneHGasolina(gasolinaModel)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + pUsuarioOperacion + '] METODO: catalogos.obtieneHGasolina';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);        
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;
                hGasolinaLista = listaDat.hGasolinaLista;

                if (ok) {
                    res.json({
                        estatus: ok,
                        mensaje: mensaje,
                        hGasolinaLista: hGasolinaLista
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

/* ********** catalogos historico de gas ********** */

app.get('/hgas', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: usuario-lista';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
        let descEntidad = '';

        const gasModel = new HGasModel({
            FechaDesde        : req.query.FechaDesde,
            FechaHasta        : req.query.FechaHasta,
            IdEntidadFederal  : req.query.IdEntidadFederal
        });
        logger.info(etiquetaLOG);

/*        descEntidad = catalogos.BdConsultaEntidadFed(gasModel.IdEntidadFederal)
                    .then(result => {
                        let etiquetaLOGra77 = ruta + '[Usuario: ' + pUsuarioOperacion + '] METODO: catalogos.BdConsultaEntidadFed';
                        logger.info(etiquetaLOGra77);
                    });
        let etiquetaLOGra = ruta + '[Usuario: ' + descEntidad + '] METODO: catalogos.BdConsultaEntidadFed';
        logger.info(etiquetaLOGra);
*/
        catalogos.obtieneHGas(gasModel)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + pUsuarioOperacion + '] METODO: catalogos.obtieneHGas';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);        
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;
                hGasLista = listaDat.hGasLista;

                if (ok) {
                    res.json({
                        estatus: ok,
                        mensaje: mensaje,
                        hGasLista: hGasLista
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

/* ********** catalogos entidades********** */

app.get('/entidades', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: usuario-lista';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
        let bodyEstado = 'A';

        const entidadModel = new EntidadesModel({
            IdEntidadFederal: '',
            Nombre: '',
            Abreviacion: ''
        });
        logger.info(etiquetaLOG);

        catalogos.obtieneEntidades()
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.obtieneEntidades';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);        
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;
                entidades = listaDat.entidades;

                if (ok) {
                    res.json({
                        estatus: ok,
                        mensaje: mensaje,
                        entidades: entidades
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

/* ********** catalogos ********** */

app.get('/usuarios', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: usuario-lista';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
 //       let estado = req.body;
        let bodyEstado = 'A';

        const usuarioModel = new UsuarioFullModel({
            IdUsuario: pUsuarioOperacion || '',
            TipoConsulta: 'Lista',
            Estatus: 'A'
        });
        logger.info(etiquetaLOG);

        catalogos.obtieneUsuarios(bodyEstado)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.obtieneUsuarios';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;

                if (ok) {

                    res.json({
                        listaDat
     //                   estatus: true,
     //                   mensaje,
     //                   usuarios: resultado.usuarios
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        usuarios: resultado.usuarios
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

/* ********** ConsultaUsuario ********** */

app.get('/usuario', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Consulta usuario'  + req.query.IdUsuario;
        logger.info(etiquetaLOG);
        // Del token
        let mensaje = '';
        let ok = false;

        const usuarioModel = new UsuarioFullModel({
            IdUsuario: req.query.IdUsuario
        });     

        logger.info(etiquetaLOG);

        catalogos.consultaUsuario(usuarioModel.IdUsuario)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.consultaUsuario : ' + req.query.IdUsuario;
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;

                if (ok) {

                    res.json({
                        listaDat
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        usuarios: resultado.usuarios
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

app.post('/Bloquea-Usuario', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Bloquea usuario';
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = '';
        let contenido = '';
        let bodyBloqueado = 0;

        if (req.body.Bloqueado == true || req.body.Bloqueado == false ) {
            if(req.body.Bloqueado == true)
            {
                bodyBloqueado = 1;
            }

            const usuarioModel = new UsuarioFullModel({
                IdUsuario: req.body.IdUsuario,
                Bloqueado: bodyBloqueado
            });     

            let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Bloquea usuario 2 ' + usuarioModel.IdUsuario;
            logger.info(etiquetaLOG2);
            

            catalogos.BdUsuarioDesbloquea(usuarioModel)
                    .then(result => {
                    let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Bloquea usuario 3 ';
                    logger.info(etiquetaLOGra);

                    let resultado = JSON.stringify(result);
                    let pedazo = resultado.substring(1,resultado.length-1); 
                    let listaDat = JSON.parse(pedazo);

                    let etiquetaLOGra2 = ruta + '[ r e s u l t a d o: ' + resultado;
                    logger.info(etiquetaLOGra2);
                    let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                    logger.info(etiquetaLOGra3);

                    ok = listaDat.resultado;
                    mensaje = listaDat.mensaje;
                    contenido = listaDat.IdUsuario;

                    let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                    logger.info(etiquetaLOGra4);

                    if (ok) {

                        res.json({
                            ok,
                            mensaje,
                            contenido
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            ok,
                            mensaje,
                            contenido
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
        else
        {
            mensaje = 'Verifique la información requerida.';
        logger.info(ruta + 'Atención: ' + mensaje);
        res.json({
            estatus: false,
            mensaje
        });
    } 

    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

app.post('/Alta-Usuario', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Alta usuario';
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = '';
        let contenido = '';
        let bodyBloqueado = 0;

        if (req.body.IdUsuario != '') {

            const usuarioModel = new UsuarioFullModel({
                IdUsuario       : req.body.IdUsuario ,      
                Nombre          : req.body.Nombre ,         
                Contrasenia     : req.body.Contrasenia ,    
                IdEmpleado      : req.body.IdEmpleado ,     
                IdPerfil        : req.body.IdPerfil ,       
                FechaRegistro   : req.body.FechaRegistro ,  
                Estatus         : req.body.Estatus ,        
                email           : req.body.email ,          
                Bloqueado       : bodyBloqueado ,      
                Intentos        : req.body.Intentos ,       
                UltimaTransaccion: req.body.UltimaTransaccion
            });     

            let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Alta usuario 2 ' + usuarioModel.IdUsuario;
            logger.info(etiquetaLOG2);
            

            catalogos.BdAltaUsuario(usuarioModel)
                    .then(result => {
                    let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Alta usuario 3 ';
                    logger.info(etiquetaLOGra);

                    let resultado = JSON.stringify(result);
                    let pedazo = resultado.substring(1,resultado.length-1); 
                    let listaDat = JSON.parse(pedazo);

                    let etiquetaLOGra2 = ruta + '[ r e s u l t a d o: ' + resultado;
                    logger.info(etiquetaLOGra2);
                    let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                    logger.info(etiquetaLOGra3);

                    ok = listaDat.resultado;
                    Estatus = ok;
                    mensaje = listaDat.mensaje;
                    contenido = listaDat.IdUsuario;

                    let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                    logger.info(etiquetaLOGra4);

                    if (ok) {

                        res.json({
                            estatus:true,
                            mensaje,
                            contenido
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            estatus:false,
                            mensaje,
                            contenido
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
        else
        {
            mensaje = 'Verifique la información requerida.';
        logger.info(ruta + 'Atención: ' + mensaje);
        res.json({
            estatus: false,
            mensaje
        });
    } 

    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

app.post('/Modifica-Usuario', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Modifica usuario' + req.body.Bloqueado;
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = '';
        let contenido = '';
        let bodyBloqueado = 0;

        if (req.body.Bloqueado)
            {
                bodyBloqueado = 1
            }
        if (req.body.IdUsuario != '') {

            const usuarioModel = new UsuarioFullModel({
                IdUsuario       : req.body.IdUsuario ,      
                Nombre          : req.body.Nombre ,         
                Contrasenia     : req.body.Contrasenia ,    
                IdEmpleado      : req.body.IdEmpleado ,     
                IdPerfil        : req.body.IdPerfil ,       
                FechaRegistro   : req.body.FechaRegistro ,  
                Estatus         : req.body.Estatus ,        
                email           : req.body.email ,          
                Bloqueado       : bodyBloqueado ,      
                Intentos        : req.body.Intentos ,       
                UltimaTransaccion: req.body.UltimaTransaccion
            });     

            let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Modifica usuario 2 ' + usuarioModel.IdUsuario;
            logger.info(etiquetaLOG2);
            

            catalogos.BdModificaUsuario(usuarioModel)
                    .then(result => {
                    let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Modifica usuario 3 ';
                    logger.info(etiquetaLOGra);

                    let resultado = JSON.stringify(result);
                    let pedazo = resultado.substring(1,resultado.length-1); 
                    let listaDat = JSON.parse(pedazo);

                    let etiquetaLOGra2 = ruta + '[ r e s u l t a d o: ' + resultado;
                    logger.info(etiquetaLOGra2);
                    let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                    logger.info(etiquetaLOGra3);

                    ok = listaDat.resultado;
                    mensaje = listaDat.mensaje;
                    contenido = listaDat.IdUsuario;

                    let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                    logger.info(etiquetaLOGra4);

                    if (ok) {

                        res.json({
                            ok,
                            mensaje,
                            contenido
                        });

                    } else {

                        logger.info(ruta + 'Atención: ' + mensaje);
                        res.json({
                            ok,
                            mensaje,
                            contenido
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
        else
        {
            mensaje = 'Verifique la información requerida.';
        logger.info(ruta + 'Atención: ' + mensaje);
        res.json({
            estatus: false,
            mensaje
        });
    } 

    } catch (err) {
        logger.error(ruta + 'ERROR: ' + err);

        res.json({
            estatus: false
        });

    }
});

/* ********** Catalogos : Perfiles********** */

app.get('/perfiles', verificaToken, (req, res) => {

    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: usuario-lista';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
        let bodyEstado = 'A';

        const perfilModel = new PerfilesModel({
            IdUsuario: pUsuarioOperacion || '',
            TipoConsulta: 'Lista',
            Estatus: 'A'
        });
        logger.info(etiquetaLOG);

        catalogos.obtienePerfiles()
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.obtienePerfiles';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);


                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;

                if (ok) {

                    res.json({
                        listaDat
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        usuarios: resultado.usuarios
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

/* ********** Catalogos : Dictamenes********** */

app.post('/cat-dictamen', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamen Actualiza';
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = '';
        let contenido = '';
        let bodyEstado = 'N';
        if(req.body.Estatus == true)
        {
            bodyEstado = 'A';
        }

        const dictamenesModel = new DictamenesModel({
            IdDictamen: req.body.IdDictamen,
            Nombre: '',
            Estatus: bodyEstado
        });     

        let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamen Actualiza 2 ' + dictamenesModel.IdDictamen;
        logger.info(etiquetaLOG2);
        

        catalogos.BdActualizaCatDictamenes(dictamenesModel)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.obtieneUsuarios';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let pedazo = resultado.substring(1,resultado.length-1); 
                let listaDat = JSON.parse(pedazo);

                let etiquetaLOGra2 = ruta + '[ r e s u l t a d o: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);

                ok = listaDat.resultado;
                mensaje = listaDat.mensaje;
                contenido = listaDat.IdDictamen;

                let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                logger.info(etiquetaLOGra4);

                if (ok) {

                    res.json({
                        ok,
                        mensaje,
                        contenido
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        ok,
                        mensaje,
                        contenido
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

app.get('/cat-dictamenes', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamenes';
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
        let bodyEstado = 'A';

        const dictamenesModel = new DictamenesModel({
            IdDictamen: '',
            Nombre: '',
            Estatus: 'A'
        });     

        let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamenes 2';
        logger.info(etiquetaLOG2);
        

        catalogos.obtieneDictamenes(bodyEstado)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: catalogos.obtieneUsuarios';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado) ;

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);

                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;
                contenido = listaDat.dictamenes;

                let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                logger.info(etiquetaLOGra4);

                if (ok) {

                    res.json({
                        ok,
                        mensaje,
                        contenido
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        dictamenes: resultado.usuarios
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

app.get('/cat-dictamen', verificaToken, (req, res) => {

    try {

        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamenes Id';
        logger.info(etiquetaLOG);
        
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        let mensaje = '';
        let ok = false;
        let dictamenId = 'APB';

        const dictamenesModel = new DictamenesModel({
            IdDictamen: req.query.IdDictamen || 0
        });     

        let etiquetaLOG2 = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamenes Id 2';
        logger.info(etiquetaLOG2);
        
        if (dictamenesModel.IdDictamen == 0) {
            mensaje = 'Verifique la información requerida.';
            logger.info(ruta + 'Atención: ' + mensaje);
            res.json({
                estatus: false,
                mensaje
            });
        } else {
                catalogos.obtieneDictamenId(dictamenesModel.IdDictamen)
                .then(result => {
                let etiquetaLOGra = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: Cat Dictamenes Id';
                logger.info(etiquetaLOGra);

                let resultado = JSON.stringify(result);
                let listaDat = JSON.parse(resultado);

                let etiquetaLOGra2 = ruta + '[resultado: ' + resultado;
                logger.info(etiquetaLOGra2);
                let etiquetaLOGra3 = ruta + '[listaDat: ' + listaDat;
                logger.info(etiquetaLOGra3);

                ok = listaDat.estatus;
                mensaje = listaDat.mensaje;
                contenido = listaDat.dictamenes;

                let etiquetaLOGra4 = ruta + ' Ok: ' + ok + ' mensaje: ' + mensaje + ' contenido: ' + contenido ;
                logger.info(etiquetaLOGra4);

                if (ok) {

                    res.json({
                        ok,
                        mensaje,
                        contenido
                    });

                } else {

                    logger.info(ruta + 'Atención: ' + mensaje);
                    res.json({
                        estatus: false,
                        mensaje,
                        dictamenes: resultado.usuarios
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
