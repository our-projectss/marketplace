import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" style={{display: 'flex', gap: '60px', width: '100vw', height: '90vh', overflow: 'hidden'}}>
        <div style={{flex: 1}}>
          <h1>Add Product</h1>
          <form onSubmit={(event) => {
            event.preventDefault()
            const name = this.productName.value
            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
            this.props.createProduct(name, price)
          }}>
            <div className="form-group mr-sm-2">
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Product Name"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder="Product Price"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
          <p>&nbsp;</p>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
            <img style={{width: '220px'}} src='https://res.cloudinary.com/practicaldev/image/fetch/s--sbYSG8_8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xwklcnousiav31ten3iy.png' alt='' />
          </div>
          <h4>Các thư viện, công cụ sử dụng:</h4>
          <h5>
            <span className="badge bg-success" style={{color: '#fff', margin: '0 4px'}}>Truffle</span>
            <span className="badge bg-info" style={{color: '#fff', margin: '0 4px'}}>Ganache</span>
            <span className="badge bg-dark" style={{color: '#fff', margin: '0 4px'}}>Web3</span>
            <span className="badge bg-danger" style={{color: '#fff', margin: '0 4px'}}>ReactJs</span>
            <span className="badge bg-warning" style={{color: '#fff', margin: '0 4px'}}>Bootstrap</span>
          </h5>
        </div>
        <div style={{flex: 3, overflow: 'auto', height: '90vh'}}>
          <h1>Buy Product</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Owner</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="productList">
              { this.props.products.reverse().map((product, key) => {
                return(
                  <tr key={key} className={this.props.account === product.owner ? 'my-product' : ''}>
                    <th scope="row">{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                    <td>{product.owner}</td>
                    <td>
                      { !product.purchased && this.props.account !== product.owner
                        ? <button
                            name={product.id}
                            value={product.price}
                            className='btn btn-success'
                            onClick={(event) => {
                              this.props.purchaseProduct(event.target.name, event.target.value)
                            }}
                          >
                            Mua
                          </button>
                        : (this.props.account === product.owner ? "Của tôi" : "Đã bán")
                      }
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;
