import { motion } from 'framer-motion';

interface TreeSVGProps {
  leafCount: number;
  userName?: string;
  showGlow?: boolean;
}

const LEAF_POSITIONS = [
  { x: 95, y: 95, r: -20 }, { x: 115, y: 80, r: 15 }, { x: 80, y: 110, r: -35 },
  { x: 130, y: 100, r: 25 }, { x: 70, y: 90, r: -40 }, { x: 140, y: 115, r: 30 },
  { x: 105, y: 70, r: -10 }, { x: 60, y: 105, r: -50 }, { x: 150, y: 95, r: 40 },
  { x: 90, y: 65, r: -25 }, { x: 120, y: 60, r: 20 }, { x: 55, y: 85, r: -55 },
  { x: 155, y: 80, r: 45 }, { x: 75, y: 75, r: -30 }, { x: 135, y: 65, r: 35 },
  { x: 100, y: 55, r: -5 }, { x: 65, y: 70, r: -45 }, { x: 145, y: 70, r: 40 },
  { x: 110, y: 50, r: 10 }, { x: 85, y: 55, r: -20 }, { x: 125, y: 50, r: 25 },
  { x: 50, y: 95, r: -60 }, { x: 160, y: 90, r: 50 }, { x: 95, y: 45, r: -15 },
  { x: 115, y: 42, r: 15 }, { x: 75, y: 50, r: -35 }, { x: 140, y: 55, r: 35 },
  { x: 105, y: 38, r: 0 }, { x: 88, y: 42, r: -10 }, { x: 120, y: 38, r: 10 },
];

export default function TreeSVG({ leafCount, userName, showGlow = false }: TreeSVGProps) {
  const displayLeaves = Math.min(leafCount, 30);
  const hasGoldenGlow = displayLeaves >= 30 || showGlow;

  return (
    <div className="relative flex flex-col items-center">
      {/* Golden glow behind tree */}
      <div className={`absolute inset-0 rounded-full bg-gold-glow transition-opacity duration-1000 ${hasGoldenGlow ? 'opacity-100 golden-pulse' : displayLeaves > 0 ? 'opacity-40 golden-pulse' : 'opacity-0'}`} 
        style={{ filter: 'blur(30px)', top: '-10%', bottom: '10%' }} />
      
      <svg viewBox="0 0 210 240" className="w-56 h-64 relative z-10 leaf-sway">
        <defs>
          <radialGradient id="treeGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="hsl(40, 55%, 55%)" stopOpacity={hasGoldenGlow ? 0.2 : 0.08} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(25, 35%, 35%)" />
            <stop offset="100%" stopColor="hsl(25, 40%, 25%)" />
          </linearGradient>
        </defs>

        {/* Glow circle */}
        <circle cx="105" cy="90" r="85" fill="url(#treeGlow)" />

        {/* Trunk */}
        <path d="M102,230 Q103,190 105,160 Q106,140 104,130" stroke="url(#trunkGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
        
        {/* Main branches */}
        <path d="M104,130 Q90,115 65,105" stroke="hsl(25, 35%, 33%)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M104,130 Q120,110 150,100" stroke="hsl(25, 35%, 33%)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M105,145 Q95,130 75,120" stroke="hsl(25, 35%, 33%)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M105,145 Q115,125 140,115" stroke="hsl(25, 35%, 33%)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M104,135 Q100,120 95,100" stroke="hsl(25, 35%, 33%)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M104,135 Q110,115 115,95" stroke="hsl(25, 35%, 33%)" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Sub branches */}
        <path d="M65,105 Q55,95 48,90" stroke="hsl(25, 30%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M75,120 Q65,110 55,108" stroke="hsl(25, 30%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M150,100 Q158,92 162,88" stroke="hsl(25, 30%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M140,115 Q150,108 158,105" stroke="hsl(25, 30%, 38%)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M95,100 Q88,88 82,78" stroke="hsl(25, 30%, 38%)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M115,95 Q122,82 128,72" stroke="hsl(25, 30%, 38%)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M65,105 Q58,98 52,95" stroke="hsl(25, 30%, 38%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M150,100 Q155,94 160,92" stroke="hsl(25, 30%, 38%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M95,100 Q90,90 85,82" stroke="hsl(25, 30%, 38%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M115,95 Q118,85 122,78" stroke="hsl(25, 30%, 38%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Leaves */}
        {LEAF_POSITIONS.slice(0, displayLeaves).map((pos, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, type: 'spring' }}
            transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
          >
            <path
              d="M0,0 C2,-5 6,-8 8,-8 C10,-8 10,-4 8,0 C6,4 2,4 0,0 Z"
              fill="hsl(140, 42%, 45%)"
              stroke="hsl(140, 35%, 38%)"
              strokeWidth="0.3"
              opacity="0.92"
            />
            {/* Leaf vein */}
            <line x1="1" y1="0" x2="7" y2="-4" stroke="hsl(140, 30%, 55%)" strokeWidth="0.3" opacity="0.5" />
          </motion.g>
        ))}

        {/* Ground */}
        <ellipse cx="105" cy="232" rx="30" ry="4" fill="hsl(25, 30%, 40%)" opacity="0.15" />
      </svg>

      {userName && (
        <p className="text-sm font-medium text-muted-foreground mt-1">شجرة {userName}</p>
      )}
    </div>
  );
}
