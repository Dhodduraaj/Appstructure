export default function Resources() {
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: '5-Minute Breathing Exercise',
      description: 'Guided breathing for stress relief'
    },
    {
      id: 'inpok4MKVLM',
      title: 'Mindfulness Meditation',
      description: '10-minute guided meditation'
    },
    {
      id: 'ZToicYcHIOU',
      title: 'Progressive Muscle Relaxation',
      description: 'Body relaxation technique'
    }
  ]

  const articles = [
    {
      title: 'Understanding Anxiety: A Complete Guide',
      description: 'Learn about anxiety disorders, symptoms, and coping strategies.',
      link: 'https://www.helpguide.org/articles/anxiety/anxiety-disorders-and-anxiety-attacks.htm'
    },
    {
      title: 'Depression: Signs, Symptoms, and Treatment',
      description: 'Comprehensive information about depression and available treatments.',
      link: 'https://www.nimh.nih.gov/health/topics/depression'
    },
    {
      title: 'Building Resilience: How to Bounce Back',
      description: 'Strategies for developing mental resilience and emotional strength.',
      link: 'https://www.apa.org/topics/resilience'
    },
    {
      title: 'Mindfulness and Mental Health',
      description: 'The benefits of mindfulness practice for mental wellbeing.',
      link: 'https://www.mindful.org/mindfulness-mental-health/'
    },
    {
      title: 'Sleep and Mental Health',
      description: 'The connection between sleep quality and mental health.',
      link: 'https://www.sleepfoundation.org/mental-health'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center float-animation">
            <span className="text-white text-xl">📚</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mental Health Resources
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated collection of videos, articles, and tools to support your mental health journey.
        </p>
      </div>
      
      {/* Enhanced Crisis Support */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-6 rounded-xl animate-slideIn">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🚨</span>
          </div>
          <h3 className="text-xl font-bold text-red-800">Crisis Support</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>📞</span>
              <span>Emergency Hotlines</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://988lifeline.org" target="_blank">988 Suicide & Crisis Lifeline (US)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.samaritans.org" target="_blank">Samaritans (UK & ROI)</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.crisistextline.org" target="_blank">Crisis Text Line</a></li>
            </ul>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <span>🌍</span>
              <span>International Resources</span>
            </h4>
            <ul className="space-y-2">
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.befrienders.org" target="_blank">Befrienders Worldwide</a></li>
              <li><a className="text-blue-700 hover:text-blue-800 underline transition-colors" href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank">IASP Crisis Centres</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Relaxation Videos */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🎥</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Relaxation Videos
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="group border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-pink-300 transition-all duration-300 interactive-hover animate-slideIn"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{video.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mental Health Articles */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">📚 Mental Health Articles</h3>
        <div className="space-y-3">
          {articles.map((article, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium text-blue-700 hover:text-blue-800">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h4>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">👥 Communities & Support Groups</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Online Communities</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/mentalhealth/" target="_blank">Reddit: r/mentalhealth</a></li>
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/Anxiety/" target="_blank">Reddit: r/Anxiety</a></li>
              <li><a className="text-blue-700 underline" href="https://www.reddit.com/r/depression/" target="_blank">Reddit: r/depression</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Local Support</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.meetup.com/topics/mental-health/" target="_blank">Meetup: Local Support Groups</a></li>
              <li><a className="text-blue-700 underline" href="https://www.nami.org/Support-Education" target="_blank">NAMI Support Groups</a></li>
              <li><a className="text-blue-700 underline" href="https://www.mentalhealth.gov/get-help/immediate-help" target="_blank">Mental Health.gov Resources</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Self-Help Tools */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">🛠️ Self-Help Tools</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Mobile Apps</h4>
            <ul className="space-y-1 text-sm">
              <li>• Headspace (Meditation & Mindfulness)</li>
              <li>• Calm (Sleep & Meditation)</li>
              <li>• Moodpath (Mood Tracking)</li>
              <li>• Sanvello (Anxiety & Depression)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Websites</h4>
            <ul className="space-y-1 text-sm">
              <li><a className="text-blue-700 underline" href="https://www.mindfulness.org" target="_blank">Mindfulness.org</a></li>
              <li><a className="text-blue-700 underline" href="https://www.psychologytoday.com" target="_blank">Psychology Today</a></li>
              <li><a className="text-blue-700 underline" href="https://www.verywellmind.com" target="_blank">Verywell Mind</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


