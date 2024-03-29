import { admin } from "../firebase/firebase";

export const signIn = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    return await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS"
        }).catch(err => {
          dispatch({
            type: "LOGIN_ERROR",
            err
          });
        });
      });
  };
};

export const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    return await firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const registrarUsuario = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const fecha = new Date(newUser.fecha_nacimiento);
    let carnet = "";
    carnet =
      newUser.nombre.charAt(0) +
      newUser.apellido.charAt(0) +
      fecha.getDate() +
      (fecha.getMonth() + 1) +
      fecha.getFullYear();
    carnet = carnet.toString().toUpperCase();

    const signUpUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .catch(async err => {
        await dispatch({
          type: "NUEVO_USUARIO_ERROR",
          err
        });
      });

    if (signUpUser && signUpUser.message) {
      await dispatch({
        type: "SHOW_MESSAGE",
        payload: signUpUser.message
      });
      return false;
    } else if (signUpUser) {
      return await firestore
        .collection("usuarios")
        .where("carnet", ">=", carnet)
        .where("carnet", "<=", carnet + "\uf8ff")
        .get()
        .then(async snapshotUsuarios => {
          carnet += await (snapshotUsuarios.size + 1)
            .toString()
            .padStart(3, "0");
          await firestore
            .collection("usuarios")
            .doc(signUpUser.user.uid)
            .set({
              carnet: carnet,
              nombre: newUser.nombre,
              apellido: newUser.apellido,
              telefono: newUser.telefono,
              direccion: newUser.direccion,
              fecha_nacimiento: new Date(newUser.fecha_nacimiento),
              departamento: newUser.departamento,
              fecha_socio: new Date(newUser.fecha_socio),
              email: newUser.email,
              estado: true,
              rol: "Socio"
            });
          return true;
        })
        .then(async resp => {
          await dispatch({
            type: "REGISTRAR_USUARIO_SUCCESS"
          });
          return true;
        })
        .catch(async err => {
          await dispatch({
            type: "REGISTRAR_USUARIO_ERROR",
            err
          });
          return false;
        });
    }else{
      return false;
    }
  };
};

export const replaceUsuario = usuario => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const {
      id,
      carnet,
      nombre,
      apellido,
      telefono,
      direccion,
      fecha_nacimiento,
      departamento,
      fecha_socio,
      email
    } = usuario;

    const signUpUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .catch(async err => {
        await dispatch({
          type: "NUEVO_USUARIO_ERROR",
          err
        });
      });

    if (signUpUser && signUpUser.message) {
      await dispatch({
        type: "SHOW_MESSAGE",
        payload: signUpUser.message
      });
    } else if (signUpUser) {
      //Create User
      await firestore
        .collection("usuarios")
        .doc(signUpUser.user.uid)
        .set({
          carnet: carnet,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          direccion: direccion,
          fecha_nacimiento: new Date(fecha_nacimiento.toDate()),
          departamento: departamento,
          fecha_socio: new Date(fecha_socio.toDate()),
          email: email,
          estado: true,
          rol: "Socio"
        })
        .then(async resp => {
          await dispatch({
            type: "REGISTRAR_USUARIO_SUCCESS"
          });
          return resp;
        })
        .catch(async err => {
          await dispatch({
            type: "REGISTRAR_USUARIO_ERROR",
            err
          });
          return false;
        });

      //Delete User
      await firestore
        .delete({
          collection: "usuarios",
          doc: id
        })
        .then(async () => {
          await dispatch({
            type: "DELETE_USUARIO_SUCCESS"
          });
        })
        .catch(async err => {
          await dispatch({
            type: "DELETE_USUARIO_ERROR",
            err
          });
        });

      // //Exit
      // await firebase
      //   .auth()
      //   .signOut()
      //   .then(() => {
      //     dispatch({ type: "SIGNOUT_SUCCESS" });
      //   });

        return await true;

    }else{
      return false;
    }
  };
};

