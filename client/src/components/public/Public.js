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
import Studios from './studios/studios/Studios.jsx';
import StudioDetails from './studios/categorie-details/StudioDetails.jsx';
import Books from './books/Books.jsx';
import BookDetails from './book-details/BookDetails';
import ImagesetDetails from './imagesets/imageset-details/ImagesetDetails';
import Imagesets from './imagesets/imagesets/Imagesets';
export const Public = ({ match }) => (
    <React.Fragment>
        <Header />
        <Breadcrumb />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route key="list-movies" exact path="/catalog" render={(props) => (<Redirect to="/catalog/1"  {...props} />)} />
            <Route key="list-movies-p" exact path="/catalog/:page" component={Catalog} />
            <Route key="catalogmovie" exact path="/catalog/movie" render={(props) => (<Redirect to="/catalog/1"  {...props} />)} />
            <Route key="movie" exact path="/catalog/movie/:id" component={MovieDetails} />
           
            <Route key="list-categories" exact path="/categories" render={(props) => (<Redirect to="/categories/1"  {...props} />)} />
            <Route key="list-categories-id" exact path="/categories/:page" component={Categories} />
            <Route key="categoriecategorie" exact path="/categories/categorie" render={(props) => (<Redirect to="/categories/1"  {...props} />)} />
            <Route key="categoriesn" exact path="/categories/categorie/:name" render={(props) => (<Redirect to={"/categories/categorie/" + props.match.params.name + "/1"}  {...props} />)} />
            <Route key="categoriesnp" exact path="/categories/categorie/:name/:page" component={CategorieDetails} />

            <Route key="list-studios" exact path="/studios" component={Studios} />
            <Route key="list-studios-id" exact path="/studios/:page" component={Studios} />
            <Route key="studiosstudio" exact path="/studios/studio" render={(props) => (<Redirect to="/studios/1"  {...props} />)} />
            <Route key="studiosn" exact path="/studios/studio/:name" render={(props) => (<Redirect to={"/studios/studio/" + props.match.params.name + "/1"}  {...props} />)} />
            <Route key="studiosnp" exact path="/studios/studio/:name/:page" component={StudioDetails} />

            <Route key="list-actors" exact path="/actors/:page" component={Actors} />
            <Route key="actors" exact path="/actors" render={(props) => (<Redirect to="/actors/1"  {...props} />)} />
            <Route key="actor" exact path="/actors/actor" render={(props) => (<Redirect to="/actors/1"  {...props} />)} />
            <Route key="actorn" exact path="/actors/actor/:name" render={(props) => (<Redirect to={"/actors/actor/" + props.match.params.name + "/1"}  {...props} />)} />
            <Route key="actornp" exact path="/actors/actor/:name/:page" component={ActorDetails} />

            
            <Route key="list-books" exact path="/books" render={(props) => (<Redirect to="/books/1"  {...props} />)} />
            <Route key="list-books-p" exact path="/books/:page" component={Books} />
            <Route key="booksb" exact path="/books/book" render={(props) => (<Redirect to="/books/1"  {...props} />)} />
            <Route key="book" exact path="/books/book/:id" component={BookDetails} />


            <Route key="list-imagesets" exact path="/imagesets" render={(props) => (<Redirect to="/imagesets/1"  {...props} />)} />
            <Route key="list-imagesets-p" exact path="/imagesets/:page" component={Imagesets} />
            <Route key="imagesetsb" exact path="/imagesets/imageset" render={(props) => (<Redirect to="/imagesets/1"  {...props} />)} />
            <Route key="imageset" exact path="/imagesets/imageset/:id" component={ImagesetDetails} />
           
            <Route exact path="/index" component={Home} />
            <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer />
    </React.Fragment>
);

