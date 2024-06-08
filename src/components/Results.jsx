import React, { useState } from 'react';

const resources = [
  {
    category: 'UPSC',
    sno: 1,
    bookTitle: 'How to Prepare for Logical Reasoning for CAT',
    size: '7MB',
    downloadLink: 'https://example.com/prepare-logical-reasoning-cat',
    author: 'Arun Sharma',
  },
  {
    category: 'JEE',
    sno: 2,
    bookTitle: 'Quantitative Aptitude for Competitive Examinations',
    size: '9MB',
    downloadLink: 'https://example.com/quantitative-aptitude-cat',
    author: 'R.S. Aggarwal',
  },
  {
    category: 'CAT',
    sno: 3,
    bookTitle: 'CAT 20 Years Topic-wise Solved Papers',
    size: '12MB',
    downloadLink: 'https://example.com/cat-solved-papers',
    author: 'Disha Experts',
  },
  // Dummy data for other categories...
];

const studyResourcesColumns = [
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'sno',
    label: 'S.No',
  },
  {
    id: 'bookTitle',
    label: 'Book Title',
  },
  {
    id: 'size',
    label: 'Size',
  },
  {
    id: 'downloadLink',
    label: 'Download Link',
  },
  {
    id: 'author',
    label: 'Author',
  },
];

const Tab = ({ category, isActive, onClick }) => {
  return (
    <button
      className={`mr-4 px-4 py-2 rounded focus:outline-none ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
};

const Table = ({ data, columns }) => {
  return (
    <table className="table-auto">
      <thead className="text-xs font-semibold uppercase text-gray-400" style={{ backgroundColor: '#F4F4F4' }}>
        <tr>
          {columns.map((column) => (
            <th key={column.id} className="p-2 whitespace-nowrap text-left">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-100">
        {data.map((resource, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {columns.map((column) => (
              <td key={column.id} className="p-3 whitespace-nowrap">
                {resource[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StudyResourcesTabs = () => {
  const [activeTab, setActiveTab] = useState('CAT');

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <div>
      <div className="flex mb-4">
        <Tab category="CAT" isActive={activeTab === 'CAT'} onClick={handleTabClick} />
        <Tab category="GATE" isActive={activeTab === 'GATE'} onClick={handleTabClick} />
        <Tab category="Placements" isActive={activeTab === 'Placements'} onClick={handleTabClick} />
        <Tab category="UPSC" isActive={activeTab === 'UPSC'} onClick={handleTabClick} />
        <Tab category="JEE" isActive={activeTab === 'JEE'} onClick={handleTabClick} />
        <Tab category="NEET" isActive={activeTab === 'NEET'} onClick={handleTabClick} />
        <Tab category="PSUs" isActive={activeTab === 'PSUs'} onClick={handleTabClick} />
      </div>
      <Table
        data={resources.filter((resource) => resource.category === activeTab)}
        columns={studyResourcesColumns}
      />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Study Resources</h1>
      <StudyResourcesTabs />
    </div>
  );
};

export default App;
