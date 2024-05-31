// Dashboard.js

import { useEffect } from 'react';
import { dashboardEntries, dashboardColumns } from '../constants/index';

const Dashboard = () => {
  useEffect(() => {
    console.log(dashboardColumns);
    console.log(dashboardEntries);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              {dashboardColumns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dashboardEntries.map((entry) => (
              <tr key={entry.serialNo} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200">{entry.serialNo}</td>
                <td className="px-6 py-4 border-b border-gray-200">{entry.title}</td>
                <td className="px-6 py-4 border-b border-gray-200">{entry.date}</td>
                <td className="px-6 py-4 border-b border-gray-200">{entry.postedBy}</td>
                <td className="px-6 py-4 border-b border-gray-200">{entry.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
