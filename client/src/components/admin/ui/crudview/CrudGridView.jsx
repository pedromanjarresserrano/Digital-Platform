import React from 'react';
import Pagination from "react-js-pagination";
import Modal from '../modal/Modal';
import './CrudView.css';
import { CommonLoading } from 'react-loadingg';
import CrudView from './CrudView';
import Grid from '../grid/Grid';

class CrudGridView extends CrudView {

    constructor(props) {
        super(props);
    }


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
                <div className="row mt-1 shadow-sm">
                    {this.getToolBar()}
                    {this.props.topPaginator ? <div className="col-12" >
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.itemCount}
                            itemsCountPerPage={this.state.pageSize}
                            pageRangeDisplayed={9}
                            onChange={this.onPageChanged} />
                    </div> : <></>}
                    <div className="table-responsive crud-table-fixed">
                        {(this.state.loading) ?
                            <div className="m-5 pb-5" style={{
                                display: "block",
                                position: "relative",
                                width: "95%",
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
                                crudView={this}
                                itemHeight={this.props.itemHeight}
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