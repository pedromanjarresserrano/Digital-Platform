import React from 'react';
import { withRouter } from 'react-router-dom'

class Breadcrumb extends React.Component {
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


    loadBreadcrumb() {
        this.setState({
            routes: this.props.location.pathname.trim().split("/").filter(e => e !== "")
        });
    }

    render() {
        const { routes } = this.state;
        return (
            <nav aria-label="breadcrumb  ">
                <ol className="breadcrumb my-2 bg-dark text-white border-0">
                    {
                        routes.map((route, index) => {
                            return (
                                <li className=" text-capitalize breadcrumb-item active text-white" key={index}><a>{route}</a></li>
                            );
                        })
                    }
                </ol>
            </nav>

        );
    }
}

export default withRouter(Breadcrumb);