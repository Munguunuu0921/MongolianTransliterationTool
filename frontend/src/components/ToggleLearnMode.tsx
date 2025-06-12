interface ToggleLearnModeProps {
    learnMode: boolean;
    onToggle: (value: boolean) => void;
  }
  
  export default function ToggleLearnMode({ learnMode, onToggle }: ToggleLearnModeProps) {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={learnMode}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span>Дүрмийн тайлбар харуулах</span>
      </label>
    );
  }
  