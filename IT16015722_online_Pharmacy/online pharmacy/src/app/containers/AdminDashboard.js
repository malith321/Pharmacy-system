import React, {Component} from 'react';
import * as API from '../../Constants/APIs';
import axios from 'axios';

import Header from '../components/Header';
import AllPharmacyItems from '../components/PharmacySelection/AllPharmacyItems';
import SelectedPharmacy from '../components/FoodSelection/SelectedPharmacy';
import ButtonBar from '../components/ButtonBar';
import Breadcrumb from '../components/BreadCrumb';
import TotalRow from '../components/PharmacySelection/TotalRow';

import '../../scss/PharmacyItems.css'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPharmacy:[]
        }

        this.addPharmacyToSelectedPharmacy = this.addPharmacyToSelectedPharmacy.bind(this);
        this.deletePharmacyFromSelectedPharmacy = this.deletePharmacyFromSelectedPharmacy.bind(this);
    }

    addPharmacyToSelectedPharmacy(pharmacy) {
        let selectedPharmacy = this.state.selectedPharmacy;
        let previous = null;

        for(let i=0; i<selectedPharmacy.length; i++) {
            if(pharmacy.name === selectedPharmacy[i].name) {
                previous = selectedPharmacy[i];
                previous.quantity = previous.quantity + pharmacy.quantity;
                previous.price = previous.price + pharmacy.price;
            }

        }

        if(previous === null) {
            selectedPharmacy.push(pharmacy);
        }
        this.setState(selectedPharmacy);

    }

    deletePharmacyFromSelectedPharmacy (index) {
        const selectedPharmacy = this.state.selectedPharmacy;

        selectedPharmacy.splice(index,1);

        this.setState(selectedPharmacy);
    }

    addPharmacy() {
        let addPharmacy = this;
        const body = {
            name:document.getElementById('name').value,
            price:document.getElementById('price').value
        }
        axios.post(API.Get_All_Pharmacy, body).then(function (responce) {
            //window.alert(responce.status);
            window.location.reload();
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        return(
            <div className='ds-container'>

                <Header/>
                <Breadcrumb path={'Admin Dashboard'}/>



                <div className="ds-pharmacy-selection">
                    <h3>Admin DashBoard</h3>
                    <div className="row">

                        <div className="col-md-6">
                            <AllPharmacyItems addFoodToSelectedPharmacy={this.addPharmacyToSelectedPharmacy}
                                          disable={true}/>
                        </div>

                        <div className="list-group col">
                            <h3 className="list-group-item list-group-item-action active">
                                Add Medicine                            </h3>

                            <div className="form-group list-group-item list-group-item-action">
                                <label >Pharmacy Item Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>

                                <label >Price Rs.</label>
                                <input type="text" className="form-control" id="price" aria-describedby="emailHelp"/>

                            </div>


                            <div className="list-group-item list-group-item-action disabled ds-button">
                                <button type="button" className="btn btn-primary" onClick={this.addPharmacy}>Add Medicine</button>
                            </div>
                        </div>


                    </div>
                </div>

                <ButtonBar work={'Customer Dashboard'}/>

            </div>
        );
    }
}

export default Dashboard;