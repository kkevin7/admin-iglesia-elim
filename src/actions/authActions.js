export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        return await firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({
                type: 'LOGIN_SUCCESS'
            }).catch((err) => {
                dispatch({
                    type: 'LOGIN_ERROR', err
                })
            })
        })
    }
}

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        return await firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const registrarUsuario = (newUser) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const fecha = new Date(newUser.fecha_nacimiento);
        let carnet = "";
        carnet = (newUser.nombre).charAt(0) + (newUser.apellido).charAt(0) + fecha.getDate() + (fecha.getMonth() + 1) + fecha.getFullYear();
        carnet = (carnet.toString()).toUpperCase();
        return await firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(async (resp) => {
            // return await firestore.collection('usuarios').orderBy('carnet').startAt(carnet).endAt(carnet+ "\uf8ff");
            return await firestore.collection('usuarios').where('carnet', '>=', carnet).where('carnet', '<=', carnet+'\uf8ff').get()
                .then((snapshotUsuarios) => {
                    carnet += (snapshotUsuarios.size + 1).toString().padStart(3, "0");
                    return firestore.collection('usuarios').doc(resp.user.uid).set({
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
                        rol: 'Socio'
                    })
                })
        }).then(() => {
            dispatch({
                type: 'REGISTRAR_USUARIO_SUCCESS'
            })
        }).catch(err => {
            dispatch({
                type: 'REGISTRAR_USUARIO_ERROR', err
            })
        })
    }
}

export const registrarUsuarioSinCorreo = (newUser) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const fecha = new Date(newUser.fecha_nacimiento);
        let carnet = "";
        carnet = (newUser.nombre).charAt(0) + (newUser.apellido).charAt(0) + fecha.getDate() + (fecha.getMonth() + 1) + fecha.getFullYear();
        carnet = (carnet.toString()).toUpperCase();
        // return await firestore.collection('usuarios').orderBy('carnet').startAt(carnet).endAt(carnet+ "\uf8ff");
         return await firestore.collection('usuarios').where('carnet', '>=', carnet).where('carnet', '<=', carnet+'\uf8ff').get()
            .then(async (snapshotUsuarios) => {
                carnet += (snapshotUsuarios.size + 1).toString().padStart(3, "0");
                return await firestore.collection('usuarios').add({
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
                    rol: 'Socio'
                })
            }).then(() => {
                dispatch({
                    type: 'REGISTRAR_USUARIO_SIN_CORREO_SUCCESS'
                })
            }).catch(err => {
                dispatch({
                    type: 'REGISTRAR_USUARIO_SIN_CORREO_ERROR',
                    err
                })
            })
    }
}