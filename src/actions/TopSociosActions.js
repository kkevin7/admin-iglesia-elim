export const buscarTopSocios = (fechas) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const {fechaInicio, fechaFin } = fechas;
        let usuarios = [];
        let contribuciones = [];
        let contribucionesCuotas = [];
        let cuotas = [];
        let topSocios = [];

        const usuariosRef = await firestore.collection("usuarios");
        const contribucionesRef = await firestore.collection("contribuciones");
        const cuotasRef = await firestore.collection("cuotas");

        await usuariosRef
        // .where("rol", "==", "Socio")
        .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron usuarios.');
                    return;
                } else {
                    usuarios = await snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
                }
            })
            .catch(err => {
                console.log('Error al obtener los usuarios', err);
            });

        await contribucionesRef
        .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron contribuciones.');
                    return;
                } else {
                    contribuciones = await snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
                }
            })
            .catch(err => {
                console.log('Error al obtener las contribuciones', err);
            });

        await cuotasRef
        .where("fecha_pago", ">=", fechaInicio)
        .where("fecha_pago", "<=", fechaFin)
        .where("estado", "==", "PAGADA")
        .get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    console.log('No se encontraron cuotas.');
                    return;
                } else {
                    cuotas = await snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
                }
            })
            .catch(err => {
                console.log('Error al obtener las cuotas', err);
            });

        
        await contribuciones.forEach(contribucion => {
            const cuotasFilter = cuotas.filter(cuota => cuota.id_contribucion == contribucion.id && contribucion.carnet);
            if(cuotasFilter.length > 0){
                const totalPagado = cuotasFilter.reduce((total, pago) => {
                    return total + pago.valor;
                },0);
                contribucionesCuotas.push({
                    id_contribucion: contribucion.id,
                    id_usuario: contribucion.id_usuario,
                    carnet: contribucion.carnet,
                    totalPagado: totalPagado,
                    cantidadCuotas: cuotasFilter.length,
                })
            }
        });

        await usuarios.forEach(usuario => {
            const contribucionesFilter = contribucionesCuotas.filter(contribucionesCuota => usuario.carnet == contribucionesCuota.carnet && usuario.carnet);
            if(contribucionesFilter.length >0){
                const cantidadCuotas = contribucionesFilter.reduce((total, contribucion) => {
                    return total + contribucion.cantidadCuotas;
                },0);
                const totalPagado = contribucionesFilter.reduce((total, contribucion) => {
                    return total + contribucion.totalPagado;
                },0);
                topSocios.push({
                    id_usuario: usuario.id_usuario,
                    carnet: usuario.carnet,
                    totalPagado: totalPagado,
                    cantidadCuotas: cantidadCuotas,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                })
            }
        })

        // await contribucionesCuotas.forEach(contribucionesCuota => {
        //     const usuariosFilter = usuarios.filter(usuario => usuario.carnet == contribucionesCuota.carnet && usuario.carnet);
        //     if(usuariosFilter.length > 0){
        //         topSocios.push({
        //             ...contribucionesCuota,
        //             nombre: usuariosFilter[0].nombre,
        //             apellido: usuariosFilter[0].apellido,
        //         })
        //     }
        // })

        await topSocios.sort(function (a,b){
            if(a.totalPagado < b.totalPagado){
                return 1;
            }
            if(a.totalPagado > b.totalPagado){
                return -1;
            }
            return 0;
        });

        await dispatch({
            type: "TOP_SOCIOS",
            topSocios
          });

    };
}
