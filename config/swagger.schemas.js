export const schemas = {
    User: {
        type: 'object',
        properties: {
            first_name: {
                type: 'string',
                example: 'Juan'
            },
            last_name: {
                type: 'string',
                example: 'Perez'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'juan@email.com'
            },
            password: {
                type: 'string',
                writeOnly: true,
                example: 'password123'
            },
            role: {
                type: 'string',
                example: 'user'
            },
            provider: {
                type: 'string',
                example: 'local'
            },
            documents: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Document'
                }
            }
        }
    },

    Product: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                example: 'Intelligent Bronze Bacon'
            },
            description: {
                type: 'string',
                example: 'Producto de prueba'
            },
            code: {
                type: 'string',
                example: 'ABC123'
            },
            price: {
                type: 'number',
                example: 1500
            },
            stock: {
                type: 'number',
                example: 20
            },
            status: {
                type: 'boolean',
                example: true
            },
            category: {
                type: 'string',
                example: 'frescos'
            }
        }
    },

    Cart: {
        type: 'object',
        properties: {
            products: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/CartItem'
                }
            }
        }
    },

    CartItem: {
        type: 'object',
        properties: {
            product: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
            },
            quantity: {
                type: 'number',
                example: 2
            }
        }
    },

    ErrorResponse: {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'error'
            },
            code: {
                type: 'string',
                example: 'INVALID_FILE_TYPE'
            },
            message: {
                type: 'string',
                example: 'El tipo de archivo no es valido'
            }
        }
    },

    SuccessResponse: {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'success'
            },
            message: {
                type: 'string',
                example: 'Operación realizada correctamente'
            },
            payload: {
                type: 'object',
                nullable: true
            }
        }
    },

    Document: {
        type: 'object',
        properties: {
            originalName: {
                type: 'string',
                example: 'document.pdf'
            },
            fileName: {
                type: 'string',
                example: '1727891234567-document.pdf'
            },
            path: {
                type: 'string',
                example: 'uploads/users/1727891234567-document.pdf'
            },
            mimeType: {
                type: 'string',
                example: 'application/pdf'
            },
            size: {
                type: 'number',
                example: 245678
            },
            type: {
                type: 'string',
                enum: ['DNI', 'PASAPORTE', 'LICENCIA'],
                example: 'DNI'
            },
            uploadedAt: {
                type: 'string',
                format: 'date-time'
            } 
        }
    }
}