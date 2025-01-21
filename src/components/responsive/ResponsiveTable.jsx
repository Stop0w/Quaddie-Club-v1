import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewport } from '../../hooks/useViewport'

export default function ResponsiveTable({ 
  data,
  columns,
  onRowClick,
  sortable = true,
  pagination = true,
  itemsPerPage = 10
}) {
  const { isMobile, width } = useViewport()
  const [sortConfig, setSortConfig] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRow, setExpandedRow] = useState(null)

  // Calculate items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  // Sort items if configured
  const sortedItems = React.useMemo(() => {
    if (!sortConfig) return currentItems

    return [...currentItems].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [currentItems, sortConfig])

  const requestSort = (key) => {
    if (!sortable) return

    let direction = 'ascending'
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="w-full">
      {isMobile ? (
        <MobileTableView
          data={sortedItems}
          columns={columns}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          onRowClick={onRowClick}
        />
      ) : (
        <DesktopTableView
          data={sortedItems}
          columns={columns}
          sortConfig={sortConfig}
          requestSort={requestSort}
          onRowClick={onRowClick}
        />
      )}

      {pagination && (
        <TablePagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

function MobileTableView({ data, columns, expandedRow, setExpandedRow, onRowClick }) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-gray-800 rounded-lg overflow-hidden"
        >
          {/* Card Header - Primary Information */}
          <div
            className="p-4 cursor-pointer"
            onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                {columns[0].render ? 
                  columns[0].render(item[columns[0].key], item) :
                  item[columns[0].key]
                }
              </div>
              <ChevronIcon
                className={`transform transition-transform ${
                  expandedRow === item.id ? 'rotate-180' : ''
                }`}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {columns[1].render ? 
                columns[1].render(item[columns[1].key], item) :
                item[columns[1].key]
              }
            </div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {expandedRow === item.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-gray-700"
              >
                <div className="p-4 space-y-3">
                  {columns.slice(2).map((column) => (
                    <div key={column.key}>
                      <div className="text-sm text-gray-400">
                        {column.label}
                      </div>
                      <div className="text-white">
                        {column.render ? 
                          column.render(item[column.key], item) :
                          item[column.key]
                        }
                      </div>
                    </div>
                  ))}
                  
                  {onRowClick && (
                    <button
                      onClick={() => onRowClick(item)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

function DesktopTableView({ data, columns, sortConfig, requestSort, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => requestSort(column.key)}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider
                  ${column.sortable !== false ? 'cursor-pointer hover:text-white' : ''}
                `}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable !== false && sortConfig?.key === column.key && (
                    <SortIcon direction={sortConfig.direction} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`
                ${onRowClick ? 'cursor-pointer hover:bg-gray-750' : ''}
                ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}
              `}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-white"
                >
                  {column.render ? 
                    column.render(item[column.key], item) :
                    item[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TablePagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const { isMobile } = useViewport()

  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="text-sm text-gray-400">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {
          Math.min(currentPage * itemsPerPage, totalItems)
        } of {totalItems} entries
      </div>

      <div className="flex space-x-2">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        {!isMobile && (
          <>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationButton
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </>
        )}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </div>
    </div>
  )
}

function PaginationButton({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1 rounded-md text-sm font-medium
        ${active 
          ? 'bg-blue-600 text-white'
          : disabled
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {children}
    </button>
  )
}

function SortIcon({ direction }) {
  return (
    <svg
      className={`w-4 h-4 transform ${
        direction === 'descending' ? 'rotate-180' : ''
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}
