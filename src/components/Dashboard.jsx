import { useEffect } from 'react';
import { dashboardEntries, dashboardColumns } from '../constants/index';

const Dashboard = () => {
  useEffect(() => {
    console.log(dashboardColumns);
    console.log(dashboardEntries);
  }, []);

  return (
    <>
      <section className="antialiased bg-gray-100 text-gray-600 h-screen " style={{ width: 'auto',}} >
        <div className="flex flex-col justify-center h-full" >
          {/* Table */}
          <div className="   rounded-sm " style={{
      position: 'relative',
      
      maxWidth: '100%',
     
      overflow: 'hidden',
   
      border: '4px solid #fff',
      borderRadius: '1rem',
      background: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '15px 15px 20px rgba(0, 0, 0, 0.3)',
      transition: 'all .5s ease-in-out',
      boxSizing: 'border-box',
    }}>
            <header className="px-2 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800"><i className="bi bi-card-checklist"></i> Dashboard</h2>
            </header>
            <div className="pt-3">
              <div className="overflow-x-auto">
                <table className="table-auto ">
                  <thead className="text-xs font-semibold uppercase text-gray-400 mt-0" style={{ backgroundColor: '#DEDDDD ' }}>
                    <tr>
                      {dashboardColumns.map((column) => (
                        <th
                          key={column.id}
                          className="p-2 whitespace-nowrap"
                        >
                          <div className="font-semibold text-left"> {column.label} </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
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
      </section>
    </>
  );
};

export default Dashboard;
