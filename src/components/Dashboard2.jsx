// Dashboard.js

import { useEffect } from 'react';
import { dashboardEntries, dashboardColumns } from '../constants/index';

const Dashboard = () => {
  useEffect(() => {
    console.log(dashboardColumns);
    console.log(dashboardEntries);
  }, []);

  return (
    <div className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h1 className="font-semibold text-gray-800 text-2xl mb-4">Dashboard</h1>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {dashboardColumns.map((column) => (
                      <th
                        key={column.id}
                        className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-200">
                  {dashboardEntries.map((entry) => (
                    <tr key={entry.serialNo} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex-shrink-0 mr-3 rounded-full bg-gray-200"></div>
                          <div className="font-medium text-gray-800">{entry.serialNo}</div>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{entry.title}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left font-medium text-green-600">{entry.date}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{entry.postedBy}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{entry.visits}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  