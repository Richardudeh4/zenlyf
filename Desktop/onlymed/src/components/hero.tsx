import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import onlymedVid from '../assets/onlymedVid.mp4';
import { HiArrowRight } from 'react-icons/hi';

const Hero = () => {
  const headlineRef = useRef(null);
  const subtext1Ref = useRef(null);
  const subtext2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.3
      })
      .from(subtext1Ref.current, {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from(subtext2Ref.current, {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.7');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={onlymedVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional: Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
      </div>

      {/* Content - Centered Overlay Text */}
      <main className="relative z-10 flex items-center text-center justify-center min-h-screen pt-20!">
        <div className="max-w-5xl mx-auto px-4! sm:px-6! lg:px-8! text-center">
          <h1 
            ref={headlineRef}
            className="font-display text-5xl! md:text-6xl! text-center lg:text-7xl! font-bold text-white mb-6! leading-tight tracking-tight"
          >
            Healthcare at Your Fingertips
          </h1>
          <p 
            ref={subtext1Ref}
            className="text-xl md:text-2xl text-white/90 mb-8! max-w-3xl mx-auto text-center leading-relaxed"
          >
            Book consultations with verified practitioners, manage appointments for your family, 
            and access our online pharmacy—all in one seamless platform.
          </p>
          <p 
            ref={subtext2Ref}
            className="text-lg md:text-xl text-center text-white/80 mb-10! max-w-2xl mx-auto"
          >
            Connect with healthcare professionals near you or schedule virtual sessions from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 cursor-pointer justify-center mt-8!">
            <button className="bg-[#2987F3] text-white px-8! py-4! rounded-full text-lg font-semibold hover:bg-[#1E6FD8] transition shadow-xl hover:shadow-2xl flex flex-row gap-2 justify-center items-center">
              <p className='text-white text-center'>
              Book a Consultation
              </p> 
              <div className='h-8 w-8 rounded-full bg-white flex items-center justify-center'>
              <HiArrowRight color="black" size={18}/>
              </div>
              
            </button>
            <button className="border-2 border-white text-white px-8! py-4! rounded-full text-lg font-semibold hover:bg-white/10 transition backdrop-blur-sm">
              Explore Services
            </button>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Hero