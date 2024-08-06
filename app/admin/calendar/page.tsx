import React from "react";

const WeeklyCalendar: React.FC = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = generateTimeSlots();

  return (
    <div className="border">
      <div className="grid grid-cols-6">
        <div className=""></div>
        {days.map((day) => (
          <div key={day} className="col-span-1">
            {day}
          </div>
        ))}
      </div>
      {timeSlots.map((slot) => (
        <div key={slot} className="grid grid-cols-6">
          <div className="time-column">{slot}</div>
          {days.map((day) => (
            <div key={`${day}-${slot}`} className="day-column slot"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  const start = new Date(2024, 0, 1, 9, 15);
  const end = new Date(2024, 0, 1, 17, 0);

  while (start < end) {
    const timeString = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(timeString);

    // Add 45 minutes
    start.setMinutes(start.getMinutes() + 45);

    // Skip break times
    if (
      (start.getHours() === 10 && start.getMinutes() === 30) ||
      (start.getHours() === 12 && start.getMinutes() === 30) ||
      (start.getHours() === 15 && start.getMinutes() === 15)
    ) {
      start.setMinutes(start.getMinutes() + 15);
    }
    if (start.getHours() === 12 && start.getMinutes() === 45) {
      start.setMinutes(start.getMinutes() + 60);
    }
  }

  return slots;
}

export default function CalendarPage() {
  return (
    <div className="container">
      <h1>Weekly Calendar</h1>
      <WeeklyCalendar />
    </div>
  );
}
