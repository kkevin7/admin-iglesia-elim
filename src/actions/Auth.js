import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    SIGNIN_FACEBOOK_USER,
    SIGNIN_FACEBOOK_USER_SUCCESS,
    SIGNIN_GITHUB_USER,
    SIGNIN_GITHUB_USER_SUCCESS,
    SIGNIN_GOOGLE_USER,
    SIGNIN_GOOGLE_USER_SUCCESS,
    SIGNIN_TWITTER_USER,
    SIGNIN_TWITTER_USER_SUCCESS,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    NUEVO_USUARIO,
    NUEVO_USUARIO_ERROR
} from "constants/ActionTypes";

export const userSignUp = user => {
    return {
        type: SIGNUP_USER,
        payload: user
    };
};
export const userSignIn = user => {
    return {
        type: SIGNIN_USER,
        payload: user
    };
};
export const userSignOut = () => {
    return {
        type: SIGNOUT_USER
    };
};
export const userSignUpSuccess = authUser => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: authUser
    };
};

export const userSignInSuccess = authUser => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: authUser
    };
};
export const userSignOutSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS
    };
};

export const showAuthMessage = message => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};

export const userGoogleSignIn = () => {
    return {
        type: SIGNIN_GOOGLE_USER
    };
};
export const userGoogleSignInSuccess = authUser => {
    return {
        type: SIGNIN_GOOGLE_USER_SUCCESS,
        payload: authUser
    };
};
export const userFacebookSignIn = () => {
    return {
        type: SIGNIN_FACEBOOK_USER
    };
};
export const userFacebookSignInSuccess = authUser => {
    return {
        type: SIGNIN_FACEBOOK_USER_SUCCESS,
        payload: authUser
    };
};
export const setInitUrl = url => {
    return {
        type: INIT_URL,
        payload: url
    };
};
export const userTwitterSignIn = () => {
    return {
        type: SIGNIN_TWITTER_USER
    };
};
export const userTwitterSignInSuccess = authUser => {
    return {
        type: SIGNIN_TWITTER_USER_SUCCESS,
        payload: authUser
    };
};
export const userGithubSignIn = () => {
    return {
        type: SIGNIN_GITHUB_USER
    };
};
export const userGithubSignInSuccess = authUser => {
    return {
        type: SIGNIN_GITHUB_USER_SUCCESS,
        payload: authUser
    };
};
export const showAuthLoader = () => {
    return {
        type: ON_SHOW_LOADER
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_LOADER
    };
};

export const nuevoUsuario = newUser => {
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
                    type: NUEVO_USUARIO_ERROR,
                    err
                });
            });

        if (signUpUser && signUpUser.message) {
            await dispatch({
                type: SHOW_MESSAGE,
                payload: signUpUser.message
            });
        } else {
            await firestore
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
                })
                .then(async () => {
                    await localStorage.setItem("user_id", signUpUser.user.uid);
                    await dispatch({
                        type: SIGNUP_USER_SUCCESS,
                        payload: signUpUser.user.uid
                    });
                });
        }

        return signUpUser;
    };
};

// export const nuevoUsuario = newUser => {
//     return async (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firebase = getFirebase();
//         const firestore = getFirestore();
//         const fecha = new Date(newUser.fecha_nacimiento);
//         let carnet = "";
//         carnet =
//             newUser.nombre.charAt(0) +
//             newUser.apellido.charAt(0) +
//             fecha.getDate() +
//             (fecha.getMonth() + 1) +
//             fecha.getFullYear();
//         carnet = carnet.toString().toUpperCase();

//         const signUpUser = await firebase
//             .auth()
//             .createUserWithEmailAndPassword(newUser.email, newUser.password);
//         if (signUpUser.message) {
//             await showAuthMessage(signUpUser.message);
//         } else {
//             const snapshotCarnet = await firestore
//                 .collection("usuarios")
//                 .where("carnet", ">=", carnet)
//                 .where("carnet", "<=", carnet + "\uf8ff")
//                 .get();
//             carnet += await (snapshotCarnet.size + 1).toString().padStart(3, "0");
//             await firestore
//                 .collection("usuarios")
//                 .doc(signUpUser.user.uid)
//                 .set({
//                     carnet: carnet,
//                     nombre: newUser.nombre,
//                     apellido: newUser.apellido,
//                     telefono: newUser.telefono,
//                     direccion: newUser.direccion,
//                     fecha_nacimiento: new Date(newUser.fecha_nacimiento),
//                     departamento: newUser.departamento,
//                     fecha_socio: new Date(newUser.fecha_socio),
//                     email: newUser.email,
//                     estado: true,
//                     rol: "Socio"
//                 }).then(async () => {
//                     localStorage.setItem('user_id', signUpUser.user.uid);
//                     await userSignUpSuccess(signUpUser.user.uid);
//                 });
//         }
//         return signUpUser;
//     };
// };
