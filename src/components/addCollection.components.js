import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default class addCollection extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateCollect: '',
            typeTransaction: '',
            amountCollect:'',
            total:" "
        }
                this.onValueChange = this.onValueChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onValueChange(e){
        this.setState({
            [e.target.dataset.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        const gcash = {
            dateCollect: this.state.dateCollect,
            typeTransaction: this.state.typeTransaction,
            amountCollect: this.state.amountCollect,
            total: this.state.total
        }
        axios.post('http://localhost:5000/gcashTransac/collection', gcash)
        .then(res => window.location = "/")
        .catch(err => console.log('Error :'+ err))
    }

    render(){
        return(
            <div className="modal fade" id="CollectionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Collection Amount</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                                                    <label>Type:</label>
                        <select className="custom-select custom-select-sm" data-name="typeTransaction"required onChange={this.onValueChange} >
  <option selected value="">Select...</option>
  <option value="Collection">Collection</option>
</select>
                            <label>Date:</label>
                            <input type="date" className="form-control form-control-sm" id="date" data-name="dateCollect" required onChange={this.onValueChange}/>
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" className="form-control form-control-sm" id="amount" placeholder="Enter Amount" data-name="amountCollect" required onChange={this.onValueChange}/>
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
        )
    }
}