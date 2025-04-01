import React from 'react';

interface TimeSlot {
  id: string;
  date: Date;
  label: string;
  subLabel: string;
  period: 'morning' | 'afternoon';
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function TimeSlotSelector({ slots, selectedSlots, onSlotSelect }: TimeSlotSelectorProps) {
  const isSelected = (slot: TimeSlot) => {
    return selectedSlots.some(s => s.id === slot.id && s.period === slot.period);
  };

  return (
    <div className="space-y-6">
      {slots.map((slot) => (
        <div key={slot.id}>
          <h3 className="text-lg text-[#47559E] mb-4">{slot.label}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onSlotSelect({ ...slot, period: 'morning' })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                isSelected({ ...slot, period: 'morning' })
                  ? 'border-[#47559E] bg-[#47559E] text-white'
                  : 'border-gray-200 hover:border-[#47559E]'
              }`}
            >
              <div className="font-medium">Matin</div>
              <div className="text-sm opacity-80">{slot.subLabel}</div>
            </button>
            <button
              onClick={() => onSlotSelect({ ...slot, period: 'afternoon' })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                isSelected({ ...slot, period: 'afternoon' })
                  ? 'border-[#47559E] bg-[#47559E] text-white'
                  : 'border-gray-200 hover:border-[#47559E]'
              }`}
            >
              <div className="font-medium">Après-midi</div>
              <div className="text-sm opacity-80">{slot.subLabel}</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}