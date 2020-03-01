import React from 'react';

class Footer extends React.Component {
    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <footer className="container-fluid" >
                <div className="row">
                    <div className="col-12 col-md-6 item-footer">
                        <h4>Información util</h4>
                        <ul className="no-bullet">
                            <li><a href="#" target="_blank">Películas de Estreno 2019!</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                            <li><a href="#">Condiciones de Uso</a></li>
                            <li><a href="#">DMCA</a></li>

                        </ul>
                    </div>
                    <div className="col-12 col-md-3 item-footer">
                        <h4>Servicios</h4>
                        <ul className="no-bullet">
                            <li><a href="https://www.facebook.com/PelisPlay" target="_blank">Facebook</a></li>
                            <li><a href="https://www.youtube.com/channel/UCs5BzJxxH5CWPbPqw5Hzowg" target="_blank">Youtube</a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-12 col-md-3 suscribe-footer">
                        <div className="footer-suscribe-content">
                            <div className="suscribe-title">
                                <h5>
                                    <i className="fas fa-envelope padding-right-1"></i>
                                    CONTACTANOS
                                </h5>
                            </div>
                            <div className="suscribe-search">
                                <form className="" action="https://www.pelisplay.tv/contacto" method="get">
                                    <div className="input-group suscribe-search-content">
                                        <input name="email" className="input-group-field" placeholder="E-mail" type="email"
                                            required="" />
                                        <div className="input-group-button">
                                            <button type="submit" className="button btn-suscribe">Enviar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 copyright">
                        <div className="content grid-x secondary">
                            <div className="cell small-12 medium-6 copyright-content">
                                © 2019 | Todos los derechos son reservados
                           </div>
                            <div className="cell small-12 medium-6  copyright-design text-right">
                                <span>Desarrollado por: </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }


}

export default Footer;
