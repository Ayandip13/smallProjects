import React, { useState } from "react";
import './App.css'

const App = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const calcbmi = (e) => {

    e.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter the valid data')
    } else {
      const bmi = (weight/(height*height)*703)
      setBmi(bmi.toFixed(1))

      if (bmi<18) {
        setMessage('You are underweight')
      } else if (bmi < 18 && bmi > 25) {
        setMessage('You have normal BMI rate, so You are healthy')
      } else if (bmi > 25 && bmi < 30) {
        setMessage('You are in the overweight category')
      } else if (bmi > 30) {
        setMessage('You are Obease')
      }
    }

  };

  const reload = () => {
    window.location.reload()
  }


  return (
    <div className="App">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={calcbmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="text"
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter Weight"
              value={weight}
            />
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              type="text"
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter Height"
              value={height}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button type="submit" onClick={reload} className="btn btn-outline">
              Reload
            </button>
          </div>
          <div className="center">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
