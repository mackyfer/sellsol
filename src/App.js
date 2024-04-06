import './App.css';
import DataTable from './Table.js';
  function App() {
        return (
          <div>
            <h1 className="bg-black p-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl text-white">sellsol</h1>

            <div className="flex flex-auto justify-center">
            <DataTable/>
            </div>
            
          </div>
        ); 
}


export default App;
