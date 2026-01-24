import assets from '../assets/assets'
import { useState } from 'react'
import ThemeToggleBtn from './ThemeToggleBtn'

const Navbar = ({theme , setTheme}) => {

 const[sidebarOpen , setSideBarOpen] = useState(false)


  return (
    <div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-50 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>

        <img src={theme === 'dark' ? assets.logo_dark : assets.logo} className='w-32 sm:w-40' alt = ''/>

<div className={`text-gray-700 dark:text-white sm:text-sm
max-sm:fixed max-sm:z-30 top-0 bottom-0 right-0
max-sm:min-h-screen max-sm:h-full
max-sm:flex-col max-sm:bg-primary dark:max-sm:bg-gray-900
max-sm:pt-20 flex sm:items-center gap-5
transition-all duration-300 ease-in-out

${sidebarOpen
  ? 'max-sm:w-60 max-sm:pl-10 max-sm:opacity-100 max-sm:pointer-events-auto'
  : 'max-sm:w-0 max-sm:opacity-0 max-sm:pointer-events-none overflow-hidden'
}
`}>

<img src={assets.close_icon} alt="" className='w-5 absolute right-4
top-4 sm:hidden' onClick={() => setSideBarOpen(false)}/>

    <a onClick = {()=> setSideBarOpen(false)}  href="#home" className='sm:hover:border-b'>Home</a>
    <a onClick = {()=> setSideBarOpen(false)} href="#services" className='sm:hover:border-b'>Services</a>
    <a onClick = {()=> setSideBarOpen(false)} href="#our-work" className='sm:hover:border-b'>Our Work</a>
    <a onClick = {()=> setSideBarOpen(false)} href="#contact-us" className='sm:hover:border-b'>Contact Us</a>

</div>
<div className='flex items-center gap-2 sm:gap-4'>

<ThemeToggleBtn theme = {theme} setTheme={setTheme}/>

<img src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon} alt="" onClick={() => setSideBarOpen(true) }className ='w-8 sm:hidden relative z-40 cursor-pointer' />

<a href="#contact-us" className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all'>
Connect <img src={assets.arrow_icon} width= {14} alt="" />
</a>
</div>

</div>

    
  )
}

export default Navbar