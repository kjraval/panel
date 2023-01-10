import React from 'react';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      rollNo: "",
      data : [],
      index :0
    }
  }

  clear() {
    this.setState({ name: "", rollNo: "" })
  }

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  notify(message) {
    toast.success(message, {position: toast.POSITION.TOP_RIGHT});
  }

  save() {
    if (this.state.rollNo === "") {
        return document.getElementById("rollnoError").classList.remove("hidden")
    } else {
    
      document.getElementById("rollnoError").classList.add("hidden")  
    }

    if (this.state.name === "") {
        return document.getElementById("nameError").classList.remove("hidden")
    } else {

      document.getElementById("nameError").classList.add("hidden")
      }

    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.push({name: this.state.name,rollNo:this.state.rollNo});
    this.setState({data});
    localStorage.setItem("data",JSON.stringify(data))

    this.notify("Successfully Saved");
    this.clear();
  }


  navigation(){

    let data = JSON.parse(localStorage.getItem("data")) || [];
   

      this.setState({name:data[this.index].name,rollNo:data[this.index].rollNo})
    
  }


  componentDidMount(){

    let data = JSON.parse(localStorage.getItem("data")) || [];
    this.setState({data:data});
    
  }

first(){

  this.index = 0;
  this.navigation();



}


  render() {
    return (
      <>
        <ToastContainer />

        <div className="App ">


          <div className="container mx-auto">

            <div className="flex justify-center px-6 my-12">
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">Student Management</h3>
                <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4 md:flex md:justify-center">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                        Roll No
                      </label>
                      <input value={this.state.rollNo} onChange={(e) => { this.updateState(e) }} name="rollNo" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                      <p id="rollnoError" className="hidden  text-xs italic text-red-500">Roll No can not be empty.</p>

                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                        Name
                      </label>
                      <input value={this.state.name} onChange={(e) => { this.updateState(e) }} name="name" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
                      <p id="nameError" className=" hidden text-xs italic text-red-500">Please choose a password.</p>

                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button onClick={() => { this.save() }} className="w-auto px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline">
                      Save
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                      Update
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline" type="button">
                      Delete
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline" type="button">
                      Clear
                    </button>



                  </div>

                  <div className="mb-6 text-center">
                    <button onClick={() => { this.first() }} className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                      First
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                      Prev
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                      Next
                    </button>
                    <button className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                      Last
                    </button>

                  </div>






                </div>
              </div>
            </div>
          </div>




      
<div class=" mx-[100px]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Roll No
                </th>
                <th scope="col" class="px-6 py-3">
                   Name
                </th>
            </tr>
        </thead>
        <tbody> 
          {this.state.data.map(data =>{
           return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.rollNo}
                </th>
                <td class="px-6 py-4">
                  {data.name}
                </td>
            </tr>
            })}
             </tbody>
    </table>
</div>










        </div>
      </>
    );
  }
}
export default App;
