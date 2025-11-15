import { motion } from "framer-motion";

interface TrackMapProps {
  trackName: string;
  location: string;
  position: number; // 0-1 progress around track
}

const TrackMap = ({ trackName, location, position }: TrackMapProps) => {
  // Simplified Nürburgring Nordschleife path (rough approximation)
  const trackPath = "M 150,50 Q 200,60 220,100 Q 230,140 200,170 Q 170,200 140,210 Q 110,220 80,200 Q 50,180 40,150 Q 30,120 50,90 Q 70,60 110,50 Q 130,45 150,50";
  
  // Calculate position on path
  const pathLength = 800; // approximate
  const currentPosition = position * pathLength;

  return (
    <div className="relative bg-racing-panel/50 rounded-2xl p-6 border border-racing-border/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
      <div className="relative flex flex-col items-center gap-4">
        <svg
          viewBox="0 0 280 280"
          className="w-64 h-64"
          style={{
            filter: "drop-shadow(0 0 20px hsl(var(--racing-blue) / 0.2))",
          }}
        >
          <defs>
            <filter id="track-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Track background glow */}
          <path
            d={trackPath}
            fill="none"
            stroke="hsl(var(--racing-border))"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.2"
            filter="url(#track-glow)"
          />
          
          {/* Track outline */}
          <path
            d={trackPath}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Current position with enhanced glow */}
          <motion.circle
            cx={150 + Math.cos(position * Math.PI * 2) * 80}
            cy={140 + Math.sin(position * Math.PI * 2) * 80}
            r="10"
            fill="hsl(var(--racing-red))"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "drop-shadow(0 0 12px hsl(var(--racing-red))) drop-shadow(0 0 24px hsl(var(--racing-red) / 0.5))",
            }}
          />
          
          {/* Sector markers with glow */}
          {[0.33, 0.66].map((sector, i) => (
            <circle
              key={i}
              cx={150 + Math.cos(sector * Math.PI * 2) * 80}
              cy={140 + Math.sin(sector * Math.PI * 2) * 80}
              r="4"
              fill="hsl(var(--muted-foreground))"
              opacity="0.6"
              style={{
                filter: "drop-shadow(0 0 4px hsl(var(--muted-foreground) / 0.5))",
              }}
            />
          ))}
          
          {/* Start/Finish line */}
          <circle
            cx={150}
            cy={60}
            r="5"
            fill="hsl(var(--racing-blue))"
            style={{
              filter: "drop-shadow(0 0 6px hsl(var(--racing-blue)))",
            }}
          />
        </svg>
        
        <div className="text-center -mt-6">
          <div className="text-lg font-bold text-foreground font-mono tracking-tight">{trackName}</div>
          <div className="text-sm text-muted-foreground/60 font-mono uppercase tracking-wider">{location}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackMap;
