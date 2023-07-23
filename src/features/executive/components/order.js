import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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


function Order() {
  const [param] = useSearchParams();
  const [supplierId, setSupplierId] = useState(param.get('supplier_id'));
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10000);
  const [orders, setOrders] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [productId, setProductId] = useState(null);
  const [warehouseId, setWarehouseId] = useState(null);
  const [sid, setSid] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [doCall, setDoCall] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  /* 
   prime react declarations  
 */


  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setSupplierId(param.get('supplier_id'));
    async function getAllOrders() {
      try {
        const response = await axios.get('http://localhost:8181/executive/order/all/' + supplierId + '?page=' + page + '&size=' + size);
        setOrders(response.data);
        setErrMsg("");
      }
      catch (err) {
        setErrMsg("Network Issue, Something has broken");
      }
    }
    getAllOrders();
    getProducts();
    getWarehouses();
    getSuppliers();
  }, [param, supplierId, page, size]);

  const getSuppliers = () => {
    async function getAllSupplier() {
      try {
        const response = await axios.get('http://localhost:8181/supplier/all');
        setSuppliers(response.data);
        setErrMsg("");
      }
      catch (err) {
        setErrMsg("Network Issue, Something has broken");
      }
    }
    getAllSupplier();
  }
  const getWarehouses = () => {
    async function getAllWarehouse() {
      try {
        const response = await axios.get('http://localhost:8181/warehouse/all');
        setWarehouses(response.data);
        setErrMsg("");
      }
      catch (err) {
        setErrMsg("Network Issue, Something has broken");
      }
    }
    getAllWarehouse();
  }
  const getProducts = () => {
    /* Call All APIs to get All Products, Warehouses and Suppliers */
    async function getAllProducts() {
      try {
        const response = await axios.get('http://localhost:8181/product/all');
        setAllProducts(response.data);
        setErrMsg("");
      }
      catch (err) {
        setErrMsg("Network Issue, Something has broken");
      }
    }
    getAllProducts();

  }
  /* prime react functions */
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const openNew = () => {
    setDoCall(true);
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
      <div className="flex flex-wrap gap-2" style={{ fontFamily: "bold", fontSize: '20px', color: '#004c8c' }}>
        Welcome {localStorage.getItem('username').split("@")[0]},
        Email: {localStorage.getItem('username')}
        {/* <Button label="Place New Order" icon="pi pi-plus" severity="success" onClick={() => setSuccessMsg('')} data-bs-toggle="modal"
          data-bs-target="#staticBackdrop" /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
        <span className="p-input-icon-left " >
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search" style={{ border: '2px solid #004c8c', backgroundColor: '#e6f2ff' }} />
          &nbsp;&nbsp;&nbsp;
        </span>
        <Button label="Place New Order" icon="pi pi-plus" severity="success" onClick={() => setSuccessMsg('')} data-bs-toggle="modal"
          data-bs-target="#staticBackdrop" />
          &nbsp;&nbsp;
        <Button label="Export as CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} style={{ backgroundColor: '#004c8c', color: '#ffffff' }} />
      </div>

    )
  };



  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
        <Button icon="pi pi-trash" rounded outlined severity="danger" />
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

  const allOrder = async () => {
    console.log(productId + '--' + warehouseId + '--' + sid + '--' + quantity)

    try {
      const response = await axios.post(
        "http://localhost:8181/order/entry",
        {
          productId: productId,
          warehouseId: warehouseId,
          supplierId: sid,
          quantity: quantity
        }
      );
      setSuccessMsg('Order placed successfully!!!');
      orders.push(response.data);
    } catch (err) {
      console.log(err.msg);
    }
  }
  return (
    <div>
      {/** Bootstrap Modal */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add new order
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Show success msg*/}
              {successMsg === "" ? (
                ""
              ) : (
                <div class="alert alert-primary" role="alert">
                  {successMsg}
                </div>
              )}
              <label>Which Product: </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>--select product--</option>
                {allProducts.map((p) => {
                  return (

                    <option
                      value={p.id}
                      key={p.id}
                      onChange={(e) => setProductId(e.target.value)}
                    >

                      {p.category.name} : {p.title}
                    </option>
                  );
                })}
              </select>
              <br />
              <label>In which warehouse:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setWarehouseId(e.target.value)}
              >
                <option>--select warehouse location--</option>
                {warehouses.map((w) => {
                  return (
                    <option value={w.id} key={w.id}>
                      {" "}
                      {w.location}{" "}
                    </option>
                  );
                })}
              </select>
              <br />
              <label>Order for Supplier:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setSid(e.target.value)}
              >
                <option>--select supplier--</option>
                {suppliers.map((s) => {
                  return (
                    <option value={s.id} key={s.id}>
                      {" "}
                      {s.name} , {s.address.city}{" "}
                    </option>
                  );
                })}
              </select>
              <br />
              <label>Quantity:</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="mention quantity to be ordered"
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
              <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => allOrder()}
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={orders}
          dataKey="id"
          paginator
          rows={size}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" /** header={header} */
          globalFilter={globalFilter}
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
  );
}

export default Order;