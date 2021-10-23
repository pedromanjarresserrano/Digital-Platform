import React from 'react';
import './Table.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            resizableGrid(document.getElementsByClassName('crud-table')[0]);
        } catch (err) {
            console.log(err);

        }
    }

    componentDidUpdate() {
        try {
            resizableGrid(document.getElementsByClassName('crud-table')[0]);
        } catch (err) {
            console.log(err);
        }
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
    check(id) {
        let chk = document.getElementById(id);

        chk.checked = !chk.checked;
    }

    getRows() {
        return (

            this.props.data.map((data, i) => {
                return (
                    <tr key={Math.random() + "-id-tr-" + data._id}>
                        <td>
                            <input type="checkbox" id={data._id + 'checkbox'} name={data._id + '-n-checkbox'} className='checkboxcrud' value={data._id} onClick={() => {
                                this.check(data._id + 'checkbox');
                            }} />
                        </td>
                        {
                            this.props.headers.map(h => <td key={h.name + "-" + data._id} className="text-truncate">{h.converter ? h.converter(data[h.name]) : data[h.name]}</td>)
                        }
                        <td key={Math.random() + "-id-td-commands"} className="d-flex flex-row">
                            <button key={Math.random() + "-id-button-commands"} type="button" title="Edit" className="btn btn-sm btn-primary" onClick={() => this.props.editClick(data)}><i className="fas fa-edit"></i></button>
                            <button key={Math.random() + "-id-button-commands"} type="button" title="Delete" className="btn btn-sm btn-danger" onClick={() => this.props.deleteClick(data)}><i className="fas fa-trash-alt"></i></button>

                            {this.props.extraAcciones && this.props.extraAcciones.length > 0 ? this.props.extraAcciones.map(accion =>
                                <button key={Math.random() + "-id-button-commands"} type="button" className={accion.className} onClick={() => accion.onClick(data, this.props.crudView)}>{accion.name}</button>
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