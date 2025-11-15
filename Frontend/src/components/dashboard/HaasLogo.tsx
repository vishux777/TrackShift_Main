const HaasLogo = () => {
  return (
    <div className="relative bg-racing-panel/50 rounded-xl p-2 border border-racing-border/50 backdrop-blur-sm overflow-hidden">
      <div className="relative flex items-center justify-center bg-white rounded-lg p-2">
        <img 
          src="/haas.png" 
          alt="Haas F1 Logo" 
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HaasLogo;
