const express = require('express');
const app = express();

const logger = require('../log/log');

const { verificaToken } = require('../middleware/autenticacion');

const { ParametrosModel } = require('../models/parametros.model');

const PdfPrinter =  require("pdfmake");
const fs = require('fs');
const fonts = require("../utils/pdfs/fonts");
const contrato = require('../dao/contrato.dao');
const ContratoTaxi =  require("../formats/contratoTaxi");     
const styles = require("../utils/pdfs/styles");

const ruta = ' [contratoDoc.js] ';

/****************************************************************************
 * Reporte 1 --Situación Actual Concesionarios
 ****************************************************************************/
app.get('/contratoDocumento', verificaToken, (req, res) => {
    try {
        let etiquetaLOG = ruta + '[Usuario: ' + req.usuario.IdUsuario + '] METODO: dashboard';
        logger.info(etiquetaLOG);
        // Del token
        let pUsuarioOperacion = req.usuario.IdUsuario;

        //console.log(JSON.stringify(req.body));
        //console.log(JSON.stringify(req.params));
        console.log("Request qry: " + req.query.IdContrato);
        console.log("Request param: " + req.params.IdContrato);

        let mensaje = '';
        let ok = false;

        const parametros = ({
            IdUsuario: req.usuario.IdUsuario || '',
            IdContrato: req.query.IdContrato || 0
        });

        console.log(parametros);
        contrato.informacionDocumentoContrato(parametros)
            .then(result => {
                let resultado = JSON.stringify(result);
                let contratoData = JSON.parse(resultado);
                console.log(contratoData.datos);

                ok = contratoData.estatus;
                //mensaje = contratoData.mensaje;

                if (ok) {
                    console.log("preparando Información  para contrato: " + req.query.IdContrato);
                    pdfObj = new ContratoTaxi(contratoData.datos[0]);
                    let docDefinition = {
                                pageSize: 'LETTER',
                                font: 'Arial Narrow',
                                pageMargins: [ 60, 60, 60, 60 ],
                                header: pdfObj.getPdfHeader(),
                                content: pdfObj.getPdfContent(),
                                styles: styles,
                    };
                    const printer = new PdfPrinter(fonts);

                    let pdfDoc = printer.createPdfKitDocument(docDefinition);

                    try {
                        
                        const file  = fs.createWriteStream(contratosPDF+"Contrato_taxi_"+contratoData.datos[0].Placa+".pdf");
                        pdfDoc.pipe(file);
                        pdfDoc.end();
                        pdfDoc.release;
                        pdfObj.destroy;

                        mensaje = "Documento Contrato generado exitosamente";
                        res.json({
                            estatus: true,
                            mensaje,
                            archivo: "Contrato_taxi_"+contratoData.datos[0].Placa+".pdf",
                            datos: contratoData.datos
                        });
                    } catch (err) {
                        logger.error(ruta + 'ERROR: ' + err);
                
                        res.json({
                            estatus: false,
                            error: err.message
                        });
                
                    }
                    

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