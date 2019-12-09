export const createProducto = (producto) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({
            type: 'CREAR_PRODUCTO',
            producto: producto
        });
    }
};