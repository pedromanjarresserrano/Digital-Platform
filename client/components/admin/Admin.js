import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Axios from 'axios';
import HomeAdmin from './home/HomeAdmin';
import SidebarAdmin from './sidebar/SidebarAdmin';
import BreadcrumbAdmin from './breadcrumb/BreadcrumbAdmin';
import Form from './ui/form/Form';
import CrudView from './ui/crudview/CrudView';
import HeaderAdmin from './header/HeaderAdmin';
import NotFound from '../public/notfound/NotFound';
import ToastContainer from './ui/toastcontainer/ToastContainer';

import FooterAdmin from './footer/FooterAdmin';
import { kbToSize } from './utils/Utils';

export const Admin = ({ match }) => {
    return (
        <div className="sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
            <div className="wrapper">
                <nav className="main-header navbar navbar-expand navbar-white navbar-light"> <HeaderAdmin />
                </nav>
                <SidebarAdmin />
                <div className="content-wrapper">
                    <BreadcrumbAdmin />
                    <Switch>
                        <Route exact path={`${match.path}`} component={HomeAdmin} />
                        <Route key="crud-locations" exact path={`${match.path}/locations`} render={(props) => (<CrudView {...props}
                            headers={[{
                                name: "name",
                                label: "Nombre"
                            }, {
                                name: "url",
                                label: "Location"
                            }]}
                            baseRoute={`${match.path}/locations/location`}
                            baseUrl={'/api/location'}
                            extraAcciones={[
                                {
                                    name: "Procesar",
                                    className: "btn btn-sm btn-warning",
                                    onClick: function (data) {
                                        Axios.post("/api/movies/read", { path: data.url })
                                            .then(response => {
                                                //this.setState({ loading: false });
                                                //this.props.history.push('/');
                                            })
                                            .catch(error => {
                                                console.log(error);

                                            });
                                        alert("Loading")

                                    }
                                }
                            ]}
                        />)} />
                        <Route key="form-locations" exact path={`${match.path}/locations/location/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
                                    name: {
                                        elementType: 'input',
                                        elementConfig: {
                                            type: 'text',
                                            placeholder: 'Nombre'
                                        },
                                        optConfig: {},
                                        value: '',
                                        validation: {
                                            required: true
                                        },
                                        valid: false,
                                        touched: false,
                                        label: 'Nombre',
                                        inline: true
                                    },
                                    url: {
                                        elementType: 'input',
                                        elementConfig: {
                                            type: 'text',
                                            placeholder: 'Location'
                                        },
                                        optConfig: {},
                                        value: '',
                                        validation: {
                                            required: true
                                        },
                                        valid: false,
                                        touched: false,
                                        label: 'Location',
                                        inline: true
                                    }
                                }
                                }
                                baseUrl={'/api/location'}
                                formTitle={'Location data'}
                            />)} />

                        <Route key="crud-genders" exact path={`${match.path}/genders`} render={(props) => (<CrudView {...props}
                            headers={[{
                                name: "name",
                                label: "Nombre"
                            }]}
                            baseRoute={`${match.path}/genders/gender`}
                            baseUrl={'/api/generos'}

                        />)} />
                        <Route key="form-genders" exact path={`${match.path}/genders/gender/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
                                    name: {
                                        elementType: 'input',
                                        elementConfig: {
                                            type: 'text',
                                            placeholder: 'Gender Name'
                                        },
                                        optConfig: {},
                                        value: '',
                                        validation: {
                                            required: true
                                        },
                                        valid: false,
                                        touched: false,
                                        label: 'Nombre',
                                        inline: true
                                    },
                                    image: {
                                        elementType: 'file-image',
                                        elementConfig: {
                                            alt: 'Imagen genero'
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
                                }
                                }
                                baseUrl={'/api/generos'}
                                formTitle={'Gender data'}
                            />)} />

                        <Route key="crud-categories" exact path={`${match.path}/categories`} render={(props) => (<CrudView {...props}
                            headers={[{
                                name: "name",
                                label: "Nombre"
                            }]}
                            baseRoute={`${match.path}/categories/categorie`}
                            baseUrl={'/api/categorias'}

                        />)} />
                        <Route key="form-categories" exact path={`${match.path}/categories/categorie/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
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
                                }
                                }
                                baseUrl={'/api/categorias'}
                                formTitle={'Categorie data'}
                            />)} />


                        <Route key="crud-studios" exact path={`${match.path}/studios`} render={(props) => (<CrudView {...props}
                            headers={[{
                                name: "name",
                                label: "Nombre"
                            }]}
                            baseRoute={`${match.path}/studios/studio`}
                            baseUrl={'/api/studios'}

                        />)} />
                        <Route key="form-studios" exact path={`${match.path}/studios/studio/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
                                    name: {
                                        elementType: 'input',
                                        elementConfig: {
                                            type: 'text',
                                            placeholder: 'Studio Name'
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
                                    image: {
                                        elementType: 'file-image',
                                        elementConfig: {
                                            alt: 'Imagen studio'
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
                                }
                                }
                                baseUrl={'/api/studios'}
                                formTitle={'Studio data'}
                            />)} />

                        <Route key="crud-actores"
                            exact path={`${match.path}/actores`} render={(props) => (<CrudView {...props}
                                headers={[{
                                    name: "name",
                                    label: "Nombre"
                                }, {
                                    name: "aka",
                                    label: "Aka (Alias)"
                                }, {
                                    name: "edad",
                                    label: "Edad"
                                }, {
                                    name: "imageAvatar",
                                    label: "Imagen avatar"
                                }]}
                                baseRoute={`${match.path}/actores/actor`}
                                baseUrl={'/api/actores'}

                            />)} />
                        <Route key="form-actores" exact path={`${match.path}/actores/actor/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
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
                                            placeholder: 'Aka'
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
                                }
                                }
                                baseUrl={'/api/actores'}
                                formTitle={'Actor data'}
                            />)} />

                        <Route key="crud-movies"
                            exact path={`${match.path}/movies`} render={(props) => (<CrudView {...props}
                                headers={[{
                                    name: "name",
                                    label: "Nombre"
                                },{
                                    name: "visualname",
                                    label: "Visual Name"
                                }, {
                                    name: "duration",
                                    label: "Duration"
                                }, {
                                    name: "like",
                                    label: "Like"
                                }, {
                                    name: "view",
                                    label: "Views"
                                }, {
                                    name: "size",
                                    label: "Size file",
                                    converter: function(value){
                                        return kbToSize(value)
                                    }
                                }, {
                                    name: "year",
                                    label: "Year"
                                }, {
                                    name: "quality",
                                    label: "Quality"
                                }, {
                                    name: "portada",
                                    label: "Imagen portada"
                                },{
                                    name: "created",
                                    label: "Creado"
                                },{
                                    name: "updated",
                                    label: "Actualizado"
                                }]}
                                baseRoute={`${match.path}/movies/movie`}
                                baseUrl={'/api/movies'}

                            />)} />
                        <Route key="form-movies" exact path={`${match.path}/movies/movie/:action/:id`} render={(props) => (
                            <Form {...props}
                                formField={{
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
                                }
                                }
                                baseUrl={'/api/movies'}
                                formTitle={'Video data'}
                            />)} />

                        <Route key="form-movies" exact path={`${match.path}/*`} component={NotFound} />
                    </Switch>
                </div>
                <FooterAdmin />
                <ToastContainer />
            </div>
        </div>);
};

