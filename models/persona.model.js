const PersonaModel = function(datPersona) {
    this.IdUsuario = datPersona.IdUsuario;
    this.IdConcesionario = datPersona.IdConcesionario;
    this.IdPropietario = datPersona.IdPropietario;
    this.IdPersona = datPersona.IdPersona;
    this.Nombre = datPersona.Nombre;
    this.Paterno = datPersona.Paterno;
    this.Materno = datPersona.Materno;
    this.RFC = datPersona.RFC;
    this.CURP = datPersona.CURP;
    this.IdIdentificacion = datPersona.IdIdentificacion;
    this.FolioIdentificacion = datPersona.FolioIdentificacion;
    this.FechaNacimiento = datPersona.FechaNacimiento;
    this.TipoPersona = datPersona.TipoPersona;
    this.Genero = datPersona.Genero;
    this.EstadoCivil = datPersona.EstadoCivil;
    this.Calle = datPersona.Calle;
    this.Exterior = datPersona.Exterior;
    this.Interior = datPersona.Interior;
    this.CP = datPersona.CP;
    this.IdColonia = datPersona.IdColonia;
    this.Colonia = datPersona.Colonia;
    this.Municipio = datPersona.Municipio;
    this.EntidadFederativa = datPersona.EntidadFederativa;
    this.Telefono = datPersona.Telefono;
    this.Celular = datPersona.Celular;
    this.email = datPersona.email;
    this.IdSindicato = datPersona.IdSindicato;
    this.IdAsignacionSindicato = datPersona.IdAsignacionSindicato;
    this.NumeroConcesion = datPersona.NumeroConcesion;
    this.IdVehiculo = datPersona.IdVehiculo;
    this.IdOperador = datPersona.IdOperador;
    this.Licencia = datPersona.Licencia;
    this.Estatus = datPersona.Estatus;
};

const ConcesionarioPreRegModel = function(datConcesionario) {
    this.IdConcesionario = datConcesionario.IdConcesionario;
    this.Nombre = datConcesionario.Nombre;
    this.Paterno = datConcesionario.Paterno;
    this.Materno = datConcesionario.Materno;
    this.NombreCompleto = datConcesionario.NombreCompleto;
    this.FechaRegistro = datConcesionario.FechaRegistro;
    this.IdVehiculo = datConcesionario.IdVehiculo;
    this.IdMarca = datConcesionario.IdMarca;
    this.Marca = datConcesionario.Marca;
    this.IdSubmarca = datConcesionario.IdSubmarca;
    this.Submarca = datConcesionario.Submarca;
    this.Modelo = datConcesionario.Modelo;
    this.Placa = datConcesionario.Placa;
    this.IdPropietario = datConcesionario.IdPropietario;
    this.IdCita = datConcesionario.IdCita;
    this.FechaCita = datConcesionario.FechaCita;
    this.IdDictamen = datConcesionario.IdDictamen;
    this.Dictamen = datConcesionario.Dictamen;
    this.EstatusCita = datConcesionario.EstatusCita;
    this.Dictaminar = datConcesionario.Dictaminar;
};

const ConcesionarioRegModel = function(datConcesionario) {
    this.IdConcesionario = datConcesionario.IdConcesionario;
    this.NombreConcesionario = datConcesionario.NombreConcesionario;
    this.FechaRegistro = datConcesionario.FechaRegistro;
    this.IdVehiculo = datConcesionario.IdVehiculo;
    this.Marca = datConcesionario.Marca;
    this.Submarca = datConcesionario.Submarca;
    this.Modelo = datConcesionario.Modelo;
    this.Placa = datConcesionario.Placa;
    this.Estatus = datConcesionario.Estatus;
    this.IdSindicato = datConcesionario.IdSindicato;
    this.Sindicato = datConcesionario.Sindicato;
    this.IdAsignacionSindicato = datConcesionario.IdAsignacionSindicato;
    this.FechaInstalacion = datConcesionario.FechaInstalacion;
    this.EditaContrato = datConcesionario.EditaContrato;
    this.EditaDocumentos = datConcesionario.EditaDocumentos;
};

module.exports = { PersonaModel, ConcesionarioPreRegModel, ConcesionarioRegModel };