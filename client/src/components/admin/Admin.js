import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import './Admin.css'
import Axios from 'axios';
import HomeAdmin from './home/HomeAdmin';
import FooterAdmin from './footer/FooterAdmin';
import SidebarAdmin from './sidebar/SidebarAdmin';
import BreadcrumbAdmin from './breadcrumb/BreadcrumbAdmin';
import Form from './ui/form/Form';
import CrudView from './ui/crudview/CrudView';
import HeaderAdmin from './header/HeaderAdmin';
import NotFound from '../public/panels/notfound/NotFound';
import ToastContainer from './ui/toastcontainer/ToastContainer';

import { dateFormat } from '../../utils/Utils';
import { AuthContext } from './auth/AuthContext';
import Duplicates from './Duplicates';
import CrudGridView from './ui/crudview/CrudGridView';
import { TableActions as TableActionsMovies, TopActions as TopActionsMovies } from './crudviews/movies/Actions';
import { Headers as HeadersMovies } from './crudviews/movies/Headers';
import { SortBy as SortByMovies } from './crudviews/movies/SortBy';
import MovieItem from './crudviews/movies/ui/MovieItem';
import { FormFields as FormFieldsMovies } from './crudviews/movies/FormFields';
import { FormFields as FormFieldsBooks } from './crudviews/books/FormFields';
import { Headers as HeadersBooks } from './crudviews/books/Headers';
import { FormFields as FormFieldsImageSets } from './crudviews/imagesets/FormFields';
import { Headers as HeadersImageSets } from './crudviews/imagesets/Headers';
import { Headers as HeadersActors } from './crudviews/actors/Headers';
import { FormFields as FormFieldsActors } from './crudviews/actors/FormFields';
import { FormFields as FormFieldsStudios } from './crudviews/studios/FormFields';
import { Headers as HeadersStudios } from './crudviews/studios/Headers';
import { FormFields as FormFieldsCategories } from './crudviews/categories/FormFields';
import { Headers as HeadersCategories } from './crudviews/categories/Headers';
import { FormFields as FormFieldsSagas } from './crudviews/sagas/FormFields';
import { Headers as HeadersSagas } from './crudviews/sagas/Headers';
import { SortBy as SortBySagas } from './crudviews/sagas/SortBy';
import { TopActions as TopActionsSagas } from './crudviews/sagas/Actions';

import ActorItem from './crudviews/actors/actor/ActorItem';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


