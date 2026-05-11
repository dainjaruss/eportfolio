// formatData.js — small helpers used by ApiCard
// weather code reference: open-meteo.com/en/docs

// only codes I've seen come back in practice — add more if needed
const wx_map = {
  0:  { label: 'Clear',         emoji: '☀️' },
  1:  { label: 'Mainly Clear',  emoji: '🌤️' },
  2:  { label: 'Partly Cloudy', emoji: '⛅' },
  3:  { label: 'Overcast', emoji: '☁️' },
  45: { label: 'Foggy',         emoji: '🌫️' },
  48: { label: 'Icy Fog', emoji: '🌫️' },
  51: { label: 'Light Drizzle', emoji: '🌦️' },
  53: { label: 'Drizzle',       emoji: '🌧️' },
  61: { label: 'Light Rain',    emoji: '🌧️' },
  63: { label: 'Rain',          emoji: '🌧️' },
  65: { label: 'Heavy Rain',    emoji: '⛈️' },
  71: { label: 'Light Snow', emoji: '🌨️' },
  73: { label: 'Snow',          emoji: '❄️' },
  75: { label: 'Heavy Snow',    emoji: '❄️' },
  80: { label: 'Showers',       emoji: '🌦️' },
  95: { label: 'Thunderstorm',  emoji: '⛈️' },
  99: { label: 'Severe Storm',  emoji: '🌩️' }
};

export function getWeatherInfo(code) {
  // gracefully if anything goes wrong
  if (wx_map[code]) {
    return wx_map[code];
  } else {
    return { label: 'Unknown', emoji: '🌡️' };
  }
}

// turns "us" into 🇺🇸 using unicode regional indicator chars to add some style
export function countryFlag(code) {
  if (!code || code.length !== 2) return '';
  return code.toUpperCase().split('').map(
    c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  ).join('');
}

export function formatTemp(f) {
  return `${Math.round(f)}°F`;
}
