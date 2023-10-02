import React,{Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default class addExpenses extends Component{
    constructor(props){
        super(props);
        this.state = {
            expensesDescription: '',
            typeTransaction: '',
            expensesDate: '',
            expensesAmount:'',
            total:''
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
            expensesDescription: this.state.expensesDescription,
            typeTransaction: this.state.typeTransaction,
            expensesDate: this.state.expensesDate,
            expensesAmount: this.state.expensesAmount,
            total: this.state.total
        }
        axios.post('http://localhost:5000/gcashTransac/expenses', gcash)
        .then(res => window.location = "/")
        .catch(err => console.log('Error :'+ err))
    }


    render(){
        return(
            <div class="modal fade" id="ExpensesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Expenses Amount</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                                                    <label>Type:</label>
                        <select className="custom-select custom-select-sm" data-name="typeTransaction"required onChange={this.onValueChange} >
  <option selected value="">Select...</option>
  <option value="Expenses">Expenses</option>
</select>                           <label>Date:</label>
                            <input type="date" className="form-control form-control-sm" id="date" data-name="expensesDate" required onChange={this.onValueChange}/>
                            <label>Description:</label>
                            <input type="text" class="form-control form-control-sm" id="desc" placeholder="Enter Description"data-name="expensesDescription" required onChange={this.onValueChange}/>
                        </div>
                        <div className="form-group">
                            <label>Expenses Amount</label>
                            <input type="number" className="form-control form-control-sm" id="amount" placeholder="Enter Expenses Amount"data-name="expensesAmount" required onChange={this.onValueChange}/>
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