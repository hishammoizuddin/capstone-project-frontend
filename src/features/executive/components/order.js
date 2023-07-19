import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";


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


function Order(){
    const [param] = useSearchParams();
    const [supplierId, setSupplierId] = useState(param.get('supplier_id') );
    const [page,setPage] = useState(0);
    const [size,setSize] = useState(10000);
    const [orders,setOrders] = useState([]);
    const [errMsg,setErrMsg] = useState('');

    /* 
      prime react declarations  
    */
      let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(()=>{
        setSupplierId(param.get('supplier_id')); 
        async function getAllOrders(){
            try{
                const response = await axios.get('http://localhost:8181/executive/order/all/' + supplierId + '?page=' + page + '&size=' + size );
                setOrders(response.data);
                setErrMsg("");
            }
            catch(err){
                setErrMsg("Network Issue, Something has broken");
            }
        }
        getAllOrders();
    },[param,supplierId, page,size]);

    /* prime react functions */
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
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
 

     
    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"  />
                <Button icon="pi pi-trash" rounded outlined severity="danger"   />
            </div>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.product.price);
    };

    const header = (
        <div className="flex flex-wrap gap-2   justify-content-between">
            <h4 className="m-0">Orders placed for Selected Supplier</h4>
             
        </div>
    );
   
    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
            <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
 
            <DataTable ref={dt} value={orders}  
                        dataKey="id"  paginator rows={size} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"  /** header={header} */>
                     <Column field="id" header="Product ID" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="product.title" header="Product Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="product.price" body={priceBodyTemplate} header="Price" sortable style={{ minWidth: '6rem' }}></Column>
                     <Column field="product.totalQuantity" header="Quantity" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="product.category.name" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="suppler.name" header="Supplier Name"   sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="suppler.address.city" header="City"   sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="status" header="Status"   sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="dateOfOrder" header="Order Date"   sortable style={{ minWidth: '12rem' }}></Column>

                 </DataTable>

            </div>
            
        </div>
    )
}

export default Order;