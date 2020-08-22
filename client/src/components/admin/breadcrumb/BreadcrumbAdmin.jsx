import React from 'react';
import { withRouter } from 'react-router-dom'
import './BreadcrumbAdmin.css'
import { capitalizeFirstLetter } from '../../../utils/Utils';
class BreadcrumbAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: []
        }
    }

    componentDidMount() {
        this.loadBreadcrumb();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.loadBreadcrumb();
        }
    }


    async loadBreadcrumb() {
        await this.setState({
            routes: this.props.location.pathname.trim().split("/").filter(e => e !== "")
        });
        let array = $(".nav-link")
        for (let i = 0; i < array.length; i++) {
            if (array[i].innerHTML == capitalizeFirstLetter(this.state.routes.slice(-1).pop)) {
                $(array[i]).parent().addClass("active")
            }

        }


    }




    render() {
        const { routes } = this.state;
        return (
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6 offset-6">
                        <ol className="breadcrumb w-100 di-flex flow-row justify-content-end" >

                            {
                                routes.map((route, index) => {
                                    return (
                                        <li className=" text-capitalize breadcrumb-item" key={index}><a>{isNaN(route) ? route : "Page " + route}</a></li>
                                    );
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BreadcrumbAdmin);