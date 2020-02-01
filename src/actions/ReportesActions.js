export const reportProductosColocados = fechas => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { fechaInicio, fechaFin } = fechas;
    let productos = [];
    let ventas = [];
    let productosVentas = [];
    let productosColocados = [];

    const productosRef = await firestore.collection("productos");
    const ventasRef = await firestore.collection("ventas");

    await productosRef
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron productos.");
          return;
        } else {
          productos = await snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
        }
      })
      .catch(err => {
        console.log("Error al obtener los productos", err);
      });

    await ventasRef
      .where("fecha_venta", ">=", fechaInicio)
      .where("fecha_venta", "<=", fechaFin)
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron ventas.");
          return;
        } else {
          ventas = await snapshot.docs.map(item => {
            item.data().pedido.forEach(producto => {
              productosVentas.push(producto);
            });
            return item.data().pedido;
          });
        }
      })
      .catch(err => {
        console.log("Error al obtener los ventas", err);
      });

    await productos.forEach(producto => {
      const productoFilter = productosVentas.filter(
        venta => venta.id == producto.id
      );
      if (productoFilter.length > 0) {
        const cantidadTotal = productoFilter.reduce((total, pv) => {
          return total + pv.cantidad;
        }, 0);
        const totalPagado = productoFilter.reduce((total, pv) => {
          return total + pv.cantidad * pv.precio;
        }, 0);
        productosColocados.push({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          cantidad: cantidadTotal,
          precio: producto.precio,
          total: totalPagado
        });
      }
    });

    await dispatch({
      type: "REPORTE_PRODUCTOS_COLOCADOS",
      productosColocados: productosColocados
    });
  };
};

export const reportCuotasGeneradas = fechas => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { fechaInicio, fechaFin } = fechas;
    let cuotas = [];
    let totalCuotas = 0;

    const cuotasRef = await firestore.collection("cuotas");
    await cuotasRef
      .where("fecha_pago", ">=", fechaInicio)
      .where("fecha_pago", "<=", fechaFin)
      .where("estado", "==", "PAGADA")
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron cuotas.");
          await dispatch({
            type: "REPORTE_CUOTAS_NOT_FOUND",
            cuotas: {}
          });
        } else {
          cuotas = await snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
          await dispatch({
            type: "REPORTE_CUOTAS_GENERADAS",
            cuotas,
          });
        }
      })
      .catch(async error => {
        console.log("Error al obtener las cuotas", error);
        await dispatch({
          type: "REPORTE_CUOTAS_GENERADAS",
          error
        });
      });
  };
};

export const reportDevoluciones = fechas => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { fechaInicio, fechaFin } = fechas;
    let devoluciones = [];
    let totalDevoluciones = 0;

    const devolucionesRef = await firestore.collection("devoluciones");
    await devolucionesRef
      .where("fecha", ">=", fechaInicio)
      .where("fecha", "<=", fechaFin)
      .where("estado", "==", "REALIZADA")
      .get()
      .then(async snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron devoluciones.");
          await dispatch({
            type: "REPORTE_DEVOLUCIONES_NOT_FOUND",
            devoluciones: {},
          });
        } else {
          devoluciones = await snapshot.docs.map(item => ({
            id: item.id,
            ...item.data()
          }));
          await dispatch({
            type: "REPORTE_DEVOLUCIONES_REALIZADAS",
            devoluciones,
          });
        }
      })
      .catch(async error => {
        console.log("Error al obtener las devoluciones", error);
        await dispatch({
          type: "REPORTE_DEVOLUCIONES_REALIZADAS_ERROR",
          error
        });
      });
  };
};
