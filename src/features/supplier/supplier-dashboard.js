import { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierOrders } from "../../store/action/supplier";
import { Dropdown } from 'primereact/dropdown';
/* prime react imports */
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
 import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

function SupplierDashboard(){
    const [username,setUsername] = useState('');
    const [,setToken] = useState('');
    const dispatch = useDispatch();
    const {list} = useSelector(((state)=>state.supplier));
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const [successMsg,setSuccessMsg] = useState('');
    const [size,setSize] = useState(10000);

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
          <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={()=>setSuccessMsg('')} data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"/>
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
   

    return(
        <div>
            <div className='mb-4'> 
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
            globalFilter={globalFilter} header={header}      
          >
            <Column
              field="id"
              header="Product ID"
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
              field="product.category.name"
              header="Category"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="suppler.name"
              header="Supplier Name"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="warehouse.location"
              header="Warehouse Location"
              sortable
              style={{ minWidth: "14rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="dateOfOrder"
              header="Order Date"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
            </div>
            
        </div>
    );
}
export default SupplierDashboard;