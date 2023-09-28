import React, {useEffect, useState} from "react"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  const [information, setInformation] = useState({
    givenName: "",
    surName: "",
    phoneNumber: "",
    email: ""
  })

  const [shipping, setShipping] = useState({
    shippingPhoneNumber: "",
    countryCode: "",
    name: "",
    postcode: "",
    suburb: "",
    line1: ""
  })

  const [order, setOrder] = useState({
      orderInformation: information,
      orderShipping: shipping
    })

  const onShippingChange = (e) =>{
    setShipping({...shipping, [e.target.name]: e.target.value})
  }

  const onInformationChange = (e) => {
    setInformation({...information, [e.target.name]: e.target.value})
  }

  const [errorMessage, setErrorMessage] = useState("")


  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      information.email === "" ||
      information.givenName === "" ||
      information.phoneNumber === "" ||
      information.surName === "" ||
      shipping.shippingPhoneNumber === "" ||
      shipping.countryCode === "" ||
      shipping.name === "" ||
      shipping.line1 === "" ||
      shipping.postcode === "" ||
      shipping.suburb === ""
    ) {
      setErrorMessage("Please fill out all information");
      return;
    }
    setOrder({
      orderInformation: information,
      orderShipping: shipping,
    });
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/v1/orders", order);
        window.location.href = response.data.checkoutUrl
      } catch (error) {
        setErrorMessage('Khong thanh cong')
      }
    };

    if (order.orderInformation.email !== "" && order.orderShipping.countryCode !== "") {
      sendRequest();
    }
  }, [order]);


  return (
    <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <form onSubmit={onSubmit}>
            <h2 className="text-center m-4">Create Order</h2>
            <hr/>
            {errorMessage && <h4 className="text text-danger text-center">{errorMessage}</h4>}
            <label htmlFor="Information" className="form-label">
              Information
            </label>
            <div className="mb-3 border rounded p-3">
              <label htmlFor="Given name" className="form-label mt-1">
                Given name:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your given name"
                name="givenName"
                value={information.givenName}
                onChange={(e) => onInformationChange(e)}
              />
              <label htmlFor="Surname" className="form-label mt-1">
                Surname: 
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your surname"
                name="surName"
                value={information.surName}
                onChange={(e) => onInformationChange(e)}
              />
              <label htmlFor="Phone number" className="form-label mt-1">
                Phone number: 
              </label>
              <input
                type={"tel"}
                className="form-control"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={information.phoneNumber}
                onChange={(e) => onInformationChange(e)}
              />
              <label htmlFor="Email" className="form-label mt-1">
                Email: 
              </label>
              <input
                type={"email"}
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={information.email}
                onChange={(e) => onInformationChange(e)}
              />
            </div>
            <hr/>
            <label htmlFor="Shipping" className="form-label">
              Shipping
            </label>
            <div className="mb-3 border rounded p-3">
              <label htmlFor="Phone number" className="form-label mt-1">
                Phone number: 
              </label>
              <input
                type={"tel"}
                className="form-control"
                placeholder="Enter your phone number"
                name="shippingPhoneNumber"
                value={shipping.shippingPhoneNumber}
                onChange={(e) => onShippingChange(e)}
              />
              <label htmlFor="Country code" className="form-label mt-1">
                Country code:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your country code"
                name="countryCode"
                value={shipping.countryCode}
                onChange={(e) => onShippingChange(e)}
              />
              <label htmlFor="Name" className="form-label mt-1">
                Name:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={shipping.name}
                onChange={(e) => onShippingChange(e)}
              />
              <label htmlFor="Postcode" className="form-label mt-1">
                Postcode:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your postcode"
                name="postcode"
                value={shipping.postcode}
                onChange={(e) => onShippingChange(e)}
              />
              <label htmlFor="Suburb" className="form-label mt-1">
                Suburb:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your suburb"
                name="suburb"
                value={shipping.suburb}
                onChange={(e) => onShippingChange(e)}
              />
              <label htmlFor="Line 1" className="form-label mt-1">
                Line 1:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your line 1"
                name="line1"
                value={shipping.line1}
                onChange={(e) => onShippingChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>    
          </div>
        </div>
    </div>
  );
}