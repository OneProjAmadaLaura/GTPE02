const UsuarioAccesoModel = function(datUsuario) {
    this.IdUsuario = datUsuario.IdUsuario;
    this.Contrasenia = datUsuario.Contrasenia;
};

const UsuarioModel = function(datUsuario) {
    this.IdUsuario = datUsuario.IdUsuario;
    this.Nombre = datUsuario.Nombre;
    this.Contrasenia = datUsuario.Contrasenia;
    this.IdPerfil = datUsuario.IdPerfil;
    this.Perfil = datUsuario.Perfil;
    this.IdEmpleado = datUsuario.IdEmpleado;
};

const UsuarioTokenModel = function(datUsuario) {
    this.IdUsuario = datUsuario.IdUsuario;
    this.Nombre = datUsuario.Nombre;
    this.IdPerfil = datUsuario.IdPerfil;
    this.Perfil = datUsuario.Perfil;
};

const UsuarioFullModel = function(datUsuario) {
    this.IdUsuario           = datUsuario.IdUsuario;        
    this.Nombre              = datUsuario.Nombre;           
    this.Contrasenia         = datUsuario.Contrasenia;      
    this.IdEmpleado          = datUsuario.IdEmpleado;       
    this.IdPerfil            = datUsuario.IdPerfil;         
    this.Perfil              = datUsuario.Perfil;           
    this.FechaRegistro       = datUsuario.FechaRegistro;    
    this.Estatus             = datUsuario.Estatus;          
    this.email               = datUsuario.email;            
    this.Bloqueado           = datUsuario.Bloqueado;        
    this.Intentos            = datUsuario.Intentos;         
    this.UltimaTransaccion   = datUsuario.UltimaTransaccion;
    
};
module.exports = { UsuarioFullModel,
    UsuarioAccesoModel, UsuarioModel, UsuarioTokenModel };
