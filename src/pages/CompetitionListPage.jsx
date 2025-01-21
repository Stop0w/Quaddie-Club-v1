import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CompetitionFilters from '../components/competitions/CompetitionFilters'
import CompetitionGrid from '../components/competitions/CompetitionGrid'
import CompetitionList from '../components/competitions/CompetitionList'
import MobileFilterDrawer from '../components/competitions/MobileFilterDrawer'
import SearchBar from '../components/competitions/SearchBar'
import { useCompetitions } from '../hooks/useCompetitions'
import { useViewport } from '../hooks/useViewport'

export default function CompetitionListPage() {
  const { isMobile } = useViewport()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { 
    competitions,
    filters,
    setFilters,
    isLoading,
    hasMore,
    loadMore
  } = useCompetitions()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-white">Competitions</h1>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium
                    ${viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium
                    ${viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  List
                </button>
              </div>

              {/* Mobile Filter Button */}
              {isMobile && (
                <button
                  onClick={() => setShowFilters(true)}
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBar 
              onSearch={(query) => setFilters({ ...filters, search: query })}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          {!isMobile && (
            <div className="w-64 flex-shrink-0">
              <CompetitionFilters 
                filters={filters}
                onChange={setFilters}
              />
            </div>
          )}

          {/* Competition List/Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <CompetitionGrid 
                competitions={competitions}
                hasMore={hasMore}
                onLoadMore={loadMore}
                isLoading={isLoading}
              />
            ) : (
              <CompetitionList 
                competitions={competitions}
                hasMore={hasMore}
                onLoadMore={loadMore}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobile && showFilters && (
          <MobileFilterDrawer
            filters={filters}
            onChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
