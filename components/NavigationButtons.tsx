'use client'

export default function NavigationButtons() {
  const platforms = [
    {
      name: 'GenSpark',
      url: 'https://genspark.ai',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'hover:from-purple-600 hover:to-purple-800',
      icon: '🚀',
    },
    {
      name: 'Manus',
      url: 'https://manus.ai',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      icon: '🎯',
    },
    {
      name: 'Lovable',
      url: 'https://lovable.dev',
      color: 'from-pink-500 to-pink-700',
      hoverColor: 'hover:from-pink-600 hover:to-pink-800',
      icon: '❤️',
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-slideIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🌐 Build Your Website
      </h2>
      <p className="text-gray-600 mb-6">
        Click on any platform below to open it in a new tab. Then paste your generated prompt!
      </p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 bg-gradient-to-r ${platform.color} ${platform.hoverColor} text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            <span className="text-2xl">{platform.icon}</span>
            <span>{platform.name}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          ⚡ <strong>Pro Tip:</strong> All platforms support advanced AI website generation. Choose the one that best fits your needs or try them all!
        </p>
      </div>
    </div>
  )
}

