import React from 'react'

const NavbarSummary = ({ activeCount, completedCount, overdueCount, notCompletedCount }) => {
  return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Active</p>
              <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">🕐</span>
                  <span className="text-2xl font-medium text-gray-800">{activeCount}</span>
              </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Completed</p>
              <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✅</span>
                  <span className="text-2xl font-medium text-gray-800">{completedCount}</span>
              </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Overdue</p>
              <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">⚠️</span>
                  <span className="text-2xl font-medium text-gray-800">{overdueCount}</span>
              </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Not completed</p>
              <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">🔄</span>
                  <span className="text-2xl font-medium text-gray-800">{notCompletedCount}</span>
              </div>
          </div>
      </div>
  )
}

export default NavbarSummary
