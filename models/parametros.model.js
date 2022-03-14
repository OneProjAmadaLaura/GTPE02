const ParametrosModel = function(datParametro) {
    this.IdUsuario = datParametro.IdUsuario;
    this.IdPersona = datParametro.IdPersona;
    this.IdVehiculo = datParametro.IdVehiculo;
    this.IdConcesionario = datParametro.IdConcesionario;
    this.TipoConsulta = datParametro.TipoConsulta;
    this.Estatus = datParametro.Estatus;
    this.IdSindicato = datParametro.IdSindicato;
    this.RFC = datParametro.RFC;
    this.TipoPersona = datParametro.TipoPersona;
    this.CP = datParametro.CP;
    this.IdMarca = datParametro.IdMarca;
    this.Placa = datParametro.Placa;
    this.FechaInstalacion = datParametro.FechaInstalacion;
    this.TipoVehiculo = datParametro.TipoVehiculo;
    this.FechaInicio = datParametro.FechaInicio;
    this.FechaFin = datParametro.FechaFin;

};


module.exports = { ParametrosModel };