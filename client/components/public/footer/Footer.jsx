import React from 'react';

class Footer extends React.Component {
    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <footer className="container-fluid" >
                <div className="row pt-5">
                    <div className="col-12 col-md-5 item-footer pr-0 pt-0">
                        <h4>Información util</h4>
                        <ul className="no-bullet">
                            <li><a href="#" target="_blank">Películas de Estreno 2019!</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                            <li><a href="#">Condiciones de Uso</a></li>
                            <li><a href="#">DMCA</a></li>

                        </ul>
                    </div>
                    <div className="col-12 col-md-3 item-footer p-0">
                        <h4>Servicios</h4>
                        <ul className="no-bullet">
                            <li><a href="https://www.facebook.com/PelisPlay" target="_blank">Facebook</a></li>
                            <li><a href="https://www.youtube.com/channel/UCs5BzJxxH5CWPbPqw5Hzowg" target="_blank">Youtube</a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-12 col-md-4 suscribe-footer pr-4">
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
                                        <input name="email" className="form-control" placeholder="E-mail" type="email"
                                            required="" />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-outline-secondary">Enviar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 copyright pt-5">
                        <div className="content grid-x secondary">
                            <div className="cell small-12 medium-6 copyright-content">
                                © 2019 | Todos los derechos son reservados
                           </div>
                            <div className="cell small-12 medium-6  copyright-design text-right">
                                <span>Desarrollado por: PDMS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }


}

export default Footer;
