import React from 'react';
import ReactDOM from 'react-dom';

import 'video-react/dist/video-react.css';
import './index.css';


import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Catalog from './components/public/catalog/Catalog.jsx';
import Header from './components/public/header/Header';
import Home from './components/public/home/home';
import MovieDetails from './components/public/movie-details/MovieDetails';
import Breadcrumb from './components/public/breadcrumb/Breadcrumb';
import Footer from './components/public/footer/Footer';
import Form from './components/admin/ui/form/Form';
import CrudView from './components/admin/ui/crudview/CrudView';
import HeaderAdmin from './components/admin/header/HeaderAdmin';
import Categories from './components/public/categories/Categories';
import CategorieDetails from './components/public/categorie-details/CategorieDetails';
import SidebarAdmin from './components/admin/sidebar/SidebarAdmin';
import BreadcrumbAdmin from './components/admin/breadcrumb/BreadcrumbAdmin';
import LoginAdmin from './components/admin/login/LoginAdmin';
import ActorDetails from './components/public/actors/actor-details/ActorDetails';
import Actors from './components/public/actors/actors/Actors';
import NotFound from './components/public/notfound/NotFound';
const Admin = ({ match }) => (
    <React.Fragment>
        <div className="wrapper">
            <nav className="main-header navbar navbar-expand navbar-white navbar-light"> <HeaderAdmin />
            </nav>
            <SidebarAdmin />
            <div className="content-wrapper">
                <BreadcrumbAdmin />
                <Switch>
                    <Route exact path={`${match.path}`} component={Home} />

                    <Route key="crud-genders" exact path={`${match.path}/genders`} render={(props) => (<CrudView {...props}
                        headers={[{
                            name: "name",
                            label: "Nombre"
                        }]}
                        baseRoute={`${match.path}"/genders/gender`}
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
                                genero: {
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
                                },
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
                                label: "Size file"
                            }, {
                                name: "year",
                                label: "Year"
                            }, {
                                name: "quality",
                                label: "Quality"
                            }, {
                                name: "portada",
                                label: "Imagen portada"
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
        </div>
    </React.Fragment>
);


const Public = ({ match }) => (
    <React.Fragment>

        <Header />
        <Breadcrumb />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route key="list-movies" exact path="/catalog" component={Catalog} />
            <Route key="list-movies" exact path="/catalog/:page" component={Catalog} />
            <Route key="catalogmovie" exact path="/catalog/movie" render={(props) => (<Redirect to="/catalog"  {...props} />)} />
            <Route key="movie" exact path="/catalog/movie/:id" component={MovieDetails} />
            <Route key="list-categories" exact path="/categories" component={Categories} />
            <Route key="categoriecategorie" exact path="/categories/categorie" render={(props) => (<Redirect to="/categories"  {...props} />)} />
            <Route key="categorie" exact path="/categories/categorie/:name" component={CategorieDetails} />
            <Route key="list-actors" exact path="/actors" component={Actors} />
            <Route key="actor" exact path="/actors/actor" render={(props) => (<Redirect to="/actors"  {...props} />)} />
            <Route key="actorn" exact path="/actors/actor/:name" component={ActorDetails} />
            <Route exact path="/index" component={Home} />
        </Switch>
        <Footer />
    </React.Fragment>
);

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/admin/login" component={LoginAdmin} />

        <Route path="/admin" component={Admin} />
        <Route path="/" component={Public} />
        <Route component={NotFound} />
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
