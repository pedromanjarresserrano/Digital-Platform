import React from 'react';
import './Table.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    getHeaders() {
        return (
            <tr key={Math.random() + "-id-tr-head"}>
                <th />
                {
                    this.props.headers.map(e => <th key={Math.random() + "-id-th"}>{e.label}</th>)
                }
                <th key={Math.random() + "-id-th"}>Acciones</th>
            </tr>

        );
    }

    getRows() {
        return (

            this.props.data.map((data, i) => {
                return (
                    <tr key={Math.random() + "-id-tr-" + data._id}>
                        <td>
                            {i + 1}
                        </td>
                        {
                            this.props.headers.map(h => <td key={h.name + "-" + data._id} className="text-truncate">{data[h.name]}</td>)
                        }
                        <td key={Math.random() + "-id-td-commands"} className="d-flex flex-row">
                            <button key={Math.random() + "-id-button-commands"} type="button" className="btn btn-sm btn-primary" onClick={() => this.props.editClick(data)}>Edit</button>
                            <button key={Math.random() + "-id-button-commands"} type="button" className="btn btn-sm btn-danger" onClick={() => this.props.deleteClick(data)}>Delete</button>

                            {this.props.extraAcciones && this.props.extraAcciones.length > 0 ? this.props.extraAcciones.map(accion =>
                                <button key={Math.random() + "-id-button-commands"} type="button" className={accion.className} onClick={() => accion.onClick(data)}>{accion.name}</button>
                            ) : ""}
                        </td>
                    </tr>
                );
            })


        );
    }


    render() {
        return (
            <table key={Math.random() + "-id-table"} className="table crud-table  table-bordered table-hover table-sm">
                <thead key={Math.random() + "-id-button-commands"} className="thead-dark">
                    {this.getHeaders()}
                </thead>
                <tbody key={Math.random() + "-id-button-commands"} >
                    {this.getRows()}
                </tbody>
                <tfoot key={Math.random() + "-id-button-commands"} className="thead-dark">
                    {this.getHeaders()}
                </tfoot>
            </table>
        );
    }

}

export default Table;