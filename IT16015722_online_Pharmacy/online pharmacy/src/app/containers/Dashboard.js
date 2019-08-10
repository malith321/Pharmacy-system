import React, {Component} from 'react';

import Header from '../components/Header';
import AllPharmacyItems from '../components/PharmacySelection/AllPharmacyItems';
import SelectedPharmacy from '../components/PharmacySelection/SelectedPharmacy';
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


    render() {
        return(
            <div className='ds-container'>

                <Header/>
                <Breadcrumb path={'Home'}/>



                <div className="ds-pharmacy-selection">
                    <h3>Medic Selection</h3>
                    <div className="row">

                        <div className="col-md-5">
                            <AllPharmacyItems addPharmacyToSelectedPharmacy={this.addPharmacyToSelectedPharmacy} disable={false}/>
                        </div>

                        <div className="col">
                            <SelectedPharmacy selectedPharmacy={this.state.selectedPharmacy} deletePharmacy={this.deletePharmacyFromSelectedPharmacy}/>
                        </div>

                    </div>
                </div>
               <div className="row ds-total">
                   <div className="col">
                       <TotalRow selectedPharmacy={this.state.selectedPharmacy} />
                   </div>
               </div>
                <ButtonBar work={'Payments'}/>

            </div>
        );
    }
}

export default Dashboard;