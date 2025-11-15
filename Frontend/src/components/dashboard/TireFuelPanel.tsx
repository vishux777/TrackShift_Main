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
    <div className="bg-racing-panel rounded-xl p-4 border border-racing-border">
      <div className="flex flex-col gap-4">
        {/* Tire temperatures */}
        <div className="grid grid-cols-2 gap-2">
          {/* Front tires */}
          <div className="text-center">
            <div className={`text-lg font-bold font-mono ${getTireColor(tireTemps.fl)}`}>
              {tireTemps.fl}
            </div>
            <div className="w-8 h-10 bg-racing-border rounded-sm mx-auto mt-1" />
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold font-mono ${getTireColor(tireTemps.fr)}`}>
              {tireTemps.fr}
            </div>
            <div className="w-8 h-10 bg-racing-border rounded-sm mx-auto mt-1" />
          </div>
          
          {/* Rear tires */}
          <div className="text-center">
            <div className={`text-lg font-bold font-mono ${getTireColor(tireTemps.rl)}`}>
              {tireTemps.rl}
            </div>
            <div className="w-8 h-10 bg-racing-border rounded-sm mx-auto mt-1" />
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold font-mono ${getTireColor(tireTemps.rr)}`}>
              {tireTemps.rr}
            </div>
            <div className="w-8 h-10 bg-racing-border rounded-sm mx-auto mt-1" />
          </div>
        </div>

        {/* Dry condition badge */}
        <div className="flex justify-center">
          <div className="bg-green-600/20 border border-green-600 px-2 py-0.5 rounded-full">
            <span className="text-green-400 text-xs font-bold font-mono">DRY</span>
          </div>
        </div>

        {/* Fuel gauge */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative w-24 h-12">
            <svg viewBox="0 0 128 64" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 10,54 A 54,54 0 0,1 118,54"
                fill="none"
                stroke="hsl(var(--racing-border))"
                strokeWidth="6"
              />
              {/* Fuel level arc */}
              <motion.path
                d="M 10,54 A 54,54 0 0,1 118,54"
                fill="none"
                stroke={isLowFuel ? "hsl(var(--racing-red))" : "hsl(var(--racing-blue))"}
                strokeWidth="6"
                strokeDasharray={170}
                strokeDashoffset={170 - (fuelPercentage / 100) * 170}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 170 }}
                animate={{
                  strokeDashoffset: 170 - (fuelPercentage / 100) * 170,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  filter: `drop-shadow(0 0 4px ${isLowFuel ? "hsl(var(--racing-red))" : "hsl(var(--racing-blue))"})`,
                }}
              />
              {/* Fuel icon */}
              <foreignObject x="48" y="28" width="32" height="32">
                <Fuel className="w-5 h-5 text-foreground" />
              </foreignObject>
            </svg>
          </div>
          
          <motion.div
            className="text-base font-bold text-foreground font-mono"
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
