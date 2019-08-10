import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import '../../../scss/PharmacyItems.css'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class PharmacyRaw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFood:[{name:'Panadol',price:45.00}, {name:'Piriton',price:30.00}],
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    addPharmacyToSelectedPharamacy = () => {
        const food = this.props.pharmacy;
        const id = "exampleSelect" + this.props.index;
        const quantity = parseInt(document.getElementById(id).value);

        this.props.addPharmacyToSelectedPharmacy({name:pharmacy.name,quantity:quantity,price:(medicine.price*quantity)});
        this.handleClose();
    }

    render() {

        return(
            <tbody>
            <tr className="ds-medicine-column table-active " onClick={this.handleClickOpen}>
                <th scope="row">{this.props.pharmacy.name}</th>
                <td>Rs.{this.props.pharmacy.price}.00</td>
            </tr>
            <tr className="row" style={{border:'0px solid white',padding:'5px'}}>

            </tr>

            {
                this.props.disable === false ?
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            <div className="row">
                                <div className="col">
                                    {this.props.pharmacy.name}
                                </div>
                                <div className="col ds-dialog">
                                    <i className="fas fa-utensils"/>
                                </div>
                            </div>

                        </DialogTitle>
                        <DialogContent>
                            <div className="form-group">
                                <label>Select Quantity : </label>
                                <select className="form-control" id={"exampleSelect"+this.props.index}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                To add more than 5, click again on {this.props.pharmacy.name}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.addPharmacyToSelectedPharmacy}>Add to Cart</button>
                            </div>
                            <DialogContentText id="alert-dialog-slide-description">
                                ==Pharmacy==                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    :
                    null
            }


                    </tbody>
        );
    }
}

export default PharmacyRaw;