export const registrarUsuarioSinCorreo = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const fecha = new Date(newUser.fecha_nacimiento);
    let carnet = "";
    carnet =
      newUser.nombre.charAt(0) +
      newUser.apellido.charAt(0) +
      fecha.getDate() +
      (fecha.getMonth() + 1) +
      fecha.getFullYear();
    carnet = carnet.toString().toUpperCase();
    return await firestore
      .collection("usuarios")
      .where("carnet", ">=", carnet)
      .where("carnet", "<=", carnet + "\uf8ff")
      .get()
      .then(async snapshotUsuarios => {
        carnet += await (snapshotUsuarios.size + 1).toString().padStart(3, "0");
        await firestore.collection("usuarios").add({
          carnet: carnet,
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          telefono: newUser.telefono,
          direccion: newUser.direccion,
          fecha_nacimiento: new Date(newUser.fecha_nacimiento),
          departamento: newUser.departamento,
          fecha_socio: new Date(newUser.fecha_socio),
          email: newUser.email,
          estado: true,
          rol: "Socio"
        });
        return carnet;
      })
      .then(async resp => {
        await dispatch({
          type: "REGISTRAR_USUARIO_SIN_CORREO_SUCCESS"
        });
        return resp;
      })
      .catch(async err => {
        await dispatch({
          type: "REGISTRAR_USUARIO_SIN_CORREO_ERROR",
          err
        });
      });
  };
};

export const editUser = usuario => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const editUsuario = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      fecha_nacimiento: new Date(usuario.fecha_nacimiento),
      departamento: usuario.departamento,
      fecha_socio: new Date(usuario.fecha_socio)
    };
    return await firestore
      .update(
        {
          collection: "usuarios",
          doc: usuario.id
        },
        editUsuario
      )
      .then(async () => {
        await dispatch({
          type: "EDIT_USUARIO_SUCCESS"
        });
      })
      .catch(async err => {
        await dispatch({
          type: "EDIT_USUARIO_ERROR",
          err
        });
      });
  };
};

export const deleteOnlyUser = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    return await firestore
      .delete({
        collection: "usuarios",
        doc: id
      })
      .then(async () => {
        await dispatch({
          type: "DELETE_USUARIO_SUCCESS"
        });
      })
      .catch(async err => {
        await dispatch({
          type: "DELETE_USUARIO_ERROR",
          err
        });
      });
  };
};

export const darBajaUser = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    return await firestore
      .update(
        {
          collection: "usuarios",
          doc: id
        },
        {
          estado: false
        }
      )
      .then(async () => {
        await dispatch({
          type: "DAR_BAJA_USUARIO_SUCCESS"
        });
      })
      .catch(async err => {
        await dispatch({
          type: "DAR_BAJA_USUARIO_ERROR",
          err
        });
      });
  };
};

export const reactivarUser = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    return await firestore
      .update(
        {
          collection: "usuarios",
          doc: id
        },
        {
          estado: true
        }
      )
      .then(async () => {
        await dispatch({
          type: "REACTIVAR_USUARIO_SUCCESS"
        });
      })
      .catch(async err => {
        await dispatch({
          type: "REACTIVAR_USUARIO_ERROR",
          err
        });
      });
  };
};

// export const deleteUserWithEmail = uid => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     // const firebase = getFirebase();
//     console.log(admin);
//     admin.auth().deleteUser(uid)
//     .then(function() {
//       console.log('Successfully deleted user');
//     })
//     .catch(function(error) {
//       console.log('Error deleting user:', error);
//     });
//   }
// }

export const birthdaysMes = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    let usuarios = [];

    await firestore
      .collection("usuarios")
      .where("estado", "==", true)
      .orderBy("fecha_nacimiento", "asc")
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          console.log("No hay registros.");
          return;
        } else {
          usuarios = snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
        }
      })
      .catch(async error => {
        await dispatch({
          type: "BIRTHDAYS_ERROR",
          error
        });
      });

    usuarios = await usuarios.filter(usuario => {
      try {
        return (
          usuario.fecha_nacimiento.toDate().getMonth() == new Date().getMonth()
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    });

    await dispatch({
      type: "BIRTHDAYS",
      birthdays: usuarios
    });
  };
};

export const updateUserRol = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { id, rol } = user;

    return await firestore
      .update(
        {
          collection: "usuarios",
          doc: id
        },
        {
          rol: rol
        }
      )
      .then(async () => {
        await dispatch({
          type: "UPDATE_USUARIO_ROL_SUCCESS"
        });
      })
      .catch(async error => {
        console.log(error);
        await dispatch({
          type: "UPDATE_USUARIO_ROL_ERROR",
          error
        });
      });
  };
};
