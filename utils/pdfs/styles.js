const { drawBackground } = require("pdfmake/src/textDecorator");

module.exports ={
    header: {
        bold: true,
        fontSize: 13, 
        alignment: "center",
        color: "#000000",
    },
    subheader: {
        bold: true,
        fontSize: 10, 
        alignment: "justify",
        color: "#000000",
    },
    label: { 
        fontsize: 10,
        color: "#020232",
    },
    tableTitle: {
        bold: true,
        fontSize: 10, 
        alignment: "center",
        color: "#000000",
    },
    tableExample: {
        margin: [0, 5, 0, 15]
    },
    tableHeader: {
        bold: true,
        fontSize: 8,
        color: '#7CBE02',
        fillColor: '#011D7E',
        alignment: "center"
    },
    tableDetail: {
        bold: false,
        fontSize: 8,
        color: 'black'
    },
    textoContrato: {
        fontSize: 12,
        color : 'black',
        alignment: "justify",
    },
    headersContrato: {
        bold: true,
        fontSize: 12,
        color : 'back',
        alignment: "center",
    },
    headHojaContrato: {
        fontSize: 8,
        color : 'back',
        alignment: "left",
    },
    enumContrato: {
        margin: [10, 0, 0, 0],
        fontSize: 12,
        alignment: 'justify'
    },
    emailContrato: {
        fontSize: 12,
        color: 'blue',
        decoration: 'underline'
    }
};