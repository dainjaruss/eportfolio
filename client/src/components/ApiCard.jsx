import { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeatherInfo, countryFlag, formatTemp } from '../utils/formatData';

/*  informational card banner. shows visitor location, current weather and a random 
story from Hacker News. Additionally, ipinfo.io and open-meteo are displayed.
making sure that if any of this fails we just hide the banner. */

const HN_TOP = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_ITEM = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const ApiCard = () => {
  const [visitor, setVisitor] = useState(null);
  const [weather, setWeather] = useState(null);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false; // cleanup flag so setState dont happen after unmount

    const load = async () => {
      try {
        // Location + Hacker News fetches righ away, but weather has to wait for coords
        const token = import.meta.env.VITE_IPINFO_TOKEN;
        const [locRes, hnRes] = await Promise.all([
          axios.get(`https://ipinfo.io/json?token=${token}`),
          axios.get(HN_TOP)
        ]);

        const data = locRes.data;
        const [lat, lon] = data.loc.split(',').map(Number);

        const loc = {
          ...data,
          lat,
          lon,
          countryCode: data.country,
          regionName: data.region,
          status: 'success'
        };

        const wx_url = `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${loc.lat}&longitude=${loc.lon}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&temperature_unit=fahrenheit` +
          `&timezone=${encodeURIComponent(loc.timezone)}`;

        // picks a random story from the top 30
        const top_ids = hnRes.data.slice(0, 30);
        const idx = Math.floor(Math.random() * top_ids.length);
        const pick = top_ids[idx];

        const [wxRes, storyRes] = await Promise.all([
          axios.get(wx_url),
          axios.get(HN_ITEM(pick))
        ]);

        if (!dead) {
          setVisitor(loc);
          setWeather(wxRes.data.current);
          setStory(storyRes.data);
          setLoading(false);
        }
      } catch (e) {
        // silent fail — so page still renders
        if (!dead) setLoading(false);
      }
    };

    load();
    return () => { dead = true; };
  }, []);

  if (loading) return <div className="api-card api-card--quiet">Loading...</div>;

  if (!visitor && !story) return null;

  const wxInfo = visitor && weather ? getWeatherInfo(weather.weather_code) : null;
  const flag = visitor ? countryFlag(visitor.countryCode) : '';
  const temp = visitor && weather ? formatTemp(weather.temperature_2m) : '';

  // truncates long titles so the banner card doesn't overflow
  let storyTitle = null;
  let storyUrl = null;

  if (story?.title) {
    storyTitle = story.title.length > 60 ? story.title.slice(0, 57) + '…' : story.title;
  }
  if (story?.url) {
    storyUrl = story.url;
  } else if (story?.id) {
    storyUrl = `https://news.ycombinator.com/item?id=${story.id}`;
  }

  return (
    <div className="api-card" role="status" aria-live="polite">

      {visitor && wxInfo && (
        <>
          <span className="ac__location">
            {flag} <strong>{visitor.city}, {visitor.regionName}</strong>
          </span>
          <span className="ac__sep" aria-hidden="true">·</span>
          <span className="ac__weather">{wxInfo.emoji} {temp} &mdash; {wxInfo.label}</span>
          <span className="ac__sep" aria-hidden="true">·</span>
          <span className="ac__wind">💨 {Math.round(weather.wind_speed_10m)} mph</span>
        </>
      )}

      {storyTitle && storyUrl && (
        <>
          <span className="ac__sep ac__sep--divider" aria-hidden="true">|</span>
          <span className="ac__hn">
            <span className="ac__hn-label">🔥 HN Digest:</span> <a href={storyUrl} target="_blank" rel="noopener noreferrer" className="ac__hn-link">{storyTitle}</a>
          </span>
        </>
      )}

    </div>
  );
};

export default ApiCard;
