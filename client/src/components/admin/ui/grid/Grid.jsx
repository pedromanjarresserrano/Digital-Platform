import { GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import './Grid.css';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }


    componentWillMount() {
        console.log(this)
    }

    render() {
        return (

            <GridList cellHeight={220} cols={5}>
                {this.props.data.map((item) => (
                    <GridListTile cols={1}>
                        {this.props.getItem(item)}
                        <button key={Math.random() + "-id-button-commands"} type="button" title="Edit" className="btn btn-sm btn-primary" onClick={() => this.props.editClick(data)}><i className="fas fa-edit"></i></button>
                        <button key={Math.random() + "-id-button-commands"} type="button" title="Delete" className="btn btn-sm btn-danger" onClick={() => this.props.deleteClick(data)}><i className="fas fa-trash-alt"></i></button>

                        {this.props.extraAcciones && this.props.extraAcciones.length > 0 ? this.props.extraAcciones.map(accion =>
                            <button key={Math.random() + "-id-button-commands"} type="button" className={accion.className} onClick={() => accion.onClick(data)}>{accion.name}</button>
                        ) : ""}
                    </GridListTile>
                ))}
            </GridList>

        );
    }
}

export default Grid;