export const Admin = ({ match, ...rest }) => {

    localStorage.setItem('lastPath', rest.location.pathname);

    const { user } = useContext(AuthContext);

    return (
        (!user.logged)
            ? <Redirect to="/admin/login" />
            :
            <div className="sidebar-mini layout-fixed layout-navbar-fixed">
                <div className="wrapper">
                    <nav className="main-header navbar navbar-expand navbar-white navbar-light"> <HeaderAdmin />
                    </nav>
                    <SidebarAdmin />
                    <div className="content-wrapper pb-0" style={{}}>
                        <BreadcrumbAdmin />
                        <Switch>
                            <Route exact path={`${match.path}/movies/duplicates`} component={Duplicates} />

                            <Route exact path={`${match.path}`} component={HomeAdmin} />
                            <Route key="crud-locations-1" exact path={`${match.path}/locations`} render={(props) => (<Redirect to={`${match.path}/locations/1`}   {...props} />)} />

                            <Route key="crud-locations" exact path={`${match.path}/locations/:page`} render={(props) => (<CrudView {...props}
                                headers={[{
                                    name: "name",
                                    label: "Nombre"
                                }, {
                                    name: "url",
                                    label: "Location"
                                }, {
                                    name: "created",
                                    label: "Creado",
                                    converter: function (value) {
                                        return dateFormat(value)
                                    }
                                }, {
                                    name: "updated",
                                    label: "Actualizado",
                                    converter: function (value) {
                                        return dateFormat(value)
                                    }
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
                                                    toastr['success']('Scanning');
                                                    //this.setState({ loading: false });
                                                    //this.props.history.push('/');
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                    toastr['error']('Error on scanning');

                                                });
                                            //   alert("Loading")

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

                            <Route key="crud-genders-1" exact path={`${match.path}/genders`} render={(props) => (<Redirect to={`${match.path}/genders/1`}   {...props} />)} />

                            <Route key="crud-categories-1" exact path={`${match.path}/categories`} render={(props) => (<Redirect to={`${match.path}/categories/1`}   {...props} />)} />

                            <Route key="crud-categories" exact path={`${match.path}/categories/:page`} render={(props) => (<CrudView {...props}
                                headers={HeadersCategories}
                                baseRoute={`${match.path}/categories/categorie`}
                                baseUrl={'/api/categorias'}

                            />)} />


                            <Route key="form-categories" exact path={`${match.path}/categories/categorie/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsCategories
                                    }
                                    baseUrl={'/api/categorias'}
                                    formTitle={'Categorie data'}
                                />)} />


                            <Route key="crud-studios-1" exact path={`${match.path}/studios`} render={(props) => (<Redirect to={`${match.path}/studios/1`}   {...props} />)} />


                            <Route key="crud-studios" exact path={`${match.path}/studios/:page`} render={(props) => (<CrudView {...props}
                                headers={HeadersStudios}
                                baseRoute={`${match.path}/studios/studio`}
                                baseUrl={'/api/studios'}

                            />)} />
                            <Route key="form-studios" exact path={`${match.path}/studios/studio/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsStudios
                                    }
                                    baseUrl={'/api/studios'}
                                    formTitle={'Studio data'}
                                />)} />

                            <Route key="crud-actores-1" exact path={`${match.path}/actores`} render={(props) => (<Redirect to={`${match.path}/actores/1`}   {...props} />)} />


                            <Route key="crud-actores" exact path={`${match.path}/actores/:page`} render={(props) => (<CrudView {...props}
                                headers={HeadersActors}
                                baseRoute={`${match.path}/actores/actor`}
                                baseUrl={'/api/actores'}

                            />)} />
                            <Route key="form-actores" exact path={`${match.path}/actores/actor/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsActors
                                    }
                                    baseUrl={'/api/actores'}
                                    formTitle={'Actor data'}
                                />)} />
                            <Route key="form-actores" exact path={`${match.path}/actores-grid/actor/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsActors
                                    }
                                    baseUrl={'/api/actores'}
                                    formTitle={'Actor data'}
                                />)} />

                            <Route key="grid-actores-1" exact path={`${match.path}/actores-grid`} render={(props) => (<Redirect to={`${match.path}/actores-grid/1`}   {...props} />)} />

                            <Route key="grid-actores" exact path={`${match.path}/actores-grid/:page`} render={(props) => (<CrudGridView {...props}
                                headers={HeadersActors}
                                itemHeight={360}
                                getItem={function (item) {
                                    return (<ActorItem item={item} />)
                                }} baseRoute={`${match.path}/actores/actor`}
                                chunk={150}
                                baseUrl={'/api/actores'}

                            />)} />

                            <Route key="crud-movies-1" exact path={`${match.path}/movies`} render={(props) => (<Redirect to={`${match.path}/movies/1`}   {...props} />)} />
                            <Route key="crud-grid-movies-1" exact path={`${match.path}/gridmovies`} render={(props) => (<Redirect to={`${match.path}/gridmovies/1`}   {...props} />)} />

                            <Route key="crud-grid-movies" exact path={`${match.path}/gridmovies/:page`} render={(props) => (<CrudGridView {...props}
                                headers={HeadersMovies}
                                baseRoute={`${match.path}/movies/movie`}
                                sortByDefault={{ sortby: 'duration', sortdir: -1 }}
                                baseUrl={'/api/movies'}
                                sortBy={SortByMovies}
                                itemHeight={450}
                                getItem={function (item) {
                                    return (<MovieItem item={item} extradata={true} />)
                                }}
                                extraAcciones={TableActionsMovies}
                                extraTopAcciones={TopActionsMovies}
                            />)} />

                            <Route key="crud-movies" exact path={`${match.path}/movies/:page`} render={(props) => (<CrudView {...props}
                                headers={HeadersMovies}
                                sortBy={SortByMovies}
                                baseRoute={`${match.path}/movies/movie`}
                                baseUrl={'/api/movies'}
                                extraTopAcciones={TopActionsMovies}
                            />)} />
                            <Route key="form-movies" exact path={`${match.path}/movies/movie/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsMovies
                                    }
                                    baseUrl={'/api/movies'}
                                    formTitle={'Video data'}
                                />)} />
                            <Route key="crud-sagas-1" exact path={`${match.path}/sagas`} render={(props) => (<Redirect to={`${match.path}/sagas/1`}   {...props} />)} />

                            <Route key="crud-sagas" exact path={`${match.path}/sagas/:page`} render={(props) => (<CrudView {...props}
                                headers={HeadersSagas}
                                sortBy={SortBySagas}
                                baseRoute={`${match.path}/sagas/saga`}
                                baseUrl={'/api/sagas'}
                                extraTopAcciones={TopActionsSagas}
                            />)} />
                            <Route key="form-sagas" exact path={`${match.path}/sagas/saga/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsSagas
                                    }
                                    baseUrl={'/api/sagas'}
                                    formTitle={'Saga data'}
                                />)} />

                            <Route key="crud-books-1" exact path={`${match.path}/books`} render={(props) => (<Redirect to={`${match.path}/books/1`}   {...props} />)} />

                            <Route key="crud-books"
                                exact path={`${match.path}/books/:page`} render={(props) => (<CrudView {...props}
                                    headers={HeadersBooks}
                                    baseRoute={`${match.path}/books/book`}
                                    baseUrl={'/api/books'}

                                />)} />
                            <Route key="form-books" exact path={`${match.path}/books/book/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsBooks
                                    }
                                    baseUrl={'/api/books'}
                                    formTitle={'Book data'}
                                />)} />


                            <Route key="crud-imagesets-1" exact path={`${match.path}/imagesets`} render={(props) => (<Redirect to={`${match.path}/imagesets/1`}   {...props} />)} />

                            <Route key="crud-imagesets"
                                exact path={`${match.path}/imagesets/:page`} render={(props) => (<CrudView {...props}
                                    headers={HeadersImageSets}
                                    baseRoute={`${match.path}/imagesets/imageset`}
                                    baseUrl={'/api/imagesets'}

                                />)} />
                            <Route key="form-imagesets" exact path={`${match.path}/imagesets/imageset/:action/:id`} render={(props) => (
                                <Form {...props}
                                    formField={FormFieldsImageSets
                                    }
                                    baseUrl={'/api/imagesets'}
                                    formTitle={'Imageset data'}
                                />)} />


                            <Route key="not-found-path" exact path={`${match.path}/*`} component={NotFound} />
                        </Switch>
                    </div>
                    <FooterAdmin />
                    <ToastContainer />
                </div>
            </div>);
};

