import { useState, useCallback, useEffect } from 'react';

interface DOMElement {
  id: string;
  type: 'button' | 'input' | 'text' | 'link';
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isTarget?: boolean;
}

interface AgentAction {
  type: 'click' | 'type' | 'hover';
  x: number;
  y: number;
  text?: string;
  timestamp: number;
}

const TASKS = [
  {
    name: 'click-button',
    instruction: 'Click the "Submit" button',
    elements: [
      { id: 'title', type: 'text' as const, text: 'Contact Form', x: 20, y: 15, width: 120, height: 24 },
      { id: 'input', type: 'input' as const, text: 'john@email.com', x: 20, y: 50, width: 160, height: 32 },
      { id: 'cancel', type: 'button' as const, text: 'Cancel', x: 20, y: 100, width: 70, height: 32 },
      { id: 'submit', type: 'button' as const, text: 'Submit', x: 110, y: 100, width: 70, height: 32, isTarget: true },
    ],
  },
  {
    name: 'click-link',
    instruction: 'Click the "Learn More" link',
    elements: [
      { id: 'heading', type: 'text' as const, text: 'Welcome to Our Site', x: 20, y: 15, width: 160, height: 24 },
      { id: 'para', type: 'text' as const, text: 'Discover amazing features...', x: 20, y: 50, width: 180, height: 20 },
      { id: 'learn', type: 'link' as const, text: 'Learn More', x: 20, y: 85, width: 80, height: 20, isTarget: true },
      { id: 'contact', type: 'link' as const, text: 'Contact Us', x: 120, y: 85, width: 80, height: 20 },
    ],
  },
  {
    name: 'enter-text',
    instruction: 'Type "NYC" in the search box',
    elements: [
      { id: 'logo', type: 'text' as const, text: '🔍 Flight Search', x: 20, y: 15, width: 140, height: 24 },
      { id: 'search', type: 'input' as const, text: '', x: 20, y: 50, width: 140, height: 32, isTarget: true },
      { id: 'go', type: 'button' as const, text: 'Go', x: 170, y: 50, width: 40, height: 32 },
    ],
  },
];

