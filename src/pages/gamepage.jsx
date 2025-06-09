import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Home, RotateCcw } from 'lucide-react'

const GamePage = () => {
  // 게임 상태
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [bubbles, setBubbles] = useState([])
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showStartPopup, setShowStartPopup] = useState(true)
  const [combo, setCombo] = useState([])
  const [fruitUpgrades, setFruitUpgrades] = useState({});

  // 참조
  const gameAreaRef = useRef(null);
  const gameTimerRef = useRef(null);
  const bubbleSpawnerRef = useRef(null);
  // 최신 상태 추적용 ref
  const showStartPopupRef = useRef(showStartPopup);
  const gameActiveRef = useRef(gameActive);

  useEffect(() => { showStartPopupRef.current = showStartPopup; }, [showStartPopup]);
  useEffect(() => { gameActiveRef.current = gameActive; }, [gameActive]);

  // 게임 시작
  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setBubbles([]);
    setGameActive(true);
    setGameOver(false);
    setCombo([]);
    setFruitUpgrades({});
    setShowStartPopup(false);

    clearInterval(gameTimerRef.current);
    clearInterval(bubbleSpawnerRef.current);

    // 타이머 시작
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 버블 생성 시작
    bubbleSpawnerRef.current = setInterval(() => {
      if (!showStartPopupRef.current && gameActiveRef.current) {
        if (Math.random() < 0.1) createTimeBonus();
        else createBubble();
      }
    }, 460);

    // 초기 버블들
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        if (!showStartPopupRef.current && gameActiveRef.current) createBubble();
      }, i * 150);
    }
  };
// 중복 제거: 아래 startGame 함수 삭제


  // 리프레시(초기화) 버튼
  const resetGame = () => {
    setScore(0);
    setTimeLeft(20);
    setBubbles([]);
    setGameActive(false);
    setGameOver(false);
    setCombo([]);
    setFruitUpgrades({});
    clearInterval(gameTimerRef.current);
    clearInterval(bubbleSpawnerRef.current);
    setShowStartPopup(true);
  };

  // 게임 종료
  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    clearInterval(gameTimerRef.current);
    clearInterval(bubbleSpawnerRef.current);
  };
