
export const FormFields = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Movie Name'
        },
        optConfig: {},
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        label: 'Name',
        inline: true
    },
    visualname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Visualname Name'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Visual Name',
        inline: true
    },
    url: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'url of file'
        },
        optConfig: {},
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        label: 'File URL',
        inline: true
    },
    duration: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Duration',
            step: "any"
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Duration',
        inline: true
    },
    like: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Likes'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Likes',
        inline: true
    },
    view: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'View'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'View',
        inline: true
    },
    size: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Size file',
            step: "any"
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Size file',
        inline: true
    },
    year: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Year'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Year',
        inline: true
    },
    quality: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Quality'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Quality',
        inline: true
    },
    reparto: {
        elementType: 'select-model',
        elementConfig: {},
        optConfig: {
            multiple: true
        },
        apiUrlModel: '/api/actores/all/-1',
        value: [],
        uiValue: {},
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        labelField: 'name',
        label: 'Reparto',
        inline: true
    },
    categorias: {
        elementType: 'select-model',
        elementConfig: {},
        optConfig: {
            multiple: true
        },
        apiUrlModel: '/api/categorias/all/-1',
        value: [],
        uiValue: {},
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        labelField: 'name',
        label: 'Categorias',
        inline: true
    },
    portada: {
        elementType: 'file-image',
        elementConfig: {
            alt: 'Imagen portada'
        },
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: '',
        inline: false
    }
};