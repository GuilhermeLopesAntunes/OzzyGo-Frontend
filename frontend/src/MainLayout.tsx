import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HeaderHomePage from './features/HomePage/components/HeaderHomePage';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen mx-6 sm:mx-16 my-6 xl:mx-auto xl:max-w-6xl">
      <HeaderHomePage />
      <main className="flex-grow pb-[80px]">
        <Outlet /> 
      </main>

      <BottomNav />
    </div>
  );
};

export default MainLayout;