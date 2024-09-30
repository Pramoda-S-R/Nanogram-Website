import React from "react";

const AchievementCard = ({ title, value }) => (
  <div className="text-center">
    <h3 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
      {value}
    </h3>
    <p className="text-sm text-slate-800 dark:text-slate-200">{title}</p>
  </div>
);

const Dashboard = () => (
  <div className="bg-sky-200 dark:text-slate-50 dark:bg-sky-950 text-slate-950 p-8 font-sans border-none outline-none">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-lg font-semibold tracking-wide mb-2 text-blue-600 dark:text-blue-200 ">
        Proud Moments
      </h2>
      <h1 className="text-5xl font-bold mb-6">Our Achievements</h1>

      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="mb-6 md:mb-0 md:w-1/2">
          <p className="mb-4">
            Nanogram - The Tech Hub has been at the forefront of technological
            innovation and education.
          </p>
          <p>
            We are proud of our accomplishments and the growth of our community.
          </p>
        </div>
        <div className="md:w-1/2 p-4">
          <img
            src="/dash.png"
            alt="Dashboard Preview"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AchievementCard title="Founded" value="2024" />
        <AchievementCard title="Active Members" value="50+" />
        <AchievementCard title="Workshops & Events" value="5+" />
        <AchievementCard title="Students Reached" value="300+" />
      </div>
    </div>
  </div>
);

export default Dashboard;
