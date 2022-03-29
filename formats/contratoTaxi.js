//var _ = require('underscore');
//var dateFormat = require('dateformat');

const { textoContrato, enumContrato, headersContrato, emailContrato } = require('../utils/pdfs/styles');


class pdfContratoTaxi {

    constructor (data ) {
        this.contrato = data;
        console.log("contratoTaxi: \n" + JSON.stringify(this.contrato));
    }

    getPdfHeader() {
        this.header = {text: "Contrato # 4A / 8 Contrato de Membresía Provisional (Programa Piloto)\n"}
        /*
            text: [
                {,
                {text: "Concesionario - TAXI\n"},
                {text: "No. Identificación del Contrato: IQ-001 "}
            ],
            style: "headHojaContrato",
            alignment: "left", 
            fontSize: 8
        }
        */
    }

    getPdfContent() {
        const fechaFirma = new Date()
        
        this.content = [
            {text: [
                  { text: "CONTRATO DE MEMBRESÍA PROVISIONAL AL ", style: "textoContrato"},
                  { text: "PROGRAMA DE BENEFICIOS ", style: "headersContrato"},
                  { text: "QUE CELEBRAN POR UNA PARTE ", style: "textoContrato"},
                  { text: "OPERADORA DEL PROGRAMA DE BENEFICIOS SINDICAL, S.A DE C.V.", style: "headersContrato"},
                  { text: ", A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ COMO", style: "textoContrato"},
                  { text: " “LA OPERADORA DEL PROGRAMA DE BENEFICIOS”", style: "textoContrato", bold: true},
                  { text: ", REPRESENTADA EN ESTE ACTO POR SU APODERADO (A) GENERAL ", style: "textoContrato"},
                  { text: "C. PEDRO RINCON RIVAS", style: "textoContrato", bold: true},
                  { text: ", Y POR LA OTRA, LA PERSONA FÍSICA ", style: "textoContrato"},
                  { text: this.contrato.Concesionario , bold: true},
                  { text: ", A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ COMO ", style: "textoContrato"},
                  { text: "“EL O LA CONCESIONARIA”", style: "textoContrato"},
                  { text: ". A LOS COMPARECIENTES EN EL CURSO DE ESTE CONTRATO TAMBIÉN SE LES DESIGNARÁ EN SU CONJUNTO COMO ", style: "textoContrato"},
                  { text: "“LAS PARTES”", style: "headersContrato"},
                  { text: ", AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS:\n\n\n", style: "textoContrato"},
                  { text: "A N T E C E D E N T E S\n\n", style: "headersContrato"},
                  { text: "Que el 25 de septiembre de 2015, más de 150 líderes mundiales asistieron a la Cumbre de las Naciones Unidas sobre el Desarrollo "+
                          "Sostenible en Nueva York con el fin de aprobar la Agenda para el Desarrollo Sostenible. El documento final, titulado "+
                          "“Transformar Nuestro Mundo: la Agenda 2030 para el Desarrollo Sostenible”, fue adoptado por los 193 Estados Miembros de las Naciones Unidas. "+
                          "Dicho documento incluye los 17 Objetivos del Desarrollo Sostenible (ODS) cuyo objetivo es poner fin a la pobreza, luchar contra la desigualdad "+
                          "y la injusticia, y hacer frente al cambio climático sin que nadie quede atrás para el 2030\n\n", style: "textoContrato"},
                  { text: "“La Agenda 2030 plantea que todas las personas deben tener acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles. "+
                          "Y esto incluye la seguridad vial, principalmente mediante la ampliación del transporte público”.\n\n", style: "textoContrato"},
                  { text: "Entre las diez recomendaciones que ofrece la agenda, destaca la adopción a corto y largo plazo de estrategias que reduzcan las " +
                          "emisiones de carbono mediante la implementación de nuevas tecnologías.\n\n", style: "textoContrato" },
                  { text: "Derivado de las resoluciones de la mencionada agenda y en busca de cumplir con su objeto y permitir a sus agremiados ofrecer servicios "+
                          "con tecnologías de vanguardia, “MOVIMIENTO NACIONAL DE TRANSPORTE EN GENERAL” ASOCIACIÓN CIVIL encomendó a “LA PROMOTORA”, estructurar "+
                          "alianzas estratégicas que permitan la consecución de estos propósitos, mediante la modificación de los vehículos utilizados por sus sindicatos "+
                          "y organizaciones agremiados, con el propósito de que estos últimos cuenten con un motor a GAS NATURAL o GAS LICUADO DE PETRÓLEO, en el corto plazo, "+
                          "siendo esta la primera de las acciones que se realizarán. A la implementación de los beneficios derivados de dichas alianzas en lo sucesivo se les "+
                          "denominará “EL PROGRAMA DE BENEFICIOS”..\n\n", style: "textoContrato" },
                  { text: "D E CL A R A C I O N E S\n\n", style: "headersContrato"},
                  { text: "Declara “LA OPERADORA DEL PROGRAMA DE BENEFICIOS”, por conducto de su representante:\n\n", style: "textoContrato", bold: true},
                  
                

            ], 
             style: "textoContrato", 
             alignment: "justify"
            } ,
            {
                stack:[
                    {
                        type: 'upper-alpha',
                        ol: [
                            
                                { text: ["Que es una sociedad mercantil legalmente constituida y organizada conforme a las leyes de los Estados Unidos Mexicanos, bajo la denominación social ",
                                    { text: "OPERADORA DEL PROGRAMA DE BENEFICIOS SINDICAL, S.A. DE C.V.", bold: true},
                                    ", según consta en la escritura pública número 158,655 de fecha 15 de octubre de 2021, otorgada ante la fe del Lic. Eduardo Garduño García Villalobos, "+
                                        "Notario Público 135  de la Ciudad de México, e inscrito su primer testimonio ante el Registro Público de la Propiedad y de Comercio de la Ciudad de México, "+
                                        "bajo el folio mercantil electrónico número N-2021086047, de fecha 16 de noviembre del año 2021."
                                    ], style: "textoContrato", 
                                    margin: [0,10]
                                },
                                { text : "Que su objeto social es la recaudación, implementación, administración y operación de programas de beneficios, así como la prestación de servicios "+
                                         "financieros, necesarios y convenientes para la realización de su objeto social, entre otras.", 
                                  margin: [0,10]
                                },
                                {
                                    text: "Que tiene su domicilio fiscal y principal asiento de sus negocios en Ciudad de México, y que se encuentra en proceso de inscripción su Registro "+
                                          "Federal de Contribuyentes ante el Servicio de Administración Tributaria, órgano desconcentrado de la Secretaría de Hacienda y Crédito Público.",
                                    margin: [0,10]
                                },
                                {
                                    text: "Que se identifica en este acto mediante credencial para votar con fotografía expedida por el Instituto Nacional Electoral, con clave de elector: "+
                                          this.contrato.INE + ".", 
                                    margin: [0,10]
                                },
                                {
                                    text: "Que cuenta con la experiencia, recursos e infraestructura, personal propio debidamente capacitado y entrenado, así como con relaciones de negocios "+
                                          "establecidas con terceros de su misma rama de actividad comercial y otras afines adecuados y convenientes para cumplir fielmente con todas y cada "+
                                          "una de las obligaciones que asumirá a su cargo en los términos del presente contrato.", 
                                    margin: [0,10]
                                },
                                {
                                    text: "Que su representante legal cuenta con facultades suficientes para celebrar el presente contrato según consta en la escritura pública referida "+
                                          "en la declaración A., facultades que a la fecha no le han sido revocadas, ni limitadas, en forma alguna.", 
                                    margin: [0,10]
                                },
                                {
                                    text: "Que generó un programa de suministro de gas natural o gas licuado de petróleo y comodato del EQUIPO DE CONVERSIÓN de motores de gasolina a gas "+
                                          "natural o gas licuado de petróleo dependiendo el caso, con el propósito de que los miembros del programa gocen de los beneficios obtenidos del "+
                                          "ahorro que genera el consumo de gas natural o gas licuado de petróleo versus el costo de la gasolina.", 
                                    margin: [0,10]
                                },
                                {
                                    text: ["Que es de su interés prestar sus servicios a ",
                                            {text: "“EL O LA CONCESIONARIA”", bold: true},
                                            " con el propósito de que como miembro provisional del programa goce de los beneficios obtenidos del ahorro que genera el consumo de gas natural "+
                                            "o gas licuado de petróleo versus el costo de la gasolina. Para tal efecto, el vehículo utilizado por ",
                                            {text: "“EL O LA CONCESIONARIA” ", bold: true},
                                            "que se describe más adelante deberá estar equipado para su funcionamiento con gas natural o gas licuado de petróleo." 
                                          ], 
                                    margin: [0,20]
                                },
                                
                            
                        ]
                    }
                ],
                style: 'enumContrato'
                
            },  
            {text: "Declara “EL O LA CONCESIONARIA”, por su propio derecho:", bold: true, style:"textoContrao", margin: [0,10] } ,
            {
                stack:[
                    {
                        type: 'upper-alpha',
                        ol: [
                            
                                { text: ["Que es una persona física con capacidad legal y facultades necesarias para la celebración del presente contrato, identificándose en este acto con "+
                                         "credencial para votar expedida por el Instituto Nacional Electoral o Instituto Federal Electoral con clave de elector: ",
                                    { text: this.contrato.INE, decoration: 'underline', bold: true},
                                    "(ANEXO 1)."
                                    ], style: "textoContrato", 
                                    margin: [0,10]
                                },
                                { text : "Que cuenta con la capacidad económica necesaria para cumplir cabalmente con todas y cada una de las obligaciones estipuladas en el presente contrato.", 
                                  margin: [0,10]
                                },
                                { text : "Que se encuentra al corriente en el pago de todos los impuestos y demás contribuciones municipales, estatales y federales.", 
                                  margin: [0,10]
                                },
                                { text : "Que los recursos con los que lleva a cabo sus operaciones normales provienen de fuentes lícitas.", 
                                  margin: [0,10]
                                },
                                { text : [
                                    "Que la información proporcionada y documentación presentada a ",
                                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                    "para el presente contrato es cierta y auténtica."
                                  ], 
                                  margin: [0,10]
                                },
                                { text : "Que es de su conocimiento que los derechos y obligaciones se ajustan a las condiciones de mercado en relación con el servicio objeto del presente "+
                                         "contrato, sin que exista lesión ni vicios en su consentimiento.", 
                                  margin: [0,10]
                                },
                                { text : [
                                        "Que señala como su domicilio para efectos del presente contrato el ubicado en: ",
                                        {text : this.contrato.Domicilio , decoration: 'underline' },
                                        ", lo cual acredita con copia simple de comprobante de domicilio actualizado, mismo que se anexa al presente contrato. (ANEXO 2)"
                                  ], 
                                  margin: [0,10]
                                },
                                { text : 
                                    [
                                        "Que es legítimo propietario o cuenta con los derechos de uso del automóvil tipo ",
                                        {text : this.contrato.TipoVehiculo , decoration: 'underline' },
                                        " marca ",
                                        {text : this.contrato.Marca , decoration: 'underline' },
                                        ", modelo ",
                                        {text : this.contrato.Modelo, decoration: 'underline' },
                                        ", motor _________________________",
                                        " número de serie ",
                                        {text : this.contrato.Serie, decoration: 'underline' },
                                        ", el cual utiliza la placa número ",
                                        {text : this.contrato.Placa, decoration: 'underline' },
                                        " conforme su tarjeta de circulación (ANEXO 3) con  número económico ",
                                        {text : this.contrato.Serie, decoration: 'underline' },
                                        " para proporcionar servicios de transporte concesionado tipo TAXI (en lo sucesivo “EL VEHÍCULO”), conforme la concesión que lo acredita "+
                                        "como concesionario de transporte público (ANEXO 4)."
                                    ], 
                                  margin: [0,10]
                                },
                                { text :  
                                    [
                                        "Que como agremiado del ",
                                        {text : this.contrato.Sindicato , bold: true},
                                        " a quien en lo sucesivo se le denominará ",
                                        {text : "“EL SINDICATO”", bold: true},
                                        ", integrante del “MOVIMIENTO NACIONAL DE TRANSPORTE EN GENERAL” ASOCIACIÓN CIVIL, le ha sido informado que es candidato para participar en "+
                                        "el programa de suministro de gas natural o gas licuado de petróleo y comodato del EQUIPO DE CONVERSIÓN de motores de gasolina a gas natural "+
                                        "o  licuado de petróleo, según sea el caso y es de su interés participar en el mencionado programa en afán de gozar de los beneficios obtenidos "+
                                        "del ahorro que genera el consumo de gas natural o gas licuado de petróleo versus el costo de la gasolina. Para tal efecto, es de su interés "+
                                        "que EL VEHÍCULO sea equipado para su funcionamiento con gas natural o gas licuado de petróleo, así como firmar un CONTRATO DE SUMINISTRO DE "+
                                        "GAS NATURAL O GAS LICUADO DE PETRÓLEO Y CONTRATO DE COMODATO DE EQUIPO DE CONVERSIÓN con el aliado estratégico en la división de combustibles "+
                                        "de “EL PROGRAMA DE BENEFICIOS”. "
                                    ],    
                                  margin: [0,10]
                                },
                                { text :   
                                    [
                                        "Que requiere contratar los servicios de ",
                                        {text : "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”" , bold: true},
                                        ", en los términos y condiciones pactados en el presente contrato.",
                                    ],
                                  margin: [0,10]
                                },
                        ]
                    } 
                ],
                style: 'enumContrato'
            },
            {text: "Declaran “LAS PARTES” conjuntamente que:", bold: true, style:"textoContrao" } ,
            {
                stack:[
                    {
                        type: 'upper-alpha',
                        ol: [
                            
                                { text: ["Derivado de la celebración del CONTRATO DE SUMINISTRO DE GAS LICUADO DE PETRÓLEO Y COMODATO DEL EQUIPO DE CONVERSIÓN de motores de "+
                                         "gasolina a gas natural o gas licuado de petróleo, “",
                                    { text: "LA OPERADORA DEL PROGRAMA DE BENEFICIOS", bold: true},
                                    "”, estará encargada de cobrar a “",
                                    { text: "EL O LA CONCESIONARIA", bold: true},
                                    "” los consumos de gas natural o gas licuado de petróleo en las estaciones de servicios designadas, así como lo correspondiente a “EL PROGRAMA DE BENEFICIOS” y el ahorro de “",
                                    { text: "EL O LA CONCESIONARIA", bold: true},
                                    "” y posteriormente dispersar éste último concepto de las cantidades recibidas a través de ",
                                    { text: "“EL SINDICATO”", bold: true},"."
                                    ], style: "textoContrato", 
                                    margin: [0,10]
                                },
                                { text : "Se reconocen recíprocamente la personalidad con la que actúan y es su voluntad celebrar el presente contrato para los fines que "+
                                        "más adelante se señalan, sujetándose a las siguientes:", 
                                  margin: [0,0]
                                }
                            ]
                    }
                ],
                style: 'enumContrato'    
            },           
            { text: "C L Á U S U L A S", style: 'headersContrato', margin: [10,20]},
            { text: "PRIMERA.- OBJETO Y ALCANCE DE “EL PROGRAMA DE BENEFICIOS”", style: 'textosContrato', bold: true, margin: [0,10]},
            { text:
                [
                "En términos del presente contrato, “",
                { text: "EL O LA CONCESIONARIA", bold: true},
                "” así como su(s) OPERADOR(ES) se adhieren a “EL PROGRAMA DE BENEFICIOS”, que administra “",
                { text: "LA OPERADORA DEL PROGRAMA DE BENEFICIOS", bold: true},
                "”, y en tal virtud se obliga a cargar exclusivamente gas natural o gas licuado de petróleo en las estaciones de servicios de la gasera que forma parte del programa."
                ],
                margin: [0,5],
                alignment : "justify"
            },
            { text:
                [
                "“",{ text: "LA OPERADORA DEL PROGRAMA DE BENEFICIOS", bold: true},"” ",
                "se obliga a recibir el pago de los consumos de gas natural o gas licuado de petróleo que “",

                { text: "EL O LA CONCESIONARIA", bold: true},
                "” adquiera en las estaciones de servicios designadas mediante los procedimientos que más adelante se detallan, y a administrar los ahorros generados por la diferencia "+
                "entre el precio de gas natural o gas licuado de petróleo y la gasolina, según sea el caso. A dicha diferencia en lo sucesivo se le denominará el “AHORRO”."
                ],
                margin: [0,5],
                alignment : "justify"
            },
            { text:
                [
                "“LAS PARTES” acuerdan que el precio de referencia de la gasolina regular a utilizar para determinar la diferencia con el precio del gas natural o gas licuado de "+
                "petróleo, será el promedio semanal reportado ante la CRE (Comisión Reguladora de Energía) por los permisionarios de dicho combustible en el ",
                { text: "municipio de Islas Mujeres, en la parte continental", bold: true},
                ". De igual forma “LAS PARTES” acuerdan que, ante un eventual desabasto, se tomará como referencia el promedio de la gasolina premium."
                ],
                margin: [0,5],
                alignment : "justify"
            },
            { text:
                [
                "Al alcance de sus obligaciones en el presente contrato, “",
                { text: "LA OPERADORA DEL PROGRAMA DE BENEFICIOS", bold: true},
                "” queda autorizada por “",
                { text: "EL O LA CONCESIONARIA", bold: true},
                "” para recaudar en las instalaciones designadas los siguientes conceptos:."
                ],
                margin: [0,5],
                alignment : "justify"
            },
            {
                stack:[
                    {
                        ol: [
                            
                                { text: ["Cobrar el consumo del gas natural o gas licuado de petróleo (según sea el caso) el cual se pagará posteriormente a la gasera a razón "+
                                         "del precio publicado por las autoridades Federales en la fecha de realización del consumo y pago correspondiente. Para tal efecto, ",
                                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                    "pagará a la gasera designada para proveer los consumos del programa, las cantidades que resulten de multiplicar el número total de litros "+
                                    "de combustible efectivamente suministrados en cada carga efectuada, por el precio por litro publicado por la autoridades federales "+
                                    "correspondientes, tomando como base para la determinación de la contraprestación, la información contenida en el documento denominado "+
                                    "“COMPROBANTE” o “TICKET” respectivo, el cual será emitido por ",
                                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                    "tal y como se describe más adelante.",
                                    ], style: "textoContrato", 
                                    margin: [0,10]
                                },
                                [
                                    { text : [
                                        "Cobrar adicional al consumo del gas natural o gas licuado de petróleo (según sea el caso), $2.50 (dos pesos 50/100 M.N.) de "+
                                        "cada litro adquirido como aportación a “EL PROGRAMA DE BENEFICIOS”, de los cuales el 5% (cinco por ciento) ",
                                        { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                        "utilizará para cubrir los costos de recaudación y administración de “EL PROGRAMA DE BENEFICIOS”, el cual incluye:"
                                        ], 
                                    margin: [0,10]
                                    },
                                    {
                                        stack: [
                                            {
                                                type: 'lower-alpha',
                                                separator: ') ',
                                                ol: [
                                                    {
                                                        text: "Programa de rifas (electrodomésticos, tabletas, celulares, motocicletas, computadoras, viajes de placer, boletos "+
                                                              "y cortesías familiares para amenidades y para el vehículo; juegos de llantas, servicios completos de mantenimiento, "+
                                                              "frenos, suspensión y afinaciones). "
                                                    }
                                                ]
                                            }
                                        ],
                                        style : 'enumContrato',
                                        margin: [0, 10]
                                    },
                                    
                                ],
                                { text : [
                                    "Retener el monto que le corresponde a ",
                                    { text: "“EL O LA CONCESIONARIA” ", bold: true},
                                    "del “AHORRO” que se genera de la diferencia del precio del gas natural o gas licuado de petróleo versus el precio de la gasolina, del cual el 5% (cinco por ciento) ",
                                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                    "utilizará para cubrir los costos de recaudación y administración respectivo."
                                    ], 
                                margin: [0,10]
                                },
                            ]
                    }
                ],
                style: 'enumContrato'    
            },           
            { 
                text: "SEGUNDA.- CONSUMOS MINIMOS, PRODUCTOS Y SERVICIOS ADICIONALES DEL PROGRAMA DE BENEFICIOS", 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    { text: "“EL O LA CONCESIONARIA”", bold: true}, 
                    ", acepta que deberá ",
                    { text: "consumir ", bold: true}, "la ",
                    { text: "cantidad mínima de "+ this.contrato.ConsumoMes+ " ltros", bold: true}, 
                    "de gas natural o gas licuado de petróleo (según sea el caso) para “EL VEHÍCULO” para participar en “EL PROGRAMA DE BENEFICIOS” "+
                    "del cual obtendrá los siguientes beneficios:"
                ], 
                margin: [0,10]
            },
            { 
                text: [
                    { text: "PROGRAMA DE RIFAS: ", decoration:'underline',  bold: true}, 
                    "Este programa será operado por ",
                    { text: "“EL SINDICATO”", bold: true}, 
                    ", quien será el responsable de llevar a cabo las rifas bajo protocolos de transparencia y cumplimiento. Los bienes y servicios susceptibles de "+
                    "ser rifados podrán ser: Electrodomésticos, tabletas, celulares, motocicletas, computadoras, viajes de placer; y para el vehículo: juegos de llantas, "+
                    "servicios completos de mantenimiento, frenos, suspensión y afinaciones, entre otros, los cuales serán entregados por ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”", bold: true},"."
                ], 
                margin: [0,10],
                style: 'textoContrato'
            },
            { 
                text: "Los beneficios del PROGRAMA DE RIFAS de “EL PROGRAMA DE BENEFICIOS” aplicarán siempre y cuando cumpla con el consumo mínimo referido en esta misma cláusula.", 
                margin: [0,10],
                style: 'textoContrato'
            },

            { 
                text: "TERCERA.- PROCEDIMIENTO PARA LA COMPRA DE GAS NATURAL O GAS LICUADO DE PETRÓLEO A TRAVÉS DE “EL PROGRAMA DE BENEFICIOS”.", 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    { text: "“EL O LA CONCESIONARIA”", bold: true}, 
                    "reconoce y acepta que para mantener su participación en “EL PROGRAMA DE BENEFICIOS” deberá consumir en las estaciones de servicio específicamente designadas por ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”", bold: true},
                    ", y en cada consumo se realizará el siguiente procedimiento:"
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },
            {
                stack:[
                    {
                        ol: [
                                { text: "Llegar a la estación de servicio designada."},
                                { text: "Solicitar la carga del número de litros de gas natural o gas licuado de petróleo que desee adquirir."},
                                { text: "Proporcionar al encargado/cobrador su número de operador, las placas del vehículo, el kilometraje "+
                                        "del vehículo y los litros con los que cuenta su tanque antes de la carga."},
                                { text: "Verificar que el encargado/cobrador suministre los litros efectivamente solicitados. "},
                                { text: "Pagar al encargado/cobrador el monto total del suministro de gas natural o gas licuado de petróleo, "+
                                        "así como su aportación a “EL PROGRAMA DE BENEFICIOS” y el “AHORRO” respectivo en efectivo y en moneda nacional."},
                                { text: "El encargado/cobrador registra la compra realizada de los litros de gas natural o gas licuado de petróleo "+
                                        "suministrados, la aportación al PROGRAMA DE BENEFICIOS y el “AHORRO” correlativo."},
                                { 
                                    text :
                                    [
                                        "El encargado/cobrador de ",
                                        { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                        "registra la operación correspondiente."
                                    ],

                                },
                                { 
                                    text :
                                    [
                                        "El encargado/cobrador de ",
                                        { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                                        "proporciona el comprobante respectivo, detallando los siguientes conceptos:"
                                    ],

                                },
                                {
                                    stack: [
                                        {
                                            type: 'lower-alpha',
                                            separator: ' ',
                                            ol: [
                                                { text: "Consumo de gas natural o gas licuado de petróleo efectivamente suministrado."},
                                                { text: "La aportación a “EL PROGRAMA DE BENEFICIOS”."},
                                                { text: "El “AHORRO” de “EL O LA CONCESIONARIA”."},
                                            ]
                                        }
                                    ],
                                    style : 'enumContrato',
                                    margin: [0, 10]
                                },
                        ]
                    }
                ],
                style: 'enumContrato',
                
            },

            { 
                text: "CUARTA.- CONSULTA DEL ESTADO DE CUENTA" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "Para consultar su estado de cuenta provisional, ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "podrá hacerlo vía mensaje de correo electrónico a ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "a la dirección electrónica ",
                    { text: "privas@cambiaygana.mx ", color: 'blue', decoration:'underline'},
                    { text: ". Dicho estado de cuenta le será entregado a la dirección de correo electrónico proporcionada para tales efectos." }
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "QUINTA.- DE LOS COSTOS DE OPERACIÓN PARA LA APLICACIÓN DEL PROGRAMA" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "“LAS PARTES” convienen que, por la aplicación de “EL PROGRAMA DE BENEFICIOS”, se generarán costos operativos que "+
                    "serán cubiertos a través de la propia recaudación realizada por ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”", bold: true},
                    ". Para tal efecto, ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "acepta que del “AHORRO” se destine un 5% (cinco por ciento) para la operación de “EL PROGRAMA DE BENEFICIOS”.",
                    
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: [
                    "Asimismo, en caso de que "+
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "no cubra el consumo mínimo de litros de gas natural o gas licuado de petróleo (según sea el caso) faculta a ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "a disponer del “AHORRO” para cubrir los costos de operación y/o otros autorizados, a efecto de que ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "no pierda los beneficios obtenidos a través de “EL PROGRAMA DE BENEFICIOS” y estén al corriente de sus obligaciones adquiridas.",
                    
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: [
                    "Una vez cumplidas las obligaciones de "+
                    { text: "“EL O LA CONCESIONARIA”", bold: true}, 
                    ", cualquier cantidad remanente del “AHORRO” a favor de esta última, se depositará a ",
                    { text: "“EL SINDICATO” ", bold: true},
                    "en los siguientes 5 días hábiles posteriores a la terminación de la vigencia del presente contrato, previa comprobación, por lo que en este acto ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "autorizan que dicha cantidad sea depositada a ",
                    { text: "“EL SINDICATO” ", bold: true},
                    "en el periodo acordado."
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "SEXTA.-   DEL REGISTRO AL PROGRAMA DE BENEFICIOS, USO DE DATOS PERSONALES" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "“LAS PARTES” convienen que, por la aplicación de “EL PROGRAMA DE BENEFICIOS”, se generarán costos operativos que "+
                    "reconoce y acepta que, para formar parte de “EL PROGRAMA DE BENEFICIOS” objeto del presente contrato, ha entregado a ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "la información personal que a continuación se describe:",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },
            {
                stack: [
                    {
                        ul : [
                            'Nombre',
                            'Domicilio',
                            'RFC',
                            'Teléfono y correo electrónico',
                            'Datos de identificación del vehículo',
                        ]

                    }
                    
                ],
                style : 'enumContrato',
                margin: [10, 10]
            },
            { 
                text: [
                    "En virtud de lo anterior, "+
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "acepta que la información previamente proporcionada sea utilizada para todos los fines necesarios y convenientes para "+
                    "el cumplimiento de las obligaciones adquiridas por cada una de “LAS PARTES” en el presente contrato, y asimismo acepta "+
                    "que su información sea utilizada para que se haga de su conocimiento la existencia de nuevos productos relacionados con "+
                    "“EL PROGRAMA DE BENEFICIOS”. ",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "SÉPTIMA.-  DEL PROCESO ADMINISTRATIVO DE FACTURACIÓN" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "podrá solicitar la facturación de las operaciones de suministro de gas licuado de petróleo a través de correo electrónico. Para tales efectos, ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "pone a su disposición la dirección electrónica",
                    { text: "aruiz@cambiaygana.mx ", style: 'emailContrato'},
                    { text: "Esta solicitud se deberá de realizar una vez que haya concluido la vigencia del presente instrumento legal." },
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "OCTAVA.- VIGENCIA" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "El presente contrato tiene una vigencia de 30 días para ambas partes, iniciando la misma a partir del día siguiente en que se haya firmado el "+
                    "CONTRATO DE SUMINISTRO DE GAS NATURAL O LICUADO DE PETRÓLEO Y COMODATO DEL EQUIPO DE CONVERSIÓN de motores de gasolina a gas natural o gas "+
                    "licuado de petróleo referido anteriormente, así como la instalación del EQUIPO DE CONVERSIÓN de motores de gasolina a gas natural o gas licuado "+
                    "de petróleo en “EL VEHICULO”.",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "NOVENA.- EFECTOS DE LA TERMINACIÓN O RESCISIÓN DEL CONTRATO." , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "Al darse por concluido el presente contrato, conforme a lo establecido en la cláusula octava anterior, este contrato se tendrá por terminado "+
                    "automáticamente sin necesidad de notificación judicial alguna, tan pronto como ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "haga entrega de las cantidades que cubran los costos de las obligaciones previamente adquiridas por ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "con el proveedor de gas natural o gas licuado de petróleo así como la devolución del EQUIPO DE CONVERSIÓN por parte de ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true}, 
                    "que se instaló en “EL VEHICULO” a través de “EL PROGRAMA DE BENEFICIOS”, o en su defecto, se celebre el CONTRATO DE MEMBRESIA DEFINITIVA AL "+
                    "“PROGRAMA DE BENEFICIOS”, el “CONTRATO DE SUMINISTRO DE GAS NATURAL O GAS LICUADO DE PETRÓLEO Y COMPRAVENTA A PLAZOS” respectivo.",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "DÉCIMA.- RELACIÓN ENTRE “LAS PARTES”" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "El presente contrato no pretende y no deberá interpretarse en el sentido de que crea una relación de mandante y mandatario, poderdante y "+
                    "apoderado, agente, patrón y empleado, y/o socio o asociación entre ",
                    { text: "“EL O LA CONCESIONARIA” ", bold: true},"y ", 
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”", bold: true},
                    "”. Por tal motivo ninguna de “LAS PARTES” estará facultada para representar y obligar a la otra de manera alguna por virtud de este "+
                    "contrato, y cada una de “LAS PARTES” será responsable exclusivamente de sus propios actos. ",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "DÉCIMA PRIMERA.- CONFIDENCIALIDAD" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: 
                    "Para efectos de este contrato el término “Información Confidencial” significa cualquier información entregada por “LAS PARTES” en virtud "+
                    "de este contrato o en relación con “EL PROGRAMA DE BENEFICIOS”, su estructura, procedimientos, administración, los productos objeto del "+
                    "mismo, y toda la información contenida en los manuales, estudios, audios, gráficas y materiales electrónicos, y cualquier otro documento "+
                    "o comunicaciones orales o escritas.",
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: 
                    "Por lo anterior, “LAS PARTES” se obligan a guardar estricta confidencialidad respecto de la información entregada recíprocamente en virtud "+
                    "de este contrato y se obligan a responder del pago de daños y perjuicios que ocasionen a su contraparte por el incumplimiento a lo establecido "+
                    "en esta cláusula.",
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "DECIMA SEGUNDA.- CESIÓN DE DERECHOS" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: [
                    "“LAS PARTES” convienen expresamente que, ",
                    { text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS” ", bold: true},
                    "estará facultada para ceder total o parcialmente sus derechos conforme al presente contrato a cualquiera de sus subsidiarias y/o partes "+
                    "relacionadas, bastando para tal efecto la notificación que se haga llegar con 10 (diez) días de anticipación previos a la celebración del "+
                    "contrato de cesión de derechos que corresponda",
                ], 
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "DÉCIMA TERCERA.- NOTIFICACIONES Y DOMICILIOS" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },

            { 
                text: 
                    "Todos los avisos y notificaciones entre “LAS PARTES” deberán realizarse por escrito y ser entregados ya sea personalmente, o por correo "+
                    "electrónico con acuse de recibo, a los domicilios y correos que se precisan en este contrato, a no ser que “LAS PARTES” notifiquen por "+
                    "escrito su cambio de domicilio o correo electrónico.",
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: 
                    "Los avisos y notificaciones entre “LAS PARTES” se considerarán efectivamente recibidos por su destinatario, si se entregan personalmente "+
                    "y se firma acuse de recibo al momento de dicha entrega, así como si se envían por correo electrónico.",
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: 
                    "“LAS PARTES” señalan como sus respectivos domicilios convencionales y correo electrónico, para los efectos establecidos en esta "+
                    "Cláusula los siguientes:",
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: "“EL O LA CONCESIONARIA”:" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,0]
            },
            { text: "Domicilio: " + this.contrato.Domicilio, style: 'textosContrato', alignment: 'justify' },
            { text: "Dirección de correo electrónico: " + this.contrato.Email, style: 'textosContrato', alignment: 'justify' },
            { text: "Teléfono de contacto: " + this.contrato.Telefono, style: 'textosContrato', alignment: 'justify', margin: [0,10] },

            { 
                text: "“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”:" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,0]
            },
            { text: "Domicilio: " + "San Francisco 1529 int.101, Col. Tlacoquemecatl, alcaldía Benito Juárez, C.P. 03200, Ciudad de México, México.", 
              style: 'textosContrato', alignment: 'justify' },
            { text: [
                "Dirección de correo electrónico: ",
                { text: "itrujillo@cambiaygana.mx ", style: 'emailContrato'}, "; ",
                { text: "gmurrieta@cambiaygana.mx ", style: 'emailContrato', margin: [0,10]}
                ]
            },

            { 
                text: "DÉCIMA CUARTA. - ENCABEZADOS Y TÍTULOS" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: 
                    "Los encabezados y títulos contenidos en este Contrato se han usado únicamente para una fácil identificación y mejor entendimiento "+
                    "de las Cláusulas y términos, por lo que en ningún momento se entenderá que dichos encabezados o títulos limitan o alteran el acuerdo "+
                    "de “LAS PARTES”, contenido en el presente contrato.",
                style: 'textoContrato',
                margin: [0,10]
            },

            { 
                text: "DÉCIMA QUINTA.- JURISDICCIÓN" , 
                style: 'textosContrato', bold: true, alignment: 'justify', 
                margin: [0,10]
            },
            { 
                text: 
                    "Para cualquier controversia en la interpretación y cumplimiento de este contrato, “LAS PARTES” aceptan someterse a la jurisdicción "+
                    "de los tribunales competentes del Estado de Quintana Roo, renunciando a cualquier otra jurisdicción que por razón de sus domicilios "+
                    "presentes o futuros o por cualquier otra circunstancia pudiera corresponderles.",
                style: 'textoContrato',
                margin: [0,10]
            },
            { 
                text: [
                    "LEIDO QUE FUE EL PRESENTE CONTRATO, y conformes con los términos y condiciones que lo integran, “LAS PARTES” lo firman de conformidad "+
                    "en dos tantos, conservando cada una de ellas un ejemplar, en Isla Mujeres, Quinta Roo, México el día ", 
                    { text: fechaFirma.getDay() , decoration: 'underline', bold: true}, " de ",
                    { text: fechaFirma.toLocaleString('default', {month : 'long' }), decoration: 'underline', bold: true}, " de ",
                    { text: fechaFirma.getFullYear(), decoration: 'underline', bold: true},"."
                ],
                style: 'textoContrato',
                margin: [0,10]
            },
            {
                alignment : 'center',
                columns: [
                    {
                        width: 240,
                        alignment: 'center',
                        text : [
                            {
                                text: "“EL O LA CONCESIONARIA”\n\n\n\n\n\n", 
                                bold:true, 
                                alignment: 'center',
                                
                            },
                            {
                                text: "____________________________________\n", 
                                bold: true, 
                                alignment: 'center'
                            },
                            {
                                text: "C. NOMBRE Y FIRMA", 
                                alignment: 'center'
                            }
                        ] 
                    },
                    {
                        width: 220,
                        alignment: 'center',
                        text: [
                            {
                                text: "OPERADORA DE PROGRAMA DE BENEFICIOS SINDICAL, S.A. DE C.V.,\n", 
                                bold:true, 
                                alignment: 'center'
                            },
                            {
                                text: "Representada por\n\n\n\n",
                                alignment : 'center'
                            },
                            {
                                text: "____________________________________\n", 
                                bold: true, 
                                alignment: 'center'
                            },
                            {
                                text: "C. PEDRO RINCÓN RIVAS", 
                                alignment: 'center'
                            }
                        ]
                    }
                ],
               // margin : [0.20]
            },

            { 
                text: 
                    "TESTIGO DE \n“LA OPERADORA DEL PROGRAMA DE BENEFICIOS”",
                style: 'headersContrato',
                margin: [0,60]
            },
            {
                text: "____________________________________", 
                bold: true, 
                alignment: 'center'
            },
            {
                text: "C. PRISCILA GUILLERMINA MORALES ALARCÓN", 
                alignment: 'center'
            }

        ]
        return this.content;
    }
}
   

module.exports = pdfContratoTaxi;