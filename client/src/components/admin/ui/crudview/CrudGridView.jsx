import React from 'react';
import Pagination from "react-js-pagination";
import Modal from '../modal/Modal';
import './CrudView.css';
import { CommonLoading } from 'react-loadingg';
import CrudView from './CrudView';
import Grid from '../grid/Grid';

class CrudGridView extends CrudView {



    render() {

        return (
            <div className="container-fluid crud-grid-view">
                {
                    (this.state.modal) ?
                        <Modal show="true" okLabel="Delete" content="Are you sure?" title="Delete" onOkClick={this.state.onOkClick}
                            onClose={this.state.onClose}
                            style={
                                {
                                    buttonOk: "btn btn-danger",
                                    buttonCancel: "btn btn-primary"
                                }
                            }
                        />
                        : ""

                }
                <div className="row m-2 shadow-sm">
                    <div className="col-12 py-1 bg-secondary d-flex flex-row justify-content-between">
                        <div>
                            <button title="New" onClick={this.newClick} className="btn btn-sm btn-primary"><i className="fas fa-plus-square"></i></button>

                            {this.props.extraTopAcciones && this.props.extraTopAcciones.length > 0 ? this.props.extraTopAcciones.map(accion =>
                                <button key={Math.random() + "-id-button-crud-commands"} type="button" className={accion.className + ' ml-1'} onClick={() => accion.onClick({
                                    items: Array.from(document.querySelectorAll('input.checkboxcrud:checked')).map(e => e.value)
                                })}><i className={accion.icon}></i> {accion.name}</button>
                            ) : ""}
                        </div>
                        <div>
                            <form onSubmit={this.handleSearch}>
                                <div className="form-inline">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-sm" onKeyDown={this._handleKeyDown} value={this.state.search} onChange={this.handleChange} />
                                        <div className="input-group-append">
                                            <button className="btn btn-sm btn-danger" type='submit' >Buscar </button>

                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="table-responsive">
                        {(this.state.loading) ?
                            <div className="m-5 pb-5" style={{
                                display: "block",
                                position: "relative",
                                width: "90%",
                                minHeight: "800px"
                            }}>
                                <CommonLoading size="small" />
                            </div>
                            : <Grid
                                headers={this.state.headers}
                                data={this.state.items}
                                editClick={this.editClick}
                                deleteClick={this.deleteClick}
                                extraAcciones={this.props.extraAcciones}
                                getItem={this.props.getItem}

                            />
                        }
                    </div>
                    <div className="col-12" >
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.itemCount}
                            itemsCountPerPage={this.state.pageSize}
                            pageRangeDisplayed={9}
                            onChange={this.onPageChanged} />
                    </div>
                </div>
            </div >
        );
    }

}

export default CrudGridView;