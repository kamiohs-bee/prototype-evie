import React from 'react';
import { createRoot } from 'react-dom/client';
import bg from './assets/bg.png';
import logo from './assets/logo.png';
import characterDefault from './assets/character_default.png';
import characterSad from './assets/character_sad.png';
import characterHappy from './assets/character_happy.png';
import characterExcited from './assets/character_excited.png';
import bubbleLeft from './assets/bubble_left.png';
import bubbleRight from './assets/bubble_right.png';
import panelDailyMission from './assets/panel_daily_mission.png';
import btnStart from './assets/btn_start.png';
import btnMessage from './assets/btn_message.png';
import btnSetting from './assets/btn_setting.png';
import levelCharacterButton from './assets/level_character_button.png';
import levelStar from './assets/level_star.png';
import './styles.css';

const CANVAS = {
  width: 1366,
  height: 1024,
};

const characterAssets = {
  sad: characterSad,
  default: characterDefault,
  happy: characterHappy,
  excited: characterExcited,
};

const characterLayout = {
  sad: { left: 374, top: 289, width: 313, height: 461 },
  default: { left: 374, top: 289, width: 314, height: 461 },
  happy: { left: 374, top: 283, width: 315, height: 467 },
  excited: { left: 352, top: 282, width: 345, height: 471 },
};

const steps = [
  {
    id: 1,
    tone: 'dark',
    character: 'sad',
    bubbles: [
      { side: 'left', text: ['안녕...', '나는 이비야.'], left: 96, top: 257 },
      { side: 'right', text: ['요즘 너무', '배가 고파 😢'], left: 704, top: 369 },
    ],
  },
  {
    id: 2,
    tone: 'dark',
    character: 'sad',
    bubbles: [
      { side: 'left', text: ['네 목소리를 들으면', '힘이 날 것 같아!'], left: 96, top: 257 },
      { side: 'right', text: ['목소리를', '들려줄래?'], left: 704, top: 369 },
    ],
    cta: { label: '응, 들려줄게!', left: 508, top: 822, width: 350 },
  },
  {
    id: 3,
    tone: 'bright',
    character: 'excited',
    bubbles: [
      { side: 'left', text: ['정말?!', '고마워!'], left: 98, top: 248 },
      { side: 'right', text: ['말 먹이', '시간이야!'], left: 720, top: 368 },
    ],
    confetti: true,
  },
  {
    id: 4,
    tone: 'bright',
    character: 'happy',
    bubbles: [{ side: 'left', text: ['시작하기 버튼을', '눌러서 시작하자!'], left: 96, top: 257 }],
    showPanel: true,
    panelMode: 'highlightStart',
    startButton: true,
  },
  {
    id: 5,
    tone: 'bright',
    character: 'happy',
    bubbles: [{ side: 'left', text: ['내가 먼저 말할게.', '따라해봐!'], left: 96, top: 257 }],
    showPanel: true,
    missionCard: true,
    speakButton: true,
  },
  {
    id: 6,
    tone: 'bright',
    character: 'excited',
    bubbles: [
      { side: 'left', text: ['정말 잘했어!', '에너지가 채워졌어!'], left: 96, top: 248 },
      { side: 'right', text: ['다음 말 먹이도', '따라해보자!'], left: 704, top: 369 },
    ],
    showPanel: true,
    hearts: 1,
    cta: { label: '다음', left: 565, top: 826, width: 236 },
  },
  {
    id: 7,
    tone: 'bright',
    character: 'excited',
    bubbles: [{ side: 'left', text: ['야호! 오늘 말 먹이', '다 먹었어!'], left: 96, top: 248 }],
    showPanel: true,
    hearts: 3,
    confetti: true,
    replayButton: true,
  },
  {
    id: 8,
    tone: 'bright',
    character: 'happy',
    bubbles: [{ side: 'right', text: ['먹이를 줄수록', '이비 에너지가 쌓여!'], left: 704, top: 369 }],
    showPanel: true,
    hearts: 3,
    showProgress: true,
  },
  {
    id: 9,
    tone: 'bright',
    character: 'happy',
    bubbles: [
      { side: 'left', text: ['에너지가 차면', '새 친구가 올지도 몰라!'], left: 96, top: 245 },
      { side: 'right', text: ['어떤 친구가 올지', '기대되지 않아?'], left: 704, top: 369 },
    ],
    showPanel: true,
    hearts: 3,
    showProgress: true,
    collection: true,
  },
  {
    id: 10,
    tone: 'bright',
    character: 'default',
    bubbles: [
      { side: 'left', text: ['우리 매일매일', '같이 하자!'], left: 96, top: 257 },
      { side: 'right', text: ['이비 기다리고', '있을게!'], left: 704, top: 369 },
    ],
    showHeader: true,
    showPanel: true,
    hearts: 3,
    showProgress: true,
    collection: true,
  },
];

