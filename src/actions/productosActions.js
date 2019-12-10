export const createProducto = (producto) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({
            type: 'CREATE_PRODUCTO',
            producto: producto
        });
    }
};