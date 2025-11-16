import { useEffect, useState } from "react";
import axios from "axios";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [searchCode, setSearchCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadCustomers = () => {
        fetch("http://localhost:5000/api/customers")
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data);
                setError("");
            })
            .catch((err) => console.error("Error cargando clientes:", err));
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const searchCustomer = async () => {
        if (!searchCode.trim()) return loadCustomers();

        setLoading(true);
        setError("");

        try {
            const res = await axios.get(
                `http://localhost:5000/api/customers/search?code=${searchCode}`
            );

            setCustomers([res.data]);
        } catch (err) {
            setCustomers([]);
            setError("No se encontró el cliente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Barra de búsqueda</h2>
            <div className="flex gap-3 items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por código..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="border rounded-xl p-2 w-64"
                />
                <button
                    onClick={searchCustomer}
                    className="px-4 py-2 rounded-xl shadow bg-blue-600 text-white"
                >
                    Buscar
                </button>
                <button
                    onClick={loadCustomers}
                    className="px-4 py-2 rounded-xl shadow bg-gray-300"
                >
                    Reset
                </button>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Listado de Clientes</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Código</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.address}</td>
                            <td>{c.phone}</td>
                            <td>{c.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;
