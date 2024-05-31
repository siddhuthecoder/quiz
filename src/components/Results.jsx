// StudyResources.js

import { useEffect } from 'react';
import { studyResources, studyResourcesColumns } from '../constants/index';

const StudyResources = () => {
  useEffect(() => {
    console.log(studyResourcesColumns);
    console.log(studyResources);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Study Resources</h1>
      <div className="overflow-x-auto">
        <div className="min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {studyResourcesColumns.map((column) => (
                  <th
                    key={column.id}
                    className="px-5 py-3 bg-blue-800 text-left text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studyResources.map((resource, index) => (
                <tr key={resource.sno} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{resource.sno}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{resource.category}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{resource.bookTitle}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{resource.size}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <a
                      href={resource.downloadLink}
                      className="text-blue-500 hover:text-blue-700 whitespace-no-wrap"
                    >
                      Download
                    </a>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{resource.author}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudyResources;
