import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      rollNo: "",
      data: [],
      index: 0,
      buttonToggle: false,
      searchKeyword: "",
      searchData: [],
    };
  }

  clear() {
    this.setState({ name: "", rollNo: "", buttonToggle: false });
  }

  updateState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  notify(message) {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT });
  }

  save() {
    if (this.state.rollNo === "") {
      return document.getElementById("rollnoError").classList.remove("hidden");
    } else {
      document.getElementById("rollnoError").classList.add("hidden");
    }

    if (this.state.name === "") {
      return document.getElementById("nameError").classList.remove("hidden");
    } else {
      document.getElementById("nameError").classList.add("hidden");
    }

    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.push({ name: this.state.name, rollNo: this.state.rollNo });
    this.setState({ data });
    localStorage.setItem("data", JSON.stringify(data));

    this.notify("Successfully Saved");
    this.clear();
  }

  navigation() {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    this.setState({
      name: data[this.state.index].name,
      rollNo: data[this.state.index].rollNo,
      buttonToggle: true,
    });
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    this.setState({ data: data });
  }

  first() {
    this.setState({ index: 0 });
    this.navigation();
  }

  last() {
    this.setState({ index: this.state.data.length - 1 });

    this.navigation();
  }

  prev() {
    if (this.state.index <= 0) {
      this.setState({ index: this.state.data.length - 1 });
      this.navigation();
    } else {
      this.setState({ index: this.state.index - 1 });

      this.navigation();
    }
  }

  next() {
    if (this.state.index >= this.state.data.length - 1) {
      this.setState({ index: 0 });
      this.navigation();
    } else {
      this.setState({ index: this.state.index + 1 });
      this.navigation();
    }
  }

  delete() {
    if (this.state.rollNo === "") {
      return document.getElementById("rollnoError").classList.remove("hidden");
    } else {
      document.getElementById("rollnoError").classList.add("hidden");
    }

    if (this.state.name === "") {
      return document.getElementById("nameError").classList.remove("hidden");
    } else {
      document.getElementById("nameError").classList.add("hidden");
    }

    let data = this.state.data;
    let req = data.filter((x) => x.rollNo !== this.state.rollNo);
    console.log(req);
    this.setState({ data: req });
    localStorage.setItem("data", JSON.stringify(req));

    this.notify("Successfully Deleted");
    this.clear();
  }

  update() {
    if (this.state.rollNo === "") {
      return document.getElementById("rollnoError").classList.remove("hidden");
    } else {
      document.getElementById("rollnoError").classList.add("hidden");
    }

    if (this.state.name === "") {
      return document.getElementById("nameError").classList.remove("hidden");
    } else {
      document.getElementById("nameError").classList.add("hidden");
    }
    let data = this.state.data;

    let index = data.findIndex((x) => x.rollNo === this.state.rollNo);

    data[index].name = this.state.name;

    this.setState({ data });
    localStorage.setItem("data", JSON.stringify(data));

    this.notify("Successfully Updated");
    this.clear();
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.state.data.filter(
      (x) =>
        x.name == this.state.searchKeyword ||
        x.name.startsWith(this.state.searchKeyword) ||
        x.rollNo.startsWith(this.state.searchKeyword) ||
        x.rollNo == this.state.searchKeyword
    );
    this.setState({ searchData: data });
  }

  updateSearch(e) {
    this.setState({ searchKeyword: e.target.value });
    let data = this.state.data.filter(
      (x) =>
        x.name == this.state.searchKeyword ||
        x.name.startsWith(this.state.searchKeyword) ||
        x.rollNo.startsWith(this.state.searchKeyword) ||
        x.rollNo == this.state.searchKeyword
    );
    this.setState({ searchData: data });
  }
  render() {
    return (
      <>
        <ToastContainer />

        <div className="App  h-full">
          <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Student Management
                </h3>
                <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4 md:flex md:justify-center">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        Roll No
                      </label>
                      <input
                        value={this.state.rollNo}
                        onChange={(e) => {
                          this.updateState(e);
                        }}
                        name="rollNo"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="Roll No"
                      />
                      <p
                        id="rollnoError"
                        className="hidden  text-xs italic text-red-500"
                      >
                        Roll No can not be empty.
                      </p>
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Name
                      </label>
                      <input
                        value={this.state.name}
                        onChange={(e) => {
                          this.updateState(e);
                        }}
                        name="name"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Name"
                      />
                      <p
                        id="nameError"
                        className=" hidden text-xs italic text-red-500"
                      >
                        Please choose a password.
                      </p>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={() => {
                        this.save();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      disabled={!this.state.buttonToggle}
                      onClick={() => {
                        this.update();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Update
                    </button>
                    <button
                      disabled={!this.state.buttonToggle}
                      onClick={() => {
                        this.delete();
                      }}
                      className=" w-auto px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        this.clear();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      onClick={() => {
                        this.first();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      First
                    </button>
                    <button
                      onClick={() => {
                        this.prev();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => {
                        this.next();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {
                        this.last();
                      }}
                      className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Last
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="mx-10 mb-[40px]"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                defaultValue={this.state.searchKeyword}
                onChange={(e) => {
                  this.updateSearch(e);
                }}
                name="searchKeyword"
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Search Roll No or Name"
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className=" mx-[100px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Roll No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.searchKeyword == "" ? (
                  <>
                    {this.state.data.map((data) => {
                      return (
                        <tr
                          key={data.rollNo}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {data.rollNo}
                          </th>
                          <td className="px-6 py-4">{data.name}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {this.state.searchData.map((data) => {
                      return (
                        <tr
                          key={data.rollNo}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {data.rollNo}
                          </th>
                          <td className="px-6 py-4">{data.name}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default App;
