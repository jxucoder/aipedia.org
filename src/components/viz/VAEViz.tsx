import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Line,
} from 'recharts';

const PRIOR_SAMPLES = Array.from({ length: 80 }, () => ({
  z1: Math.random() * 4 - 2,
  z2: Math.random() * 4 - 2,
}));

const interpolate = (a: number, b: number, t: number) => a * (1 - t) + b * t;

export function VAEViz() {
  const [mode, setMode] = useState<'sample' | 'reconstruct' | 'interpolate'>('sample');
  const [mu, setMu] = useState([0.5, -0.3]);
  const [sigma, setSigma] = useState([0.6, 0.4]);
  const [interpT, setInterpT] = useState(0.5);

  const zSample = useMemo(() => {
    return mu.map((m, i) => m + sigma[i] * (Math.random() * 2 - 1));
  }, [mu, sigma]);

  const zInterp = [
    interpolate(-1.5, 1.5, interpT),
    interpolate(1.2, -1.0, interpT),
  ];

  const activeZ = mode === 'interpolate' ? zInterp : zSample;

  return (
    <div className="p-6 bg-bg-secondary rounded-xl border border-border">
      <div className="flex flex-wrap gap-2 mb-6">
        {['sample', 'reconstruct', 'interpolate'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              mode === m
                ? 'bg-accent text-white'
                : 'border border-border hover:bg-bg'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <motion.div className="mb-8 flex items-center justify-center gap-4 text-sm">
        <motion.div className="px-4 py-3 rounded-lg bg-accent/20 border border-accent text-center">
          <div className="text-xs text-text-secondary">Encoder</div>
          <div className="font-mono">x → μ, σ</div>
          <div className="mt-1 text-xs">μ = [{mu.map(v => v.toFixed(2)).join(', ')}]</div>
          <div className="text-xs">σ = [{sigma.map(v => v.toFixed(2)).join(', ')}]</div>
        </motion.div>
        <div className="text-xl text-text-secondary">→</div>
        <motion.div className="px-4 py-3 rounded-lg bg-green-500/20 border border-green-500 text-center">
          <div className="text-xs text-text-secondary">Reparameterize</div>
          <div className="font-mono">z = μ + σ·ε</div>
        </motion.div>
        <div className="text-xl text-text-secondary">→</div>
        <motion.div className="px-4 py-3 rounded-lg bg-yellow-500/20 border border-yellow-500 text-center">
          <div className="text-xs text-text-secondary">Decoder</div>
          <div className="font-mono">z → x̂</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-medium mb-2">Latent Space & KL Regularization</div>
          <div className="h-64 bg-bg rounded-lg border border-border p-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis type="number" dataKey="z1" domain={[-2.5, 2.5]} />
                <YAxis type="number" dataKey="z2" domain={[-2.5, 2.5]} />
                <Scatter data={PRIOR_SAMPLES} fill="var(--color-text-secondary)" opacity={0.2} />
                <Scatter data={[{ z1: activeZ[0], z2: activeZ[1] }]}>
                  <Cell fill="#ef4444" />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          {mode === 'interpolate' && (
            <div className="mt-2">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={interpT}
                onChange={(e) => setInterpT(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-text-secondary text-center">Interpolation t = {interpT.toFixed(2)}</div>
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Decoded Output</div>
          <div className="h-64 bg-bg rounded-lg border border-border flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZ.join(',')}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-lg bg-gradient-to-br from-accent/30 to-green-500/30 flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
                <div className="font-mono text-sm">x̂(z)</div>
                <div className="text-xs text-text-secondary mt-1">
                  z = [{activeZ.map(v => v.toFixed(2)).join(', ')}]
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-text-secondary text-center">
        Gray points: prior N(0, I) • Red: sampled / interpolated latent
      </div>
    </div>
  );
}
