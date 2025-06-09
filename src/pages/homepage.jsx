import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Trophy, Users, Zap } from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "빠른 반응",
      description: "0.2초 만에 사라지는 고점수 과일을 잡아보세요!"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "콤보 시스템",
      description: "같은 과일 3연속으로 점수 2배 업그레이드!"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "친구와 경쟁",
      description: "최고 점수를 기록하고 친구들과 경쟁하세요!"
    }
  ]

  const fruits = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍']

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-white">
            🍎 버블팝
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              특징
            </a>
            <a href="#how-to-play" className="text-white/80 hover:text-white transition-colors">
              게임방법
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* 떠다니는 과일들 */}
            <div className="flex justify-center space-x-4 mb-8">
              {fruits.slice(0, 5).map((fruit, index) => (
                <div
                  key={index}
                  className="text-4xl md:text-6xl fruit-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {fruit}
                </div>
              ))}
            </div>
          </div>

          <h1 className="responsive-title font-bold text-white mb-6 leading-tight">
            과일을 터치하고
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              콤보를 만들어보세요!
            </span>
          </h1>

          <p className="responsive-text text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            20초 안에 최대한 많은 과일을 터치하고, 같은 과일 3연속으로 점수를 업그레이드하세요!
            시간 보너스를 얻어 더 오래 플레이할 수 있어요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/game" 
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 glow-animation"
            >
              <Play className="w-6 h-6" />
              게임 시작하기
            </Link>
            <a 
              href="#how-to-play" 
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              게임 방법 보기
            </a>
          </div>

          {/* 게임 미리보기 */}
          <div className="card max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-white font-semibold mb-2">빠른 게임 미리보기</h3>
              <p className="text-white/70 text-sm">
                • 20초 타임어택<br />
                • 10가지 과일 (1-10점)<br />
                • 콤보로 점수 업그레이드
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            게임 특징
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform">
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            게임 방법
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                기본 규칙
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• 화면에 나타나는 과일을 터치하세요</li>
                <li>• 높은 점수 과일일수록 작고 빨리 사라져요</li>
                <li>• 20초 안에 최대한 많은 점수를 얻으세요</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="bg-yellow-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                콤보 시스템
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• 같은 과일을 연속으로 2개 터치하면 알림</li>
                <li>• 3개 연속으로 터치하면 점수 2배 업그레이드!</li>
                <li>• 업그레이드된 과일은 황금 테두리로 표시</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="bg-green-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                시간 보너스
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• ⏰+1 아이템을 터치하면 1초 추가</li>
                <li>• 10% 확률로 등장하는 특별 아이템</li>
                <li>• 초록색으로 빛나며 쉽게 구분 가능</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                고득점 팁
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• 큰 과일(1-3점)로 안전하게 콤보 시작</li>
                <li>• 작은 과일(8-10점)은 빠르게 반응</li>
                <li>• 시간 보너스로 게임 시간 연장하기</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>© 2024 버블팝 게임. Cho, Chisung Lee가 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage