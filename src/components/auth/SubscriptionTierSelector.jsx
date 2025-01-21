export default function SubscriptionTierSelector({ onSelect, plans }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-white">
          Choose your subscription
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          Select a plan that best fits your needs
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(plans).map(([key, plan]) => (
          <div
            key={key}
            className="relative rounded-lg border border-gray-700 bg-gray-800 p-4 hover:border-blue-400 cursor-pointer"
            onClick={() => onSelect(key)}
          >
            <div className="flex justify-between">
              <div>
                <h4 className="text-lg font-medium text-white">{plan.name}</h4>
                <p className="mt-1 text-sm text-gray-400">
                  {plan.monthly.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-white">
                  ${plan.monthly.price}
                </p>
                <p className="text-sm text-gray-400">/month</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {plan.monthly.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
