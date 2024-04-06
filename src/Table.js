import React, { useState, useEffect } from "react";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/tokens");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        data.response.forEach(res => {
          console.log("result", res)
          delete res.associatedTokenAddress
          delete res.amountRaw
          delete res.name
          delete res.decimals
        });
        const tableData = data.response
        
        console.log('DATA', data)
        setData(tableData);
        setRows(tableData.map((item) => Object.values(item)));
        setHeaders(Object.keys(tableData[0]));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="shadow-sm overflow-hidden my-8">
            <table className="border-collapse table-fixed text-sm">
              <thead>
                <tr className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  {headers.map((header) => (
                    <th scope="col" key={header}>{header}</th>
                  ))}
                  <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                {rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, index) => (
                       
                      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400" key={index}>{cell * 1 === cell ? (cell/1000000000):cell}</td>
                    ))}
                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sell</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
