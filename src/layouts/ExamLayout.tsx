import React from 'react';
import { Outlet } from 'react-router-dom';

export const ExamLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-col font-sans select-none text-slate-800 dark:text-slate-100">
      <Outlet />
    </div>
  );
};
