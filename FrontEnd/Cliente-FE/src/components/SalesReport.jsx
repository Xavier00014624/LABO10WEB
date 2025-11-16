import { useEffect, useState } from "react";

function SalesReport() {
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/sales/report")
            .then((res) => res.json())
            .then((data) => setReport(data))
            .catch((err) => console.error("Error cargando reporte:", err));
    }, []);

    return (
        <div>
            <h2>Reporte de Ventas por Cliente</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total de Ventas</th>
                    </tr>
                </thead>

                <tbody>
                    {report.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>${row.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesReport;
