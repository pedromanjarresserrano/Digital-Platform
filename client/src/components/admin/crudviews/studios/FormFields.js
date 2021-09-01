
export const FormFields = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Categoria Name'
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
    }, alias: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Categoria alias'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Alias',
        inline: true
    },
    image: {
        elementType: 'file-image',
        elementConfig: {
            alt: 'Imagen categoria'
        },
        optConfig: {},
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