const sparkles = [
  { left: 20, top: 442, size: 30, delay: '0s' },
  { left: 183, top: 445, size: 14, delay: '1.8s' },
  { left: 300, top: 168, size: 13, delay: '0.7s' },
  { left: 291, top: 484, size: 12, delay: '2.1s' },
  { left: 802, top: 560, size: 12, delay: '0.4s' },
  { left: 930, top: 151, size: 28, delay: '1.5s' },
  { left: 961, top: 529, size: 28, delay: '2.4s' },
  { left: 1346, top: 0, size: 32, delay: '2.9s' },
];

function useStageScale() {
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / CANVAS.width, window.innerHeight / CANVAS.height));
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}

function Asset({ src, alt, className = '', style, interactive = false }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable="false"
      className={`absolute select-none object-contain ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
      style={style}
    />
  );
}

function HeaderButtons() {
  return (
    <>
      <Asset src={logo} alt="말씨톡 로고" className="ui-glow appbar-in" style={{ left: 31, top: 34, width: 245, height: 148 }} />
      <button className="asset-button absolute left-[1135px] top-[25px] z-50 h-[93px] w-[93px]" aria-label="메시지" onClick={(event) => event.stopPropagation()}>
        <Asset src={btnMessage} alt="" className="button-glow" style={{ inset: 0, width: 93, height: 93 }} interactive />
      </button>
      <button className="asset-button absolute left-[1235px] top-[25px] z-50 h-[93px] w-[93px]" aria-label="설정" onClick={(event) => event.stopPropagation()}>
        <Asset src={btnSetting} alt="" className="button-glow" style={{ inset: 0, width: 93, height: 93 }} interactive />
      </button>
      <div className="absolute left-[285px] top-[70px] z-50 rounded-full bg-white/75 px-7 py-3 text-[24px] font-black text-violet-600 shadow-soft">
        이비
      </div>
    </>
  );
}

function RoomDecor({ tone }) {
  return (
    <>
      <Asset src={bg} alt="분홍색 게임 방 배경" className="stage-bg" style={{ left: 0, top: 0, width: CANVAS.width, height: CANVAS.height }} />
      {tone === 'dark' && <div className="absolute inset-0 z-[1] bg-[#15091f]/65 backdrop-brightness-75" />}
      <div className="sparkle-layer" aria-hidden="true">
        {sparkles.map((sparkle, index) => (
          <span
            key={index}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}

function OnboardingBubble({ bubble, index }) {
  const asset = bubble.side === 'left' ? bubbleLeft : bubbleRight;
  const textClass = bubble.side === 'left' ? 'left-[42px] top-[31px]' : 'left-[42px] top-[33px]';

  return (
    <div
      className={`absolute z-30 h-[153px] w-[273px] bubble-pop ui-shadow ${index > 0 ? 'bubble-pop-delay' : ''}`}
      style={{ left: bubble.left, top: bubble.top }}
    >
      <Asset src={asset} alt={`${bubble.side === 'left' ? '왼쪽' : '오른쪽'} 말풍선`} style={{ left: 0, top: 0, width: 273, height: 153 }} />
      <p className={`absolute ${textClass} whitespace-pre-line text-[25px] font-black leading-tight text-violet-700 drop-shadow-[0_2px_0_rgba(255,255,255,0.85)]`}>
        {bubble.text.join('\n')}
      </p>
    </div>
  );
}

function CharacterArea({ state }) {
  const layout = characterLayout[state];

  return (
    <Asset
      src={characterAssets[state]}
      alt={`이비 ${state} 상태`}
      className={`z-20 character-glow ${state === 'excited' ? 'character-hop' : 'character-float'}`}
      style={layout}
    />
  );
}

function MissionPanel({ mode, hearts = 0, showStart = false, showReplay = false, onNext }) {
  return (
    <aside className="absolute left-[1035px] top-[146px] z-30 h-[755px] w-[263px] panel-slide">
      <Asset src={panelDailyMission} alt="오늘의 미션 패널" className="ui-shadow panel-breathe" style={{ left: 0, top: 0, width: 263, height: 755 }} />
      {hearts > 0 && (
        <div className="absolute left-[79px] top-[165px] grid gap-[71px]">
          {[0, 1, 2].map((heart) => (
            <div key={heart} className={`mission-heart ${heart < hearts ? 'filled' : ''}`}>♥</div>
          ))}
        </div>
      )}
      {showReplay && (
        <div className="absolute left-[30px] top-[512px] z-40 grid w-[202px] gap-3">
          <button
            className="secondary-button panel-secondary"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
          >
            내 목소리 다시 듣기
          </button>
          <button
            className="secondary-button panel-secondary panel-secondary-light"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            다시 하기
          </button>
        </div>
      )}
      {mode === 'highlightStart' && <div className="absolute left-[22px] top-[596px] h-[132px] w-[236px] rounded-[36px] ring-8 ring-white/75 highlight-pulse" />}
      {showStart && (
        <button
          className="start-button absolute left-[23px] top-[596px] h-[132px] w-[236px]"
          aria-label="시작하기"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
        >
          <Asset src={btnStart} alt="" className="start-glow" style={{ inset: 0, width: 236, height: 132 }} interactive />
        </button>
      )}
    </aside>
  );
}

function ProgressBar() {
  return (
    <div className="custom-progress absolute left-[354px] top-[842px] z-30 h-[105px] w-[700px] progress-glow">
      <div className="progress-shell absolute left-[48px] top-[23px] h-[58px] w-[642px] rounded-full border-[6px] border-white bg-white/90 shadow-soft">
        <div className="progress-rail absolute left-[72px] top-[13px] h-[28px] w-[392px] overflow-hidden rounded-full bg-violet-200">
          <div className="progress-fill h-full rounded-r-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-violet-500" />
        </div>
        <div className="score-box absolute right-[24px] top-[7px] grid h-[34px] w-[128px] place-items-center rounded-full bg-white/70">
          <p className="text-[22px] font-black text-violet-500">120 / 300</p>
        </div>
      </div>
      <Asset src={levelStar} alt="레벨 3" className="level-star-sparkle" style={{ left: 0, top: 0, width: 104, height: 105 }} />
      <span className="absolute left-[42px] top-[31px] z-10 text-[28px] font-black text-orange-500 drop-shadow-[0_2px_0_white]">3</span>
    </div>
  );
}

function CharacterCollectionButton() {
  return (
    <div className="absolute left-[154px] top-[806px] z-30 h-[161px] w-[179px] collection-in">
      <button className="asset-button h-full w-full" aria-label="캐릭터 모음" onClick={(event) => event.stopPropagation()}>
        <Asset src={levelCharacterButton} alt="" className="ui-shadow button-glow" style={{ inset: 0, width: 179, height: 161 }} interactive />
      </button>
    </div>
  );
}

function MissionCard({ onNext }) {
  return (
    <div className="absolute left-[454px] top-[670px] z-40 flex items-center gap-8 rounded-[34px] border-[6px] border-white bg-white/88 px-9 py-6 shadow-soft mission-card">
      <div>
        <p className="text-[20px] font-black text-fuchsia-500">오늘의 말 먹이</p>
        <p className="text-[38px] font-black text-violet-700">빨간 사과</p>
      </div>
      <button
        className="prototype-button mic-pulse"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        말하기
      </button>
    </div>
  );
}

function PrototypeCTA({ cta, onNext }) {
  return (
    <button
      className="prototype-button cta-bounce absolute z-50"
      style={{ left: cta.left, top: cta.top, width: cta.width }}
      onClick={(event) => {
        event.stopPropagation();
        onNext();
      }}
    >
      {cta.label}
    </button>
  );
}

function Confetti() {
  const particles = Array.from({ length: 34 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 34;
    const distance = 135 + (index % 7) * 22;
    return {
      x: Math.round(Math.cos(angle) * distance),
      y: Math.round(Math.sin(angle) * distance),
      rotate: 120 + index * 37,
      delay: `${(index % 5) * 0.025}s`,
      color: ['#fff176', '#ff80ab', '#80deea', '#b388ff', '#ffd180'][index % 5],
    };
  });

  return (
    <div className="confetti-layer" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="confetti"
          style={{
            '--tx': `${particle.x}px`,
            '--ty': `${particle.y}px`,
            '--rot': `${particle.rotate}deg`,
            animationDelay: particle.delay,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="absolute left-1/2 top-6 z-[80] -translate-x-1/2 rounded-full bg-white/55 px-5 py-2 text-[18px] font-black text-violet-700 shadow-soft">
      {current + 1} / {steps.length}
    </div>
  );
}

function OnboardingStep({ step, index, onNext }) {
  return (
    <>
      <RoomDecor tone={step.tone} />
      {step.showHeader && <HeaderButtons />}
      <CharacterArea state={step.character} />
      {step.bubbles.map((bubble, bubbleIndex) => (
        <OnboardingBubble key={`${step.id}-${bubbleIndex}`} bubble={bubble} index={bubbleIndex} />
      ))}
      {step.showPanel && <MissionPanel mode={step.panelMode} hearts={step.hearts} showStart={step.startButton} showReplay={step.replayButton} onNext={onNext} />}
      {step.showProgress && <ProgressBar />}
      {step.collection && <CharacterCollectionButton />}
      {step.missionCard && <MissionCard onNext={onNext} />}
      {step.cta && <PrototypeCTA cta={step.cta} onNext={onNext} />}
      {step.confetti && <Confetti />}
      <StepIndicator current={index} />
    </>
  );
}

function App() {
  const scale = useStageScale();
  const [stepIndex, setStepIndex] = React.useState(0);
  const step = steps[stepIndex];

  const goNext = React.useCallback(() => {
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }, []);

  const goPrevious = React.useCallback(() => {
    setStepIndex((current) => Math.max(current - 1, 0));
  }, []);

  const handleStageClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;

    if (localX > rect.width / 2) {
      goNext();
    } else {
      goPrevious();
    }
  };

  return (
    <main className="app-shell">
      <div className="stage-frame" style={{ width: CANVAS.width * scale, height: CANVAS.height * scale }}>
        <div
          className="stage"
          style={{ width: CANVAS.width, height: CANVAS.height, transform: `scale(${scale})` }}
          onClick={handleStageClick}
        >
          <OnboardingStep step={step} index={stepIndex} onNext={goNext} />
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
