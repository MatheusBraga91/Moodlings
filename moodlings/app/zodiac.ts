const zodiacSigns = [
    { name: "capricorn", start: "01-01", end: "01-19" },
    { name: "aquarius", start: "01-20", end: "02-18" },
    { name: "pisces", start: "02-19", end: "03-20" },
    { name: "aries", start: "03-21", end: "04-19" },
    { name: "taurus", start: "04-20", end: "05-20" },
    { name: "gemini", start: "05-21", end: "06-20" },
    { name: "cancer", start: "06-21", end: "07-22" },
    { name: "leo", start: "07-23", end: "08-22" },
    { name: "virgo", start: "08-23", end: "09-22" },
    { name: "libra", start: "09-23", end: "10-22" },
    { name: "scorpio", start: "10-23", end: "11-21" },
    { name: "sagittarius", start: "11-22", end: "12-21" },
    { name: "capricorn", start: "12-22", end: "12-31" }, 
  ];
  
  export function getZodiacSign(date: Date): string {
    const formattedDate = date.toISOString().slice(5, 10); 
    const sign = zodiacSigns.find(
      ({ start, end }) => formattedDate >= start && formattedDate <= end
    );
    return sign ? sign.name : "Unknown";
  }
  