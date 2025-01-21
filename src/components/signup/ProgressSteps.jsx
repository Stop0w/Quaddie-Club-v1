export default function ProgressSteps({ currentStep }) {
  const steps = [
    { id: 'subscription', label: 'Choose Plan' },
    { id: 'registration', label: 'Create Account' },
    { id: 'verification', label: 'Verify Email' }
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${currentStep === step.id
                ? 'bg-blue-500 text-white'
                : index < steps.findIndex(s => s.id === currentStep)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-400'
              }
            `}>
              {index < steps.findIndex(s => s.id === currentStep) ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`
                w-full h-0.5 mx-2
                ${index < steps.findIndex(s => s.id === currentStep)
                  ? 'bg-green-500'
                  : 'bg-gray-700'
                }
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <span
            key={step.id}
            className={`text-sm ${
              currentStep === step.id ? 'text-white' : 'text-gray-400'
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  )
}
