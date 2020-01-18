{usuarios && usuarios.map(usuario => {
    return (
      <div key={usuario.id} className="animated slideInUpTiny animation-duration-3">
        <div className="user-list d-flex flex-row  card shadow">
          <div className="MuiAvatar-root user-avatar avatar-shadow">
            <img alt={usuario.nombre+" "+usuario.apellido} src={userImageDefault} className="MuiAvatar-img"></img>
          </div>
          <div className="description">
            <h5>{usuario.nombre} {usuario.apellido}</h5>
            {/* <h6>Android Developer</h6> */}
            <p className="text-muted">ID: {usuario.id}</p>
            <p className="text-muted">Dirección: {usuario.direccion}</p>
            <p className="text-muted">Teléfono: {usuario.telefono}</p>
            <p className="text-muted">Socio desde: {moment(usuario.fecha_socio.toDate()).calendar()}</p>
            {/* <ul className="list-inline d-sm-flex flex-sm-row jr-mbtn-list">
              <li><Button variant="contained" color="primary" >VER PERFIL</Button></li>
              <li><Button variant="contained" color="secondary" >ELIMINAR</Button></li>
            </ul> */}
            <div className="row ">
              <Button variant="contained" className="m-1" color="primary" >VER PERFIL</Button>
              <Button variant="contained" className="m-1" color="secondary" >ELIMINAR</Button>
            </div>
          </div>
        </div>
      </div>
    );
  })}