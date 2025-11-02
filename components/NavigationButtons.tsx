'use client'

interface NavigationButtonsProps {
  prompt: string
}

export default function NavigationButtons({ prompt }: NavigationButtonsProps) {
  const platforms = [
    {
      name: 'GenSpark',
      url: 'https://genspark.ai',
    },
    {
      name: 'Manus',
      url: 'https://manus.ai',
    },
    {
      name: 'Lovable',
      url: 'https://lovable.dev',
    },
  ]

  if (!prompt) return null

  return (
    <div className="border-t border-gray-900 pt-12">
      <h2 className="text-lg font-normal text-gray-900 mb-6 uppercase tracking-wider">
        Deployment Platforms
      </h2>
      <p className="text-xs font-light text-gray-600 mb-12 leading-relaxed max-w-md">
        Select your deployment platform and paste the generated prompt to begin.
      </p>
      
      <div className="space-y-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider hover:opacity-60 transition-opacity text-center"
          >
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  )
}

