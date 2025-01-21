import { Line, Bar, Pie } from 'react-chartjs-2'
import { useState } from 'react'

export default function PerformanceCharts({ data, timeframe }) {
  const [chartType, setChartType] = useState('line')

  const chartTypes = [
    { id: 'line', label: 'Trend' },
    { id: 'bar', label: 'Comparison' },
    { id: 'pie', label: 'Distribution' }
  ]

  const chartConfig = {
    line: {
      data: {
        labels: data.timeline,
        datasets: [{
          label: 'ROI',
          data: data.roiTimeline,
          borderColor: '#3B82F6',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          }
        }
      }
    }
    // Add configurations for bar and pie charts
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
        <div className="flex gap-2">
          {chartTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium
                ${chartType === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        {chartType === 'line' && <Line {...chartConfig.line} />}
        {chartType === 'bar' && <Bar {...chartConfig.bar} />}
        {chartType === 'pie' && <Pie {...chartConfig.pie} />}
      </div>
    </div>
  )
}
