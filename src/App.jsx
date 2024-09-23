import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import KeyIn from './KeyIn';
import Gallery from './Gallery';
import Team from './Team';
import Dashboard from './Dashboard';
import EventHighlights from './EventHighlights';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <KeyIn />
      <Gallery /> 
      <Team />
      <Dashboard />
      <EventHighlights />
    </div>
  );
}

export default App;