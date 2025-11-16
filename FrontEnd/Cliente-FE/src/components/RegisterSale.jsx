import { useState } from "react";

function RegisterSale() {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sale = {
      amount: parseFloat(amount),
      id_customer: parseInt(idCustomer),
    };

    const res = await fetch("http://localhost:5000/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sale),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Venta registrada correctamente");
      setAmount("");
      setIdCustomer("");
    } else {
      setMessage(data.message || "Error al registrar la venta");
    }
  };

  return (
    <div>
      <h2>Registrar Venta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>ID del Cliente:</label>
          <input
            type="number"
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
          />
        </div>

        <button type="submit">Guardar Venta</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterSale;
