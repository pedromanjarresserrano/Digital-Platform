
export const FormFields = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Actor Name'
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
    aka: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Aka'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Aka (Alias)',
        inline: true
    },
    edad: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Age'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Age',
        inline: true
    },
    altura: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Height'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Height',
        inline: true
    },
    /* genero: {
         elementType: 'select-model',
         elementConfig: {},
         apiUrlModel: '/api/generos/all/-1',
         optConfig: {},
         value: '',
         uiValue: {},
         validation: {
             required: false
         },
         valid: false,
         touched: false,
         labelField: 'name',
         label: 'Genero',
         inline: true
     },*/
    bio: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'bio'
        },
        optConfig: {},
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false,
        label: 'Biography',
        inline: true
    },
    imageAvatar: {
        elementType: 'file-image',
        elementConfig: {
            alt: 'Imagen Actor'
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