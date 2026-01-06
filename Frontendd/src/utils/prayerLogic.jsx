import { parse, isAfter } from "date-fns";

export const getPrayerStatus = (timings) => {
  const now = new Date();
  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  // 1. Create a searchable array with actual Date objects for comparison
  const parsedTimings = prayerNames.map(name => ({
    name: name,
    timeString: timings[name],
    dateObj: parse(timings[name], "HH:mm", new Date())
  }));

  // 2. Find the first prayer that happens AFTER "now"
  let next = parsedTimings.find(p => isAfter(p.dateObj, now));

  // 3. If no prayer is after "now" (it's late at night), the next prayer is Fajr (tomorrow)
  if (!next) {
    next = parsedTimings[0];
  }

  // 4. Determine "Current" prayer (the one before "next")
  const nextIndex = prayerNames.indexOf(next.name);
  const currentIndex = nextIndex === 0 ? 4 : nextIndex - 1;
  const currentName = prayerNames[currentIndex];

  return {
    current: currentName,           // Returns String (e.g., "Asr")
    nextName: next.name,            // Returns String (e.g., "Maghrib")
    nextTime: next.timeString       // Returns String (e.g., "18:20")
  };
};