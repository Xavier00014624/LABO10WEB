import { useEffect, useState } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const res = await fetch("http://localhost:5000/api/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Listado de Ventas</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>${sale.amount}</td>
              <td>{new Date(sale.created_at).toLocaleString()}</td>
              <td>{sale.customer_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
