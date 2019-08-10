import React, {Component} from 'react';

import '../../../scss/PharmacyItems.css'
import PharmacyRaw from './PharmacyRaw';
import * as API from '../../../Constants/APIs';
import axios from 'axios';




class AllPharmacyItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPharmacy:[],
            isResponseFollFill:false
        }
    }

    componentDidMount() {
        let url = API.Get_All_Pharamacy;
        let pharmacy=this;

        axios.get(url).then(function (response) {
            pharmacy.setState({
                 allPharmacy:response.data,
                isResponseFollFill:true
            });
            console.log(response.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {

        return(
            <div>
                <h4>Pharmacy Items  <i className="fas fa-utensils"/></h4>
                {this.props.disable === false ?
                    <p> <i className="far fa-star"/>  Click on a Pharmacy Item</p>
                :
                null}
                <div className="ds-content-wrapper">
                    <table className="table table-hover ">
                        <thead >
                        <tr>
                            <th scope="col">Medicine</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>



                    {
                        this.state.allPharmacy.map((pharmacy, index) => {
                            return(

                                <PharmacyRaw key={index} index={index} pharmacy={pharmacy}
                                         addPharmacyToSelectedPharmacy={this.props.addPharmacyToSelectedPharmacy}
                                         disable={this.props.disable}/>

                            )
                        })
                    }
                    </table>

                </div>


            </div>
        );
    }
}

export default AllPharmacyItems;