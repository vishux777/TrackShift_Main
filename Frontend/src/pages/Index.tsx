import { useState, useEffect } from "react";
import LapTimer from "@/components/dashboard/LapTimer";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import CircularGauge from "@/components/dashboard/CircularGauge";
import BrakeThrottleBars from "@/components/dashboard/BrakeThrottleBars";
import SteeringWheel from "@/components/dashboard/SteeringWheel";
import TrackMap from "@/components/dashboard/TrackMap";
import TireFuelPanel from "@/components/dashboard/TireFuelPanel";
import HaasLogo from "@/components/dashboard/HaasLogo";

const Index = () => {
  // Simulated telemetry data with realistic racing values
  const [telemetry, setTelemetry] = useState({
    speed: 325,
    rpm: 6587,
    brake: 19,
    throttle: 65,
    steering: 24,
    gear: 4,
    fuel: 79.6,
    tireTemps: { fl: 271, fr: 270, rl: 264, rr: 266 },
    trackPosition: 0.35,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        speed: Math.max(0, Math.min(400, prev.speed + (Math.random() - 0.5) * 20)),
        rpm: Math.max(0, Math.min(9000, prev.rpm + (Math.random() - 0.5) * 500)),
        brake: Math.max(0, Math.min(100, prev.brake + (Math.random() - 0.5) * 30)),
        throttle: Math.max(0, Math.min(100, prev.throttle + (Math.random() - 0.5) * 25)),
        steering: Math.max(-270, Math.min(270, prev.steering + (Math.random() - 0.5) * 40)),
        gear: Math.max(1, Math.min(7, prev.gear + (Math.random() > 0.95 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        fuel: Math.max(0, prev.fuel - 0.01),
        tireTemps: {
          fl: Math.max(50, Math.min(300, prev.tireTemps.fl + (Math.random() - 0.5) * 2)),
          fr: Math.max(50, Math.min(300, prev.tireTemps.fr + (Math.random() - 0.5) * 2)),
          rl: Math.max(50, Math.min(300, prev.tireTemps.rl + (Math.random() - 0.5) * 2)),
          rr: Math.max(50, Math.min(300, prev.tireTemps.rr + (Math.random() - 0.5) * 2)),
        },
        trackPosition: (prev.trackPosition + 0.001) % 1,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen max-h-screen bg-racing-bg text-foreground p-4 md:p-8">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 bg-gradient-radial from-racing-red/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1600px] mx-auto space-y-8">
        {/* Header Section */}
        <header className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 pb-3 border-b border-racing-border/50">
          <div className="flex justify-start md:justify-start">
            <LapTimer
              currentLap="02:36.937"
              delta="+0.087"
              bestLap="06:43.305"
              lastLap="06:44.453"
            />
          </div>
          
          <div className="flex justify-center order-first md:order-none">
            <HaasLogo />
          </div>
          
          <div className="flex justify-end md:justify-end">
            <WeatherWidget
              condition="Variably cloudy"
              temperature="24°C"
              windSpeed="10-15 mph"
            />
          </div>
        </header>

        {/* Main Gauges Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-items-center">
          {/* Speedometer */}
          <CircularGauge
            value={telemetry.speed}
            max={400}
            unit="km/h"
            label="speed"
            redZone={300}
            glowColor="hsl(var(--racing-blue))"
            showGear
            gear={telemetry.gear}
          />

          {/* Brake & Throttle */}
          <BrakeThrottleBars
            brake={telemetry.brake}
            throttle={telemetry.throttle}
          />

          {/* Tachometer */}
          <CircularGauge
            value={telemetry.rpm}
            max={9000}
            unit="rpm"
            label="rpm"
            redZone={8000}
            glowColor="hsl(var(--racing-blue))"
          />
        </section>

        {/* Bottom Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Steering Wheel */}
          <SteeringWheel rotation={telemetry.steering} />

          {/* Track Map */}
          <TrackMap
            trackName="Nürburgring"
            location="Germany"
            position={telemetry.trackPosition}
          />

          {/* Tire & Fuel Panel */}
          <TireFuelPanel
            tireTemps={telemetry.tireTemps}
            fuel={telemetry.fuel}
            maxFuel={100}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;