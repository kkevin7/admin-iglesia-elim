export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
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
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const registrarUsuario = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('usuarios').doc(resp.user.uid).set({
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                telefono: newUser.telefono,
                direccion: newUser.direccion,
                fecha_nacimiento: newUser.fecha_nacimiento,
                departamento: newUser.departamento,
                fecha_socio: newUser.fecha_socio
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