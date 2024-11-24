
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
    parts: {
        elementType: 'select-model',
        elementConfig: {},
        optConfig: {
            multiple: true
        },
        apiUrlModel: '/api/movies/all/-1',
        value: [],
        uiValue: {},
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        labelField: 'name',
        label: 'Movies',
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