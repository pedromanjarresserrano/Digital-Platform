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

    check(id) {
        let chk = document.getElementById(id);

        chk.checked = !chk.checked;
    }

    render() {
        return (

            <GridList cellHeight={this.props.itemHeight ? this.props.itemHeight : 240}  cols={1}>
                {this.props.data.map((item) => (
                    <GridListTile className="item-grid" cols={1} onClick={() => {
                        this.check(item._id + 'checkbox');
                    }}>
                        <div className="d-flex flex-column justify-content-between">
                            {this.props.getItem(item)}
                            
                            <div className="d-flex flex-row">
                                <input type="checkbox" id={item._id + 'checkbox'} name={item._id + '-n-checkbox'} className='checkboxcrud' value={item._id} onClick={() => {
                                    this.check(item._id + 'checkbox');
                                }} />

                                <div className="d-flex flex-row justify-content-between  w-100 pl-2">

                                    <button key={Math.random() + "-id-button-commands"} type="button" title="Edit" className="btn btn-sm btn-primary" onClick={() => this.props.editClick(item)}><i className="fas fa-edit"></i></button>
                                    <button key={Math.random() + "-id-button-commands"} type="button" title="Delete" className="btn btn-sm btn-danger" onClick={() => this.props.deleteClick(item)}><i className="fas fa-trash-alt"></i></button>

                                    {this.props.extraAcciones && this.props.extraAcciones.length > 0 ? this.props.extraAcciones.map(accion =>
                                        <button key={Math.random() + "-id-button-commands"} type="button" className={accion.className} onClick={() => accion.onClick(item, this.props.crudView)}>{accion.name}</button>
                                    ) : ""}
                                </div>
                            </div>
                        </div>
                    </GridListTile>
                ))}
            </GridList>

        );
    }
}

export default Grid;