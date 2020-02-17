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
            <div className="p-1">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {
                            routes.map((route, index) => {
                                return (
                                    <li className="breadcrumb-item active" key={index}><a>{route}</a></li>
                                );
                            })
                        }
                    </ol>
                </nav>
            </div>

        );
    }
}

export default withRouter(Breadcrumb);