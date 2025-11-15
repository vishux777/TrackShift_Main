import { motion } from "framer-motion";
import { Fuel } from "lucide-react";

interface TireFuelPanelProps {
  tireTemps: {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
  };
  fuel: number;
  maxFuel?: number;
}

const TireFuelPanel = ({ tireTemps, fuel, maxFuel = 100 }: TireFuelPanelProps) => {
  const fuelPercentage = (fuel / maxFuel) * 100;
  const isLowFuel = fuel < 20;

  const getTireColor = (temp: number) => {
    if (temp > 100) return "text-tire-hot";
    if (temp > 80) return "text-tire-warm";
    return "text-foreground";
  };

  return (
    <div className="bg-racing-panel rounded-2xl p-6 border border-racing-border">
      <div className="flex flex-col gap-6">
        {/* Tire temperatures */}
        <div className="grid grid-cols-2 gap-4">
          {/* Front tires */}
          <div className="text-center">
            <div className={`text-2xl font-bold font-mono ${getTireColor(tireTemps.fl)}`}>
              {tireTemps.fl}
            </div>
            <div className="w-12 h-16 bg-racing-border rounded-md mx-auto mt-1" />
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold font-mono ${getTireColor(tireTemps.fr)}`}>
              {tireTemps.fr}
            </div>
            <div className="w-12 h-16 bg-racing-border rounded-md mx-auto mt-1" />
          </div>
          
          {/* Rear tires */}
          <div className="text-center">
            <div className={`text-2xl font-bold font-mono ${getTireColor(tireTemps.rl)}`}>
              {tireTemps.rl}
            </div>
            <div className="w-12 h-16 bg-racing-border rounded-md mx-auto mt-1" />
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold font-mono ${getTireColor(tireTemps.rr)}`}>
              {tireTemps.rr}
            </div>
            <div className="w-12 h-16 bg-racing-border rounded-md mx-auto mt-1" />
          </div>
        </div>

        {/* Dry condition badge */}
        <div className="flex justify-center">
          <div className="bg-green-600/20 border border-green-600 px-4 py-1 rounded-full">
            <span className="text-green-400 text-sm font-bold font-mono">DRY</span>
          </div>
        </div>

        {/* Fuel gauge */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-32 h-16">
            <svg viewBox="0 0 128 64" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 10,54 A 54,54 0 0,1 118,54"
                fill="none"
                stroke="hsl(var(--racing-border))"
                strokeWidth="8"
              />
              {/* Fuel level arc */}
              <motion.path
                d="M 10,54 A 54,54 0 0,1 118,54"
                fill="none"
                stroke={isLowFuel ? "hsl(var(--racing-red))" : "hsl(var(--racing-blue))"}
                strokeWidth="8"
                strokeDasharray={170}
                strokeDashoffset={170 - (fuelPercentage / 100) * 170}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 170 }}
                animate={{
                  strokeDashoffset: 170 - (fuelPercentage / 100) * 170,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  filter: `drop-shadow(0 0 8px ${isLowFuel ? "hsl(var(--racing-red))" : "hsl(var(--racing-blue))"})`,
                }}
              />
              {/* Fuel icon */}
              <foreignObject x="48" y="28" width="32" height="32">
                <Fuel className="w-8 h-8 text-foreground" />
              </foreignObject>
            </svg>
          </div>
          
          <motion.div
            className="text-xl font-bold text-foreground font-mono"
            animate={isLowFuel ? { color: ["hsl(var(--foreground))", "hsl(var(--racing-red))", "hsl(var(--foreground))"] } : {}}
            transition={{ duration: 1, repeat: isLowFuel ? Infinity : 0 }}
          >
            Fuel {fuel.toFixed(1)}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TireFuelPanel;
