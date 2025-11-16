import CustomerList from "./components/CustomerList";
import RegisterSale from "./components/RegisterSale";
import SalesList from "./components/SalesList";
import SalesReport from "./components/SalesReport";
function App() {
  return (
    
    <div>
      <div style={{ display: "flex", gap: "60px",justifyContent: 'center', alignItems: "flex-start" }}>
    <div style={{ flex: 1 }}>
        <CustomerList />
    </div>

    <div style={{ flex: 1 }}>
        <RegisterSale />
        <SalesList />
    </div>
    <div style={{ flex: 1 }}>
           <SalesReport />
    </div>
</div>
    </div>
  );
}

export default App;
