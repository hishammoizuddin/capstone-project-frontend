import React, { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierOrders, updateStatus } from "../../store/action/supplier";
 /* prime react imports */
 import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
 import { Button } from 'primereact/button';
 
import { Toolbar } from 'primereact/toolbar';
 
import { InputText } from 'primereact/inputtext';
 

function SupplierDashboard(){
    const [username,setUsername] = useState('');
    const [,setToken] = useState('');
    const dispatch = useDispatch();
    const {list} = useSelector(((state)=>state.supplier));
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const [successMsg,setSuccessMsg] = useState('');
    const [size,] = useState(10000);

    useEffect(()=>{
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token')); 
        dispatch(getSupplierOrders()); 
        
        //a trigger that starts series of ops which will give list of orders to state
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] );

 /* prime react functions */
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
 
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
      return (
        <div className="flex flex-wrap gap-2" style={{fontFamily: "cursive", fontSize: '18px'}}>
               Welcome {localStorage.getItem('username').split("@")[0]},<br />
               Email: {localStorage.getItem('username')}
           </div>
      );
  };

    const rightToolbarTemplate = () => {
        return(
            <div> 
            <span className="p-input-icon-left " >
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                &nbsp;&nbsp;&nbsp;
            </span>
                     <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
                     </div>

        )
    };
  
 

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.product.price);
    };

    const header = (
        <div className="flex flex-wrap gap-2   justify-content-between">
            <h4 className="m-0">Orders placed by executive(To be delivered)</h4>
             
        </div>
    );
       
    const updateStatusv1=(orderId,status)=>{
        dispatch(updateStatus(orderId,status));
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 <button className="btn btn-info" 
                 onClick={()=>updateStatusv1(rowData.id, 'ACCEPTED')} >ACCEPTED</button>
                 &nbsp;&nbsp;
                 <button className="btn btn-danger"
                 onClick={()=>updateStatusv1(rowData.id, 'REJECTED')} >REJECTED</button>
                 &nbsp;&nbsp;
                 <button className="btn btn-success" 
                 onClick={()=>updateStatusv1(rowData.id, 'DELIVERED')} >DELIVERED</button>
        </React.Fragment>
        );
    };
    return (
      <div>
        <div className="mb-4">
          <Navbar />
        </div>
        <div>
          <div className="card">
            <Toolbar
              className="mb-4"
              start={leftToolbarTemplate}
              end={rightToolbarTemplate}
            ></Toolbar>

            <DataTable
              ref={dt}
              value={list}
              dataKey="id"
              paginator
              rows={size}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" /** header={header} */
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                field="id"
                header="Order ID"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="product.title"
                header="Product Name"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="product.price"
                body={priceBodyTemplate}
                header="Price"
                sortable
                style={{ minWidth: "6rem" }}
              ></Column>
              <Column
                field="product.totalQuantity"
                header="Quantity"
                sortable
                style={{ minWidth: "6rem" }}
              ></Column>

              <Column
                field="suppler.name"
                header="Supplier Name"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="warehouse.location"
                header="Warehouse"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="status"
                header="Status"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="dateOfOrder"
                header="Order Date"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={true}
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    );
}
export default SupplierDashboard;