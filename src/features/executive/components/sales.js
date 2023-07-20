import axios from "axios";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

function Sales(){
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [salesEntry,setSalesEntry] = useState([]);
    const [errMsg,setErrMsg] = useState('');

     

    const fetchSalesEntry = ()=>{
        async function getAllSalesEntry(){
            try{
                const response = await axios.get('http://localhost:8181/product/customer/purchase/' +fromDate + '/' + toDate );
                setSalesEntry(response.data);
                setErrMsg("");
            }
            catch(err){
                setErrMsg("Network Issue, Something has broken");
            }
        }
        getAllSalesEntry();
    };
    return (
        <div>

                <div class="alert alert-light" role="alert">
                <label>Select From Date</label>
                <input type="date" className="form-control" onChange={(e)=>setFromDate(e.target.value)}></input>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Select To Date</label>
                <input type="date" className="form-control" onChange={(e)=>setToDate(e.target.value)}></input>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-info" onClick={()=>fetchSalesEntry()}>Fetch Sales Records</button>
                </div>
             <MDBTable align="middle" className="mt-4">
            <MDBTableHead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Title
                </th>
                
                <th scope="col">Product Price</th>
                <th scope="col">Quantity Purchased</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Email</th>
                <th scope="col">Customer City</th>
                <th scope="col">Date of Purchase</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {salesEntry.map((e) => {
                return (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{e.product.title}</p>
                          <p className="text-muted mb-0">{e.product.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td>${e.product.price}</td>
                    <td>{e.quantity}</td>
                    <td>{e.customer.name}</td>
                    <td>{e.customer.user.username}</td>
                    <td>{e.customer.address.city}</td>
                    <td>{e.dateOfPurchase}</td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
    )
}

export default Sales;