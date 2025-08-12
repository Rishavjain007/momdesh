import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const yearRange = Array.from({ length: 201 }, (_, i) => currentDate.getFullYear() - 100 + i);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleResetDate = () => {
    setCurrentDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="relative w-full max-w-full h-[450px] m-8 p-5 rounded-2xl border-none bg-gradient-to-br from-slate-50 to-indigo-100 shadow-lg font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 relative">
        <span>
          <span
            className="cursor-pointer font-bold text-indigo-500 text-lg mr-1 tracking-wide"
            onClick={() => setShowMonthPicker((v) => !v)}
          >
            {months[currentDate.getMonth()]}
          </span>
          <span
            className="cursor-pointer font-bold text-indigo-500 text-lg ml-1 tracking-wide"
            onClick={() => setShowYearPicker((v) => !v)}
          >
            {currentDate.getFullYear()}
          </span>
        </span>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleResetDate}
            className="bg-orange-500 text-white rounded-md px-3 py-1 hover:bg-orange-600 transition"
          >
            Today
          </button>
          <button
            onClick={handlePrevMonth}
            className="bg-indigo-500 text-white rounded-md px-3 py-1 hover:bg-indigo-700 transition"
          >
            &#8592;
          </button>
          <button
            onClick={handleNextMonth}
            className="bg-indigo-500 text-white rounded-md px-3 py-1 hover:bg-indigo-700 transition"
          >
            &#8594;
          </button>
        </div>

        {/* Year Picker */}
        {showYearPicker && (
          <div className="absolute bg-white border border-gray-200 z-10 max-h-[220px] overflow-y-auto w-[140px] left-0 top-10 rounded-lg shadow-md">
            {yearRange.map((y) => (
              <div
                key={y}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  y === currentDate.getFullYear() ? "bg-indigo-100 font-bold" : ""
                }`}
                onClick={() => {
                  setCurrentDate(new Date(y, currentDate.getMonth(), 1));
                  setShowYearPicker(false);
                }}
              >
                {y}
              </div>
            ))}
          </div>
        )}

        {/* Month Picker */}
        {showMonthPicker && (
          <div className="absolute bg-white border border-gray-200 z-10 max-h-[220px] overflow-y-auto w-[140px] left-0 top-10 rounded-lg shadow-md">
            {months.map((m, idx) => (
              <div
                key={m}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  idx === currentDate.getMonth() ? "bg-indigo-100 font-bold" : ""
                }`}
                onClick={() => {
                  setCurrentDate(new Date(currentDate.getFullYear(), idx, 1));
                  setShowMonthPicker(false);
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendar Table */}
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <th key={d} className="p-2 font-semibold bg-indigo-50 text-indigo-500 rounded">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {calendarDays.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, idx) => {
                const isToday =
                  day === currentDate.getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear();

                return (
                  <td
                    key={idx}
                    className={`p-2 text-center border border-gray-100 rounded-md transition cursor-pointer ${
                      isToday
                        ? "bg-indigo-200 text-indigo-900 font-bold"
                        : "bg-white hover:bg-indigo-100"
                    }`}
                  >
                    {day || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
