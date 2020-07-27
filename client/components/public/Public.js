
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Catalog from './catalog/Catalog.jsx';
import Header from './header/Header';
import Home from './home/home/Home';
import MovieDetails from './movie-details/MovieDetails';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Footer from './footer/Footer';

import Categories from './categories/Categories';
import CategorieDetails from './categorie-details/CategorieDetails';
import ActorDetails from './actors/actor-details/ActorDetails';
import Actors from './actors/actors/Actors';
import NotFound from './notfound/NotFound.jsx';

export const Public = ({ match }) => (
    <React.Fragment>
        <Header />
        <Breadcrumb />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route key="list-movies" exact path="/catalog" render={(props) => (<Redirect to="/catalog/1"  {...props} />)} />
            <Route key="list-movies" exact path="/catalog/:page" component={Catalog} />
            <Route key="catalogmovie" exact path="/catalog/movie" render={(props) => (<Redirect to="/catalog/1"  {...props} />)} />
            <Route key="movie" exact path="/catalog/movie/:id" component={MovieDetails} />
            <Route key="list-categories" exact path="/categories" component={Categories} />
            <Route key="list-categories" exact path="/categories/:id" component={Categories} />
            <Route key="categoriecategorie" exact path="/categories/categorie" render={(props) => (<Redirect to="/categories/1"  {...props} />)} />
            <Route key="categorie" exact path="/categories/categorie/:name" component={CategorieDetails} />
            <Route key="list-actors" exact path="/actors/:page" component={Actors} />
            <Route key="actor" exact path="/actors" render={(props) => (<Redirect to="/actors/1"  {...props} />)} />
            <Route key="actor" exact path="/actors/actor" render={(props) => (<Redirect to="/actors/1"  {...props} />)} />
            <Route key="actorn" exact path="/actors/actor/:name" component={ActorDetails} />
            <Route exact path="/index" component={Home} />
            <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer />
    </React.Fragment>
);

