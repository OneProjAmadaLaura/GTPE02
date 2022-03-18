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
                  HGasolinaModel };
