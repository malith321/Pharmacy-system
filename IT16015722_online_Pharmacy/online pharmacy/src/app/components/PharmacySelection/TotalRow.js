import React, {Component} from 'react';

class TotalRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPharmacy:[{name:'Panadol',quantity:2,price:90.00}],
            total:0.00
        }
    }

    calculateTotal() {
        const selectedPharmacy = this.props.selectedPharmacy;
        let total = 0;

        for(let i=0; i<selectedPharmacy.length; i++) {
            total = total + selectedPharmacy[i].price;
        }
        localStorage.setItem('total',total);
        return total;
    }

    render() {

        return(
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col"> </th>
                        <th scope="col"> </th>
                        <th scope="col"> </th>
                        <th scope="col">Total  =  Rs.{this.calculateTotal()}.00</th>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default TotalRow;