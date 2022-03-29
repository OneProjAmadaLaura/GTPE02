const DictamenesModel = function(datDictamenes) {
    this.IdDictamen = datDictamenes.IdDictamen;
    this.Nombre = datDictamenes.Nombre;
    this.Estatus = datDictamenes.Estatus;
};

const PerfilesModel = function(datPerfiles) {
    this.IdPerfil = datPerfiles.IdPerfil;
    this.Descripcion = datPerfiles.Descripcion;
    this.FechaRegistro = datPerfiles.FechaRegistro;
    this.Estatus = datPerfiles.Estatus;
};

const EntidadesModel = function(datEntidades) {
    this.IdEntidadFederal = datEntidades.IdEntidadFederal;
    this.Nombre = datEntidades.Nombre;
    this.Abreviacion = datEntidades.Abreviacion;
};

const FormalizadosModel = function(datFormalizados) {
    this.IdContrato = datFormalizados.IdContrato;
    this.IdConcesionario = datFormalizados.IdConcesionario;
    this.NumeroConcesion = datFormalizados.NumeroConcesion;
    this.Concesionario = datFormalizados.Concesionario;
    this.email = datFormalizados.email;
    this.Telefono = datFormalizados.Telefono;
    this.FechaInicio = datFormalizados.FechaInicio;
    this.FechaTermino = datFormalizados.FechaTermino;
    this.ConsumoMes = datFormalizados.ConsumoMes;
    this.Periodos = datFormalizados.Periodos;
    this.FechaContrato = datFormalizados.FechaContrato;
    this.Empresa = datFormalizados.Empresa;
    this.TipoConvertidor = datFormalizados.TipoConvertidor;
    this.Convertidor = datFormalizados.Convertidor;
    this.TipoVehiculo = datFormalizados.TipoVehiculo;
    this.Vehiculo = datFormalizados.Vehiculo;
    this.LitrosConsumidos = datFormalizados.LitrosConsumidos;
    this.LitroXConsumir = datFormalizados.LitroXConsumir;
    this.PorcentajeConsumo = datFormalizados.PorcentajeConsumo;   
};
const FormalizadosModelQ = function(datFormalizados) {
    this.IdEmpresa = datFormalizados.IdEmpresa;
};
const HGasModel = function(datHistoricoGas) {
    this.IdHistoricoGas = datHistoricoGas.IdHistoricoGas;	
    this.FechaAlta = datHistoricoGas.FechaAlta;			 
    this.FechaDesde = datHistoricoGas.FechaDesde; 		
    this.FechaHasta = datHistoricoGas.FechaHasta;		 
    this.IdEntidadFederal =	datHistoricoGas.IdEntidadFederal; 
    this.IdMunicipio = datHistoricoGas.IdMunicipio; 		
    this.PrecioKg = datHistoricoGas.PrecioKg; 			
    this.PrecioLtr = datHistoricoGas.PrecioLtr;
    this.NombreE = datHistoricoGas.NombreE; 
    this.NombreM = datHistoricoGas.NombreM; 
};

const HGasolinaModel = function(datHistoricoGasolina) {
    this.IdHistoricoGasolina = datHistoricoGasolina.IdHistoricoGasolina;	
    this.FechaAlta = datHistoricoGasolina.FechaAlta;			 
    this.FechaDesde = datHistoricoGasolina.FechaDesde; 		
    this.FechaHasta = datHistoricoGasolina.FechaHasta;		 
    this.IdEntidadFederal =	datHistoricoGasolina.IdEntidadFederal; 
    this.IdMunicipio = datHistoricoGasolina.IdMunicipio; 		
    this.PrecioLtr = datHistoricoGasolina.PrecioLtr;
    this.NombreE = datHistoricoGasolina.NombreE; 
    this.NombreM = datHistoricoGasolina.NombreM; 
};

module.exports = { DictamenesModel,
                  PerfilesModel,
                  EntidadesModel,
                  HGasModel, 
                  HGasolinaModel,
                  FormalizadosModel,
                  FormalizadosModelQ };