export function WorldOfBitsViz() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [reward, setReward] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 110, y: 160 });
  const [typedText, setTypedText] = useState('');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [showDom, setShowDom] = useState(true);

  const task = TASKS[taskIndex];

  const resetTask = useCallback(() => {
    setActions([]);
    setReward(null);
    setCursorPos({ x: 110, y: 160 });
    setTypedText('');
    setHoveredElement(null);
  }, []);

  const runAgent = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetTask();

    const targetElement = task.elements.find((e) => e.isTarget);
    if (!targetElement) return;

    // Simulate agent thinking and moving
    const targetX = targetElement.x + targetElement.width / 2;
    const targetY = targetElement.y + targetElement.height / 2 + 30; // offset for header

    // Animate cursor movement
    const steps = 20;
    const startX = 110;
    const startY = 160;

    for (let i = 0; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 40));
      const progress = i / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCursorPos({
        x: startX + (targetX - startX) * eased,
        y: startY + (targetY - startY) * eased,
      });
    }

    setHoveredElement(targetElement.id);
    await new Promise((r) => setTimeout(r, 200));

    if (task.name === 'enter-text') {
      // Type animation
      const textToType = 'NYC';
      for (let i = 0; i <= textToType.length; i++) {
        await new Promise((r) => setTimeout(r, 150));
        setTypedText(textToType.slice(0, i));
      }
      setActions([{ type: 'type', x: targetX, y: targetY, text: 'NYC', timestamp: Date.now() }]);
    } else {
      setActions([{ type: 'click', x: targetX, y: targetY, timestamp: Date.now() }]);
    }

    await new Promise((r) => setTimeout(r, 300));
    setReward(1.0);
    setIsRunning(false);
  }, [isRunning, task, resetTask]);

  useEffect(() => {
    resetTask();
  }, [taskIndex, resetTask]);

  const renderElement = (el: DOMElement) => {
    const isHovered = hoveredElement === el.id;
    const baseStyle = {
      position: 'absolute' as const,
      left: el.x,
      top: el.y + 30,
      width: el.width,
      height: el.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: el.type === 'text' ? 'flex-start' : 'center',
      fontSize: '11px',
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      transition: 'all 0.15s ease',
    };

    switch (el.type) {
      case 'button':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              background: isHovered
                ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 600,
              boxShadow: isHovered
                ? '0 4px 12px rgba(139, 92, 246, 0.4)'
                : '0 2px 4px rgba(0,0,0,0.2)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
            }}
          >
            {el.text}
          </div>
        );
      case 'input':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              background: '#1e1b4b',
              border: isHovered ? '2px solid #a855f7' : '2px solid #4338ca',
              borderRadius: '6px',
              color: '#e0e7ff',
              paddingLeft: '8px',
              justifyContent: 'flex-start',
              boxShadow: isHovered ? '0 0 0 3px rgba(168, 85, 247, 0.2)' : 'none',
            }}
          >
            {el.id === 'search' ? typedText || el.text : el.text}
            {isHovered && el.id === 'search' && (
              <span
                style={{
                  animation: 'blink 1s infinite',
                  marginLeft: '1px',
                  color: '#a855f7',
                }}
              >
                |
              </span>
            )}
          </div>
        );
      case 'link':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              color: isHovered ? '#c4b5fd' : '#a5b4fc',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {el.text}
          </div>
        );
      case 'text':
        return (
          <div
            key={el.id}
            style={{
              ...baseStyle,
              color: '#e0e7ff',
              fontWeight: el.id === 'title' || el.id === 'heading' || el.id === 'logo' ? 600 : 400,
            }}
          >
            {el.text}
          </div>
        );
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #0f0a1f 0%, #1a1035 50%, #0d0619 100%)',
        borderRadius: '16px',
        padding: '24px',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.5); opacity: 0; }
          }
        `}
      </style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 700,
              color: '#f5f3ff',
              letterSpacing: '-0.02em',
            }}
          >
            World of Bits Agent
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#a5b4fc' }}>
            Web task reinforcement learning
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowDom(!showDom)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: showDom ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)',
              color: '#e0e7ff',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {showDom ? '◉' : '○'} DOM View
          </button>
        </div>
      </div>

      {/* Task Selection */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        {TASKS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setTaskIndex(i)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background:
                i === taskIndex
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Instruction */}
      <div
        style={{
          background: 'rgba(99, 102, 241, 0.15)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '16px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
        }}
      >
        <div style={{ fontSize: '10px', color: '#a5b4fc', marginBottom: '4px', fontWeight: 600 }}>
          TASK INSTRUCTION
        </div>
        <div style={{ fontSize: '14px', color: '#f5f3ff', fontWeight: 500 }}>{task.instruction}</div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {/* Web Environment */}
        <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
          <div
            style={{
              fontSize: '10px',
              color: '#a5b4fc',
              marginBottom: '8px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            WEB ENVIRONMENT (PIXELS + DOM)
          </div>
          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '180px',
              background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Browser chrome */}
            <div
              style={{
                height: '28px',
                background: 'linear-gradient(180deg, #312e81 0%, #1e1b4b 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: '6px',
                borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
              }}
            >
              <div
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}
              />
              <div
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}
              />
              <div
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}
              />
              <div
                style={{
                  flex: 1,
                  marginLeft: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '9px',
                  color: '#a5b4fc',
                }}
              >
                mini-wob.com/{task.name}
              </div>
            </div>

            {/* Page content */}
            {task.elements.map(renderElement)}

            {/* DOM overlay */}
            {showDom &&
              task.elements.map((el) => (
                <div
                  key={`dom-${el.id}`}
                  style={{
                    position: 'absolute',
                    left: el.x - 2,
                    top: el.y + 28,
                    width: el.width + 4,
                    height: el.height + 4,
                    border: '1px dashed rgba(168, 85, 247, 0.5)',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '0',
                      fontSize: '8px',
                      color: '#c4b5fd',
                      background: 'rgba(15, 10, 31, 0.9)',
                      padding: '1px 4px',
                      borderRadius: '2px',
                    }}
                  >
                    {`<${el.type}>`}
                  </span>
                </div>
              ))}

            {/* Cursor */}
            <div
              style={{
                position: 'absolute',
                left: cursorPos.x,
                top: cursorPos.y,
                width: '16px',
                height: '16px',
                transition: isRunning ? 'none' : 'all 0.1s',
                pointerEvents: 'none',
                zIndex: 100,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 9 L11 9 Z"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>
              {isRunning && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '16px',
                    height: '16px',
                    background: 'rgba(168, 85, 247, 0.4)',
                    borderRadius: '50%',
                    animation: 'pulse 0.8s infinite',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Agent State */}
        <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <div
            style={{
              fontSize: '10px',
              color: '#a5b4fc',
              marginBottom: '8px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            AGENT STATE
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '14px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              height: '152px',
              overflow: 'hidden',
            }}
          >
            {/* Observation */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: '#818cf8', marginBottom: '4px' }}>
                OBSERVATION
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  fontSize: '10px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#86efac',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  Pixels ✓
                </span>
                <span
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#93c5fd',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  DOM ✓
                </span>
                <span
                  style={{
                    background: 'rgba(168, 85, 247, 0.2)',
                    color: '#d8b4fe',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  Text ✓
                </span>
              </div>
            </div>

            {/* Action */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', color: '#818cf8', marginBottom: '4px' }}>
                LAST ACTION
              </div>
              <div style={{ fontSize: '11px', color: '#e0e7ff', fontFamily: 'monospace' }}>
                {actions.length > 0 ? (
                  actions[actions.length - 1].type === 'type' ? (
                    <span>
                      type(<span style={{ color: '#c4b5fd' }}>"{actions[actions.length - 1].text}"</span>)
                    </span>
                  ) : (
                    <span>
                      click(<span style={{ color: '#c4b5fd' }}>x={Math.round(actions[actions.length - 1].x)}</span>,{' '}
                      <span style={{ color: '#c4b5fd' }}>y={Math.round(actions[actions.length - 1].y)}</span>)
                    </span>
                  )
                ) : (
                  <span style={{ color: '#6b7280' }}>waiting...</span>
                )}
              </div>
            </div>

            {/* Reward */}
            <div>
              <div style={{ fontSize: '9px', color: '#818cf8', marginBottom: '4px' }}>REWARD</div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color:
                    reward === null ? '#6b7280' : reward > 0 ? '#4ade80' : '#f87171',
                  fontFamily: 'monospace',
                }}
              >
                {reward === null ? '—' : reward > 0 ? `+${reward.toFixed(1)}` : reward.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={runAgent}
          disabled={isRunning}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: isRunning
              ? 'rgba(99, 102, 241, 0.3)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: isRunning ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.4)',
          }}
        >
          {isRunning ? '⏳ Agent Running...' : '▶ Run Agent'}
        </button>
        <button
          onClick={resetTask}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(255,255,255,0.05)',
            color: '#e0e7ff',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          ↻ Reset
        </button>
      </div>

      {/* Architecture Info */}
      <div
        style={{
          marginTop: '20px',
          padding: '14px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '10px',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#a5b4fc',
            marginBottom: '10px',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          WOB AGENT ARCHITECTURE
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            fontSize: '11px',
          }}
        >
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#86efac',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            Pixels
          </div>
          <span style={{ color: '#6b7280' }}>+</span>
          <div
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#93c5fd',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            DOM
          </div>
          <span style={{ color: '#6b7280' }}>→</span>
          <div
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#d8b4fe',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            CNN + LSTM
          </div>
          <span style={{ color: '#6b7280' }}>→</span>
          <div
            style={{
              background: 'rgba(251, 146, 60, 0.15)',
              color: '#fdba74',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(251, 146, 60, 0.3)',
            }}
          >
            Actions (x, y, key)
          </div>
        </div>
      </div>
    </div>
  );
}
