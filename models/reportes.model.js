/*

 Reporte 1 ===> Situación Actual Concesionarios

*/

const Reporte1Model = function(datReporte1) {
    this.IdPersona = datReporte1.IdPersona;
    this.Concesionario = datReporte1.Concesionario;
    this.Marca = datReporte1.Marca;
    this.Submarca = datReporte1.Submarca;
    this.Modelo = datReporte1.Modelo;
    this.VIN = datReporte1.VIN;
    this.Placa = datReporte1.Placa;
    this.Sindicato = datReporte1.Sindicato;
    this.PorcAhorroConcesion = datReporte1.PorcAhorroConcesion;
    this.PorcAhorroPropietario = datReporte1.PorcAhorroPropietario;
    this.PorcAhorroOperador = datReporte1.PorcAhorroOperador;
    this.FechaInicio = datReporte1.FechaInicio;
    this.FechaTermino = datReporte1.FechaTermino;
    this.TotalLitrosConsumir = datReporte1.TotalLitrosConsumir;
    this.TotalLitrosMes = datReporte1.TotalLitrosMes;
    this.LitrosConsumidos = datReporte1.LitrosConsumidos;
    this.LitrosXConsumir = datReporte1.LitrosXConsumir;
    this.ImporteBeneficiosConversion = datReporte1.ImporteBeneficiosConversion;
    this.TotalAhorro = datReporte1.TotalAhorro;
    this.TotalUtilizadoAhorro = datReporte1.TotalUtilizadoAhorro;
    this.TotalAhorroRestante = datReporte1.TotalAhorroRestante;

};

/*

 Reporte R01 ===> Reporte Resumen Consumo Estaciones

*/

const ReporteR01Model = function(datReporteR01) {
    this.Empresa = datReporteR01.Empresa;
    this.Estacion = datReporteR01.Estacion;
    this.Periodo = datReporteR01.Periodo;
    this.TotalMovimientos = datReporteR01.TotalMovimientos;
    this.Litros = datReporteR01.Litros;
    this.ImporteGas = datReporteR01.ImporteGas;
    this.ImporteCobrado = datReporteR01.ImporteCobrado;
};

/*

 Reporte R02 ===> Reporte Resumen Consumo Estaciones

*/

const ReporteR02Model = function(datReporteR02) {
    this.IdConcesionario = datReporteR02.IdConcesionario;
    this.Concesionario = datReporteR02.Concesionario;
    this.Marca = datReporteR02.Marca;
    this.Submarca = datReporteR02.Submarca;
    this.Modelo = datReporteR02.Modelo;
    this.VIN = datReporteR02.VIN;
    this.Placa = datReporteR02.Placa;
    this.Sindicato = datReporteR02.Sindicato;
    this.FechaContrato = datReporteR02.FechaContrato;
    this.DiasTranscurridos = datReporteR02.DiasTranscurridos;
    this.Aviso = datReporteR02.Aviso;
    
};

/*

 Reporte R03 ===> Reporte Analisis Situaciones Citas

*/

const ReporteR03Model = function(datReporteR03) {
    this.Fecha = datReporteR03.Fecha;
    this.Registros = datReporteR03.Registros;
    this.Alerta = datReporteR03.Alerta;    
};


/*

 Reporte R04 ===> Reporte Consumo litros completos con aportación del Ahorro

*/

const ReporteR04Model = function(datReporteR04) {
    this.Concesionario = datReporteR04.Concesionario;
    this.Marca = datReporteR04.Marca;
    this.Modelo = datReporteR04.Modelo;
    this.Serie = datReporteR04.Serie;
    this.Placa = datReporteR04.Placa;
    this.Sindicato = datReporteR04.Sindicato;
    this.PorcAhorroConcesion = datReporteR04.PorcAhorroConcesion;
    this.PorcAhorroPropietario = datReporteR04.PorcAhorroPropietario;
    this.FechaInicio = datReporteR04.FechaInicio;
    this.FechaCorte = datReporteR04.FechaCorte;
    this.ConsumoMes = datReporteR04.ConsumoMes;
    this.ConsumoTotal = datReporteR04.ConsumoTotal;
    this.AhorroUtilizado = datReporteR04.AhorroUtilizado;    
};

/*

 Reporte R05 ===> Reporte Consumo litros incompletos

*/

const ReporteR05Model = function(datReporteR05) {
    this.Concesionario = datReporteR05.Concesionario;
    this.Marca = datReporteR05.Marca;
    this.Modelo = datReporteR05.Modelo;
    this.Serie = datReporteR05.Serie;
    this.Placa = datReporteR05.Placa;
    this.Sindicato = datReporteR05.Sindicato;
    this.PorcAhorroConcesion = datReporteR05.PorcAhorroConcesion;
    this.PorcAhorroPropietario = datReporteR05.PorcAhorroPropietario;
    this.FechaInicio = datReporteR05.FechaInicio;
    this.FechaCorte = datReporteR05.FechaCorte;
    this.ConsumoMes = datReporteR05.ConsumoMes;
    this.ConsumoTotal = datReporteR05.ConsumoTotal;
    this.AhorroUtilizado = datReporteR05.AhorroUtilizado;
    this.LitrosPendientes = datReporteR05.LitrosPendientes;    
};

/*

 Reporte R06 ===> Reporte Beneficio Salud

*/

const ReporteR06Model = function(datReporteR06) {
    this.Concesionario = datReporteR06.Concesionario;
    this.Marca = datReporteR06.Marca;
    this.Modelo = datReporteR06.Modelo;
    this.Serie = datReporteR06.Serie;
    this.Placa = datReporteR06.Placa;
    this.Operador = datReporteR06.Operador; 
};

module.exports = {  Reporte1Model,
                    ReporteR01Model,
                    ReporteR02Model,
                    ReporteR03Model,
                    ReporteR04Model,
                    ReporteR05Model,
                    ReporteR06Model};
