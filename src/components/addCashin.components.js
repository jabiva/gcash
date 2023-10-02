import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default class CashIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            dateCash: '',
            typeTransaction: '',
            amountCash:'',
            total:" "
        }
        this.onValueChange = this.onValueChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // onDateChange(e){
    //     this.setState({
    //         dateCash: e.target.value
    //     })
    // }
    onValueChange(e){
        this.setState({
            [e.target.dataset.name] : e.target.value
        })
    }
onSubmit(e){
    e.preventDefault()
    const gcash = {
        dateCash: this.state.dateCash,
        typeTransaction: this.state.typeTransaction,
        amountCash: this.state.amountCash,
        total: this.state.total
    }
    axios.post('http://localhost:5000/gcashTransac/add', gcash)
    .then(res => window.location = "/")
    .catch(err => console.log('Error :'+ err))
}


  render() {
    return (
        <div className="modal fade" id="CashInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Cash-In Amount</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.onSubmit}>
                            

                        <div className="form-group">
                        <label>Type:</label>
                        <select className="custom-select custom-select-sm" data-name="typeTransaction"required onChange={this.onValueChange} >
  <option selected value="">Select...</option>
  <option value="Cash-IN">Cash-In</option>
</select>
                            <label>Date:</label>
                            <input type="date" className="form-control form-control-sm"data-name="dateCash" required onChange={this.onValueChange} />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" className="form-control form-control-sm" placeholder="Enter Amount"data-name="amountCash" required onChange={this.onValueChange}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </div>
                    </form>
                </div>

                </div>
            </div>
            </div>
    );
  }
}
