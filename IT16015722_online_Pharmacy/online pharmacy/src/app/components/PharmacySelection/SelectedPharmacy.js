import React, {Component} from 'react';

import '../../../scss/PharmacyItems.css'

class SelectedPharmacy extends Component {

    render() {
        return(
            <div>
                <h4>Pharmacy Cart  <i className="fas fa-cart-plus" /></h4>
                <p> <i className="far fa-star"/>  Select from Pharmacy Items</p>
                <div  className="ds-content-wrapper">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Medicine</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>

                        {
                            this.props.selectedPharmacy.map((pharmacy, index) => {
                                return(
                                    <tbody key={index}>
                                    <tr className="table-active">
                                        <th scope="row">{pharmacy.name}</th>
                                        <td>{pharmacy.quantity}</td>
                                        <td>Rs.{pharmacy.price}.00</td>
                                        <td><i className="fas fa-trash-alt" style={{cursor:'grab'}} onClick={()=>this.props.deletePharmacy(index)}/></td>
                                    </tr>
                                    <tr className="row" style={{border:'0px solid white',padding:'5px'}}>

                                    </tr>

                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>

            </div>
        );
    }
}

export default SelectedPharmacy;