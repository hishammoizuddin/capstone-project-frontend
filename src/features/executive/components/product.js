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
    const [categoryId,setCategoryId] = useState(null);
    const [title,setTitle] = useState('');
    const [tagline,setTagline] = useState('');
    const [price,setPrice] = useState(null);
    const [description,setDescription] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
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

        const addNewProduct = async  () =>{
            /* add the product */
            //console.log(title + ' ' + tagline + ' ' + price + ' ' + description + ' '+ categoryId)
            try {
               const response = await axios.post(
               "http://localhost:8181/product/add/" +categoryId ,
               {
                title:  title,
                tagline: tagline,
                price: price,
                description: description
               }
             );
               
              setSuccessMsg('Product added successfully!!!');
               
              setTitle('');
              setDescription('')
              setPrice('')
              setTagline('') 
           } catch (err) {
             console.log(err.msg);
           }
          }
    return (
      <div>
        {/* 2 modals: 1 for product add & 1 category */}

        <div
          class="modal fade"
          id="productAdd"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="productAddLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="productAddLabel">
                  Add New Product
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {/* Show success msg*/}
                {successMsg === "" ? (
                  ""
                ) : (
                  <div class="alert alert-primary" role="alert">
                    {successMsg}
                  </div>
                )}
              <div class="mb-3">
                <label   class="form-label">Product Title: </label>
                <input type="text" class="form-control" id="exampleFormControlInput1" 
                placeholder="enter title" value={title} onChange={(e)=>setTitle(e.target.value)} onClick={(e)=>setTitle(e.target.value)}
                ></input>
              </div>

              <div class="mb-3">
                <label   class="form-label">Product Tagline: </label>
                <input type="text" class="form-control" id="exampleFormControlInput1" 
                placeholder="enter tagline" value={tagline} onChange={(e)=>setTagline(e.target.value)} onClick={(e)=>setTagline(e.target.value)}
                ></input>
              </div>

              <div class="mb-3">
                <label   class="form-label">Product Price($): </label>
                <input type="number" class="form-control" id="exampleFormControlInput1" 
                placeholder="enter price in dollars" value={price} onChange={(e)=>setPrice(e.target.value)} onClick={(e)=>setPrice(e.target.value)}
                ></input>
              </div>

              <div class="mb-3">
                <label   class="form-label">Detailed Description: </label>
                <textarea class="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} onClick={(e)=>setDescription(e.target.value)}></textarea>
              </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={()=>addNewProduct()}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="addCategory"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="addCategoryLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addCategoryLabel">
                  Add New Category
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
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
                    <button
                      className="btn btn-primary"
                      onClick={() => viewProducts(c.id)}
                    >
                      View Products
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-secondary"
                      data-bs-toggle="modal" data-bs-target="#productAdd"
                      onClick={(e)=>{
                        setCategoryId(c.id); 
                       
                      }}
                    >
                      Add New Product
                    </button>
                  </MDBCardBody>
                  <MDBCardFooter className="text-muted">
                    Priority: {c.priority}
                  </MDBCardFooter>
                </MDBCard>
              </div>
            );
          })}
        </MDBRow>
        <div class="alert alert-light" role="alert">
          <button className="btn btn-info" 
          data-bs-toggle="modal" data-bs-target="#addCategory" > Add New Category</button>
        </div>
        {/** Show all Products here  */}
        {showProduct === false ? (
          ""
        ) : (
          <MDBTable align="middle" className="mt-4">
            <MDBTableHead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Title
                </th>
                <th scope="col">Price</th>
                <th scope="col">Quantity Available</th>
                <th scope="col">Category Name</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {products.map((p) => {
                return (
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
                    <td>{p.totalQuantity}</td>
                    <td>{p.category.name}</td>
                    <td>
                      <MDBBtn color="link" rounded size="sm">
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        )}
      </div>
    );
}
 
export default Product;