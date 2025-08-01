import React, { useState, useMemo } from 'react';
import { Order } from '../types';

interface SortConfig {
  key: keyof Order;
  direction: 'ascending' | 'descending';
}

const useSortableData = (items: Order[], config: SortConfig | null = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof Order) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'Completed': return 'text-green-400';
        case 'Processing': return 'text-yellow-400';
        case 'Delayed': return 'text-red-400';
        default: return 'text-gray-400';
    }
}

const ITEMS_PER_PAGE = 15;

export const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { items, requestSort, sortConfig } = useSortableData(orders);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getSortIcon = (key: keyof Order) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <i className="fas fa-sort text-gray-500 ml-2"></i>;
    }
    return sortConfig.direction === 'ascending' 
        ? <i className="fas fa-sort-up text-cyan-400 ml-2"></i> 
        : <i className="fas fa-sort-down text-cyan-400 ml-2"></i>;
  };

  const headers: { key: keyof Order, label: string }[] = [
      { key: 'id', label: 'Order ID' },
      { key: 'orderDate', label: 'Date' },
      { key: 'category', label: 'Category' },
      { key: 'processingTimeHours', label: 'Proc. Time (hrs)' },
      { key: 'status', label: 'Status' },
  ];

  return (
    <div className="h-full flex flex-col font-mono">
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-sm data-table">
          <thead className="sticky top-0 z-10">
            <tr>
                {headers.map(header => (
                    <th key={header.key} onClick={() => requestSort(header.key)}>
                        {header.label} {getSortIcon(header.key)}
                    </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((order) => (
              <tr key={order.id} className={`${order.status === 'Delayed' ? 'bg-red-900/20 hover:bg-red-900/30' : ''}`}>
                <td>#{order.id.toString().padStart(5, '0')}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.category}</td>
                <td>{order.processingTimeHours}</td>
                <td className={getStatusColor(order.status)}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 text-xs">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
            >
                Prev
            </button>
            <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
            >
                Next
            </button>
          </div>
      </div>
    </div>
  );
};
