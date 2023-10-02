import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

//cashin display
const CASH = props => {
    return(
        <tr>
            <td>
  {props.CashList.dateCash && new Date(props.CashList.dateCash).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
  {props.CashList.dateCollect && new Date(props.CashList.dateCollect).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
  {props.CashList.expensesDate && new Date(props.CashList.expensesDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
</td>

            <td>{props.CashList.typeTransaction}</td>
            <td>{props.CashList.amountCash || props.CashList.amountCollect || props.CashList.expensesAmount}</td>
            <td>{props.CashList.expensesDescription }</td>
            

            {/* <td className='text-center'>
                <a className="btn btn-danger btn-sm"href="/" onClick={() => {props.deleteCash(props.CashList._id)}}>Delete</a>
            </td> */}
        </tr>
    )
}

export default class GCashList extends Component{
    //cashin display
    constructor(props) {
        super(props);
        this.deleteCash = this.deleteCash.bind(this);
        this.state = {
          CashList: [],
          total: 0, // Initialize total to 0
        };
      }
//cashin display
componentDidMount(){
    axios.get('http://localhost:5000/gcashTransac/')
    .then((res) => {
      const cashListData = res.data;
      const total = cashListData.reduce((acc, currentList) => {
        const amount = (currentList.amountCash || 0) - (currentList.amountCollect || 0) - (currentList.expensesAmount || 0);
        return acc + amount;
      }, 0);
      this.setState({ CashList: cashListData, total });
    })
    .catch((err) => {
      console.log(err);
    });
  
  }
//cashin display
deleteCash(id){
    axios.delete('http://localhost:5000/gcashTransac/'+id)
    .then(res => console.log(res.data))
    this.setState({
        CashList: this.state.CashList.filter(el => el.id !== id)
    })
}
//cashin display
ListDeclarations(){
    
    return this.state.CashList.map(currentList =>{
        return <CASH CashList={currentList} deleteCash={this.deleteCash} key={currentList._id}/>
    })
}

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="text-center btn btn-sm btn-light mb-3"><strong>CASH ON HAND :</strong> <button className="btn btn-sm btn-success"> <strong>{this.state.total} PESOS</strong></button> </button>
                            <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover table-sm ">
                                                        <thead className="bg-primary text-white">
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Type</th>   
                                                                <th>Amount</th>
                                                                <th>Description</th>
                                                                {/* <th className="text-center">Actions</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.ListDeclarations()}
                                                        </tbody>
                                                    </table>
                                                    <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-end">
    <li className="page-item disabled">
      <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}