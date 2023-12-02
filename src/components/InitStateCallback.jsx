import React, { useState } from "react";

function InitStateCallback() {

  const [totalAmount, setTotalAmount] = useState(() => {
    const bills = [200, 250, 300, 350];
    const total = bills.reduce(function (frevValue, curValue) {
      return frevValue + curValue;
    });
    return total;
  });

  const [amount, setAmount] = useState(0);
  const handleInputAmount = (e) => {
    setAmount(Number(e.target.value));
  };
  const handlePaymen = () => {
    setTotalAmount(totalAmount + amount);
  };

  return (
    <div className="container mt-4">
      <input type="number" onInput={handleInputAmount} />
      <button onClick={handlePaymen}>Payment</button>
      <br />
      <h1>Total amount: {totalAmount}</h1>
    </div>
  );
}
export default InitStateCallback;
