
'use client';
import { useState } from "react";
//@ts-ignore

import './globals.css'
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 {/* SIdebar Menus*/}
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Analytics", src: "Chart" },
    { title: "Devices", src: "Devices" },
    { title: "Users", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search"},
    { title: "Users-Test", src: "User", gap: true },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ]; 

 {/* End Sidebar menus*/}

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
     
          
      <body className='h-full'>



        
        <Header />
        <main className='max-w-screen-lg mx-auto p-4'>
        
           {/* Sidebar Menus code*/}
          <div className="flex absolute left-0">
            
                  <div
                    className={` ${
                      open ? "w-80" : "w-20 "
                    } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
                  >
                    <img
                      src="/assets/control.png"
                      className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                       border-2 rounded-full  ${!open && "rotate-180"}`}
                      onClick={() => setOpen(!open)}
                    />
                    <div className="flex gap-x-4 items-center">
                      <img
                        src="/assets/logo.png"
                        className={`cursor-pointer duration-500 ${
                          open && "rotate-[360deg]"
                        }`}
                      />
                      <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${
                          !open && "scale-0"
                        }`}
                      >
                        Menu
                      </h1>
                    </div>
                    <ul className="pt-6">
                      {Menus.map((Menu, index) => (
                        //<a href={`/${Menu.title}`}>
                        <a key={index} href={`/${Menu.title}`}>
                        <li
                          key={index}
                          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                          ${Menu.gap ? "mt-9" : "mt-2"} ${
                            index === 0 && "bg-light-white"
                          } `}
                        >
                          <img src={`/assets/${Menu.src}.png`} />
                          <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                          </span>
                        </li></a>
                      ))}
                    </ul>
                    
                  </div>
                  <div className="h-screen flex-1 p-7">
                    {children}
                  </div>
                  
          </div>

           {/* Sidebar menu code*/}

           
        </main>
        <Footer />
      </body>
    </html>
  )
}