import React, { useState, useEffect } from 'react';

export function Products() {
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList() {
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm(product) {
        setContent(<ProductForm product={product} showList={showList} />);
    }

    return (
        <div className="container  my-5">
            {content}
        </div>
    );
}

function ProductList(props) {

    const [products, setProducts] = useState([]);
    function fetchProducts() {
        fetch("http://localhost:3004/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json()  
            })
            .then((data) => {
                setProducts(data);
            })  
            .catch((error) => console.log("Error: ", error));
    }
    useEffect(() => fetchProducts(), []);

    function deleteProduct(id) { 
            fetch("http://localhost:3004/products/" + id, {
                method: 'DELETE'
    })
                .then((response) => response.json())
                .then((data) => fetchProducts());
        }
        function handleSearch() {
            const searchInput = document.getElementById('searchInput');
            const keyword = searchInput.value.toLowerCase();
          
            const filteredProducts = products.filter((product) => {
              return (
                product.name.toLowerCase().includes(keyword) ||
                product.brand.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword)
              );
            });
          
            setProducts(filteredProducts);
          }

    return (
        <>
            <h2 className="text-center  mb-3">List Produk yang Dijual</h2>
            <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Cari produk..." id="searchInput"/>
  <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Cari</button>
</div>
            <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Buat Baru</button>

            <button onClick={() => fetchProducts()} type="button" className="btn btn-outline-primary me-2">Refresh</button>

            <table className="table" id="row">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Merek</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>Dibuat</th>
                        <th>Edit</th>
                        <th>Delete</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            return (
                                <tr key={index} id="prod" >
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>Rp. {product.price}</td>
                                    <td>{product.createdAt}</td>
                                    <td style={{ width: "10px", 'whiteSpace': 'nowrap' }} >
                                        <button onClick={ () => props.showForm(product)} type="button" className="btn btn-primary btn-sm me-2" id="btnEdit" >Edit</button>                                        
                                    </td>
                                    <td>
                                        <button onClick={ () => deleteProduct(product.id)} type="button" className="btn btn-danger btn-sm" id="btnDell" >Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}


function ProductForm(props) {

    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const product = Object.fromEntries(formData.entries());

        if (!product.name || !product.brand || !product.category || !product.price) {
           let  msgAlert = 'Dimohon agar melengkapi lagi detailnya lagi';
            console.log(msgAlert);
            setErrorMessage(
                <div id="alert" className="alert alert-danger" role="alert">                    
                        {msgAlert}
                </div>
            );
            return;
        }

        if(props.product.id){
        fetch("http://localhost:3004/products/" + props.product.id, {
            method: "PATCH",
            headers: {
               "Content-Type":"application/json",
            },
            body: JSON.stringify(product)
          })
          .then((response) => {
            if (response.code >= 400) {
                throw new Error("Terjadi Error 400. Dimohon untuk mengecek kembali");
            }
            return response.json()
        })
        .then((data) => props.showList())  
        .catch((error) => {
            console.log(6, error);
        });        
        }
         else{        

        product.createdAt = new Date().toISOString().slice(0, 10);
        fetch("http://localhost:3004/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
           body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.code >= 400) {
                    throw new Error("Terjadi Error 400. Dimohon untuk mengecek kembali");
                }
                return response.json()
            })
            .then((data) => props.showList())  
            .catch((error) => {
                console.log(6, error);
            });
        }
    }
 
    return (
        <>
            <h2 className="text-center  mb-3" id='titH2-PgEdit'>{props.product.id ? "Edit Produk" : "Masukkan Produk Baru"}</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">

                    {errorMessage}

                    <form onSubmit={(event) => handleSubmit(event)}>

                    { props.product.id  && <div className="row mb-3">
                             <label className="col-sm-4 col-form-label">ID</label>
                             <div className="col-sm-8" >
                                 <input readOnly className="form-control-plaintext"
                                      name="id"
                                      defaultValue={props.product.id} />
                             </div> 
                         </div>}
                        
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Nama</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="name"
                                    defaultValue={props.product.name} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Merek</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="brand"
                                    defaultValue={props.product.brand} />
                            </div>
                        </div>


                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Kategori</label>
                            <div className="col-sm-8" >
                                <select className="form-select"
                                    name="category"
                                    defaultValue={props.product.category} >

                                    <option value="Other">Other</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="GPS">GPS</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Harga</label>
                            <div className="col-sm-8" >
                                <input className="form-control"
                                    name="price"
                                    defaultValue={props.product.price} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Deskripsi</label>
                            <div className="col-sm-8" >
                                <textarea className="form-control"
                                    name="description"
                                    defaultValue={props.product.description} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary btn-sm mc-3" >Simpan</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button onClick={() => props.showList()} type="button"
                                    className="btn btn-outline-primary btn-sm mc-3" id="btnCancel" >Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}