// 중복 제거: 아래 endGame 함수 삭제


  // 과일 데이터
  const fruits = [
    { emoji: '🍎', points: 1, color: '#FF6B6B' },
    { emoji: '🍊', points: 2, color: '#FF8E53' },
    { emoji: '🍌', points: 3, color: '#FFD93D' },
    { emoji: '🍇', points: 4, color: '#9B59B6' },
    { emoji: '🍓', points: 5, color: '#E74C3C' },
    { emoji: '🥝', points: 6, color: '#58D68D' },
    { emoji: '🍑', points: 7, color: '#EC7063' },
    { emoji: '🍒', points: 8, color: '#C0392B' },
    { emoji: '🥭', points: 9, color: '#F39C12' },
    { emoji: '🍍', points: 10, color: '#F1C40F' }
  ]
  


  // 버블 생성
  const createBubble = () => {
    if (!gameActiveRef.current) return;
    
    const fruit = fruits[Math.floor(Math.random() * fruits.length)]
    const upgradeLevel = fruitUpgrades[fruit.emoji] || 0
    const points = fruit.points * Math.pow(2, upgradeLevel)
    
    let size = 100 - (fruit.points - 1) * 6
    if (fruit.points <= 3) size *= 1.5
    
    const newBubble = {
      id: Date.now() + Math.random(),
      fruit,
      points,
      size,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size - 200) + 150,
      upgradeLevel,
      displayTime: 2000 - (fruit.points - 1) * 200,
      isTimeBonus: false
    }
    
    setBubbles(prev => [...prev, newBubble])
    
    // 자동 제거
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
    }, newBubble.displayTime)
  }
  
  // 시간 보너스 생성
  const createTimeBonus = () => {
    if (!gameActiveRef.current) return;
    
    const size = 70
    const newTimeBonus = {
      id: Date.now() + Math.random(),
      size,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size - 200) + 150,
      isTimeBonus: true,
      displayTime: 3000
    }
    
    setBubbles(prev => [...prev, newTimeBonus])
    
    // 자동 제거
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newTimeBonus.id))
    }, newTimeBonus.displayTime)
  }
  
  // 버블 클릭
  const popBubble = (bubble) => {
    if (!gameActive) return
    
    if (bubble.isTimeBonus) {
      // 시간 보너스
      setTimeLeft(prev => prev + 1)
    } else {
      // 일반 과일
      setScore(prev => prev + bubble.points)
      
      // 콤보 처리
      const newCombo = [...combo, bubble.fruit.emoji]
      if (newCombo.length > 3) newCombo.shift()
      setCombo(newCombo)
      
      // 3연속 체크
      const lastThree = newCombo.slice(-3)
      if (lastThree.length === 3 && lastThree.every(emoji => emoji === bubble.fruit.emoji)) {
        setFruitUpgrades(prev => ({
          ...prev,
          [bubble.fruit.emoji]: (prev[bubble.fruit.emoji] || 0) + 1
        }))
        setCombo([])
      }
    }
    
    // 버블 제거
    setBubbles(prev => prev.filter(b => b.id !== bubble.id))
  }
  
  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current)
      clearInterval(bubbleSpawnerRef.current)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 relative overflow-hidden">
      {/* 게임 시작 팝업 */}
      {showStartPopup && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">버블 팝 게임</h2>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
            >
              게임 시작
            </button>
          </div>
        </div>
      )}
      {/* 상단 UI */}
      <div className="absolute top-0 left-0 right-0 z-50">
        {/* 타이머 바 */}
        <div className="w-full h-2 bg-black/30">
          <div 
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500'
            }`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>
        
        {/* 점수와 네비게이션 */}
        <div className="flex justify-between items-center p-4">
          <div className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
            {score}
          </div>
          <div className="flex gap-2">
            <Link to="/" className="p-2 bg-white/20 rounded-lg backdrop-blur">
              <Home className="w-6 h-6 text-white" />
            </Link>
            <button
              onClick={resetGame}
              className="p-2 bg-white/20 rounded-lg backdrop-blur"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        
        {/* 콤보 디스플레이 */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2 flex gap-2 items-center min-h-[48px]">
            {combo.length === 0 ? (
              <span className="text-white/70 text-sm">연속 터치로 콤보!</span>
            ) : (
              <>
                {combo.map((emoji, index) => (
                  <span key={index} className="text-2xl animate-bounce">
                    {emoji}
                  </span>
                ))}
                {combo.length === 2 && combo[0] === combo[1] && (
                  <span className="text-yellow-400 text-xs font-bold ml-2">
                    {combo[0]} 하나 더!
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* 게임 영역 */}
      <div ref={gameAreaRef} className="absolute inset-0 pt-32">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`absolute rounded-full cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 ${
              bubble.isTimeBonus 
                ? 'border-green-400 bg-gradient-to-r from-green-500 to-green-600 animate-pulse shadow-lg shadow-green-400/50' 
                : bubble.upgradeLevel > 0 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' 
                  : 'border-white/40'
            }`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              background: bubble.isTimeBonus 
                ? undefined 
                : `radial-gradient(circle, ${bubble.fruit.color}, ${bubble.fruit.color}dd)`
            }}
            onClick={() => popBubble(bubble)}
            onTouchStart={(e) => {
              e.preventDefault()
              popBubble(bubble)
            }}
          >
            {bubble.isTimeBonus ? (
              <div className="text-white font-bold text-lg">⏰+1</div>
            ) : (
              <div className="text-center">
                <div 
                  className="leading-none"
                  style={{ fontSize: `${Math.max(16, bubble.size * 0.35)}px` }}
                >
                  {bubble.fruit.emoji}
                </div>
                <div 
                  className="font-bold text-white drop-shadow"
                  style={{ fontSize: `${Math.max(10, bubble.size * 0.2)}px` }}
                >
                  {bubble.points}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 게임 시작/종료 모달 */}
      {(!gameActive || gameOver) && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur rounded-2xl p-8 max-w-md mx-4 text-center">
            {gameOver ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">게임 종료!</h2>
                <p className="text-xl text-gray-600 mb-6">최종 점수: <span className="font-bold text-purple-600">{score}</span>점</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={startGame}
                    className="btn-primary w-full"
                  >
                    다시 시작
                  </button>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    홈으로 돌아가기
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">버블 팝 게임</h2>
                <p className="text-gray-600 mb-6">
                  과일을 터치해서 점수를 얻고,<br />
                  같은 과일 3연속으로 업그레이드하세요!
                </p>
                <button 
                  onClick={startGame}
                  className="btn-primary w-full text-xl py-4"
                >
                  게임 시작
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage