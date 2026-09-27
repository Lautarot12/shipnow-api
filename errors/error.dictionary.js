export const ERROR_TYPES = {
    PRODUCT_NOT_FOUND: {
     code: 'PRODUCT_NOT_FOUND',
     status: 404,  
     message: 'Producto no encontrado'   
    },
    
    DUPLICATE_PRODUCT_CODE: {
     code: 'DUPLICATE_PRODUCT_CODE',
     status: 409,
     message: 'Ya existe un producto con ese codigo'   
    },
    
    USER_NOT_FOUND: {
     code: 'USER_NOT_FOUND',
     status: 404,
     message: 'Usuario no encontrado'   
    },
    
    DUPLICATE_USER: {
     code: 'DUPLICATE_USER',
     status: 409,
     message: 'Ya existe un usuario con ese email'   
    },
    
    INVALID_MOCK_QUANTITY: {
     code: 'INVALID_MOCK_QUANTITY',
     status: 400,
     message: 'La cantidad de mocks es invalida'   
    },
    
    INVALID_DATA: {
     code: 'INVALID_DATA',
     status: 400,
     message: 'Datos invalidos'   
    },
    
    DATABASE_ERROR: {
     code: 'DATABASE_ERROR',
     status: 500,
     message: 'Error interno de base de datos'   
    },
    
    MOCK_GENERATION_ERROR: {
     code: 'MOCK_GENERATION_ERROR',
     status: 500,
     message: 'Error al generar los datos simulados'   
    },

    MISSING_REQUIRED_VARIABLE: {
        code: 'MISSING_REQUIRED_VARIABLE',
        status: 400,
        message: 'Falta una variable requerida para iniciar la aplicacion'
    },
    
    INVALID_CREDENTIALS: {
        code: 'INVALID_CREDENTIALS',
        status: 401,
        message: 'Credenciales invalidas'
    },

    CART_NOT_FOUND: {
        code: 'CART_NOT_FOUND',
        status: 404,
        message: 'Carrito no encontrado'
    },

    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        status: 401,
        message: 'No autorizado'
    },

    INVALID_TOKEN: {
        code: 'INVALID_TOKEN',
        status: 401,
        message: 'Token invalido'
    },

    FORBIDDEN: {
        code: 'FORBIDDEN',
        status: 403,
        message: 'Acceso denegado'
    },

    SESSION_UNAUTHORIZED: {
        code: 'SESSION_UNAUTHORIZED',
        status: 401,
        message: 'Debe iniciar sesion para acceder a este recurso'
    },

    INVALID_ID: {
        code: 'INVALID_ID',
        status: 400,
        message: 'El ID proporcionado no es valido'
    },

    INVALID_FILE_TYPE: {
        code: 'INVALID_FILE_TYPE',
        status: 400,
        message: 'El tipo de archivo no es valido'
    },

    FILE_TOO_LARGE: {
        code: 'FILE_TOO_LARGE',
        status: 400,
        message: 'El tamaño del archivo supera el maximo permitido'
    },
    
    MISSING_FILE: {
        code: 'MISSING_FILE',
        status: 400,
        message: 'Falta el archivo requerido'
    },

    INVALID_DOCUMENT_TYPE: {
        code: 'INVALID_DOCUMENT_TYPE',
        status: 400,
        message: 'El tipo de documento es invalido'
    },

    FILE_SAVE_ERROR: {
        code: 'FILE_SAVE_ERROR',
        status: 500,
        message: 'Error al guardar el archivo'
    },

    UNEXPECTED_FILE: {
        code: 'UNEXPECTED_FILE',
        status: 400,
        message: 'El campo del archivo no es valido'
    }
}