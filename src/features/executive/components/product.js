import axios from "axios";
import { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardFooter,
    MDBBtn,
    MDBRow
  } from 'mdb-react-ui-kit';
  import {   MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Product(){
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [errMsg,setErrMsg] = useState('');
    const [showProduct, setShowProduct] = useState(false);

    useEffect(()=>{
            async function getAllCategories(){
                try{
                    const response = await axios.get('http://localhost:8181/category/all');
                    setCategories(response.data);
                    setErrMsg("");
                }
                catch(err){
                    setErrMsg("Network Issue, Something has broken");
                }
            }
            getAllCategories();
        },[]);

        const viewProducts = (cid) =>{
            setShowProduct(true);
            async function getAllProducts(){
                try{
                    const response = await axios.get('http://localhost:8181/product/category/all/'+cid);
                    setProducts(response.data);
                    setErrMsg("");
                }
                catch(err){
                    setErrMsg("Network Issue, Something has broken");
                }
            }
            getAllProducts();
        }

    return (
      <div>
        {errMsg === "" ? (
          ""
        ) : (
          <div class="alert alert-primary" role="alert">
            {errMsg}
          </div>
        )}
        <MDBRow className="mb-4">
          {categories.map((c) => {
            return (
              <div className="col-sm-3">
                <MDBCard alignment="center">
                  <MDBCardBody>
                    <MDBCardTitle>{c.name}</MDBCardTitle>
                    <MDBBtn onClick={() => viewProducts(c.id)}>
                      View Products
                    </MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter className="text-muted">
                    Priority: {c.priority}
                  </MDBCardFooter>
                </MDBCard>
              </div>
            );
          })}
        </MDBRow>

        {/** Show all Products here  */}
        {showProduct === false?'' : 
        <MDBTable align="middle" className="mt-4">
          <MDBTableHead>
            <tr>
              <th scope="col" style={{textAlign: 'center'}}>Title</th> 
              <th scope="col">Price</th>
              <th scope="col">Quantity Available</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
                products.map(p=>{
                    return(
                        <tr>
                        <td>
                          <div className="d-flex align-items-center">
                             
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{p.title}</p>
                              <p className="text-muted mb-0">{p.tagline}</p>
                            </div>
                          </div>
                        </td>
                        <td>${p.price}</td>
                        <td>
                           {p.totalQuantity}
                        </td>
                        <td>{p.category.name}</td>
                        <td>
                          <MDBBtn color="link" rounded size="sm">
                            Delete
                          </MDBBtn>
                        </td>
                      </tr>
                    )
                })
            }
          
             
          </MDBTableBody>
        </MDBTable>
        }
        
      </div>
    );
}

export default Product;