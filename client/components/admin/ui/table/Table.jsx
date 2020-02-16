import React from 'react';
import './Table.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    getHeaders() {
        return (
            <tr key={Math.random() + "-id-tr-head"}>
                {
                    this.props.headers.map(e => <th key={Math.random() + "-id-th"}>{e.label}</th>)
                }
                <th key={Math.random() + "-id-th"}>Acciones</th>
            </tr>

        );
    }

    getRows() {
        return (

            this.props.data.map(data => {
                return (
                    <tr key={Math.random() + "-id-tr-" + data._id}>
                        {
                            this.props.headers.map(h => <td key={h.name + "-" + data._id}>{data[h.name]}</td>)
                        }
                        <td key={Math.random() + "-id-td-commands"}>
                            <button type="button" class="btn btn-primary" onClick={() => this.props.editClick(data)}>Edit</button>
                            <button type="button" class="btn btn-danger" onClick={() => this.props.deleteClick(data)}>Delete</button>
                        </td>
                    </tr>
                );
            })


        );
    }


    render() {
        return (
            <table key={Math.random() + "-id-table"} className="table crud-table  table-bordered table-hover table-sm">
                <thead>
                    {this.getHeaders()}
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    }

}

export default Table;