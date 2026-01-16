import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pharmacy', href: '#pharmacy' },
    { name: 'About', href: '#about' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < 250)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <div className={`hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 items-center z-50 w-11/12 lg:w-3/4 xl:w-2/3 max-w-6xl px-6! lg:px-8! flex-row justify-between backdrop-blur-sm border border-gray-100 rounded-full h-20 isolate aspect-video bg-transparent shadow-lg ring-1 ring-black/5 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <h1 className='text-xl lg:text-2xl font-bold text-gray-900'>Onlymed</h1>
        
        <div className='flex flex-row gap-4! lg:gap-6'>
          {navLinks.map((link) => (
            <a 
              href={link.href} 
              key={link.name} 
              className="text-sm lg:text-base text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <button className='px-4! lg:px-6! py-2! bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm lg:text-base'>
          Get Started
        </button>
      </div>

      {/* Mobile Header */}
      <div className={`md:hidden fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex items-center justify-between px-4! sm:px-6! h-16 backdrop-blur-sm border border-gray-100 rounded-full bg-white/80 shadow-lg ring-1 ring-black/5">
          <h1 className='text-lg sm:text-xl font-bold text-gray-900'>Onlymed</h1>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2! text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2! backdrop-blur-sm border border-gray-100 rounded-3xl bg-white/95 shadow-lg ring-1 ring-black/5 overflow-hidden">
            <nav className="flex flex-col py-4!">
              {navLinks.map((link) => (
                <a 
                  href={link.href} 
                  key={link.name} 
                  className="px-6! py-3! text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="px-6! pt-4!">
                <button className='w-full px-6! py-3! bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'>
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  )
}

export default Header
// import { useState, useEffect } from 'react'

// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [isVisible, setIsVisible] = useState(true)

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'Features', href: '#features' },
//     { name: 'How It Works', href: '#how-it-works' },
//     { name: 'Pharmacy', href: '#pharmacy' },
//     { name: 'About', href: '#about' }
//   ]

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY
//       setIsVisible(scrollPosition < 250)
//     }

//     window.addEventListener('scroll', handleScroll)
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   return (
//     <div className={`fixed top-8 left-1/2 -translate-x-1/2 items-center z-50 w-2/4 px-8! flex flex-row justify-between backdrop-blur-sm border border-gray-100 rounded-full h-20 isolate aspect-video bg-transparent shadow-lg ring-1 ring-black/5 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
//         <div className='flex flex-row gap-4'>
//         {
//             navLinks.map((link) => (
//                 <a href={link.href} key={link.name} className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
//                     {link.name}
//                 </a>
//             ))
//         }
//      </div>
//      <h1 className='text-2xl font-bold'>Onlymed</h1>
//      <h1 className='text-2xl font-bold'>Onlymed</h1>
    
//     </div>
//   )
// }

// export default Header