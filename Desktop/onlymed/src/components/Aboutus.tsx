import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import * as THREE from 'three';
import homeConsultation from "../assets/homeConsulation.jpg";
import onlineConsultation from "../assets/onlineConsultation.jpg";
import precription from "../assets/precription.jpg";
import support from "../assets/support.jpg";
import labReport from "../assets/report.jpg";
import medicalKit from "../assets/medicalKit.jpg";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const AboutServices = [
    {
      title: "Visual Consultation",
      subtitle: "Connect with certified doctors via secure video calls from anywhere—quality care at your fingertips, anytime you need it.",
      image: onlineConsultation
    },
    {
      title: "Home Consultation",
      subtitle: "Licensed practitioners visit your home for personalized, in-person medical care when you prefer face-to-face consultations.",
      image: homeConsultation
    },
    {
      title: "Medical Kit Delivery",
      subtitle: "Essential medical supplies and equipment delivered to your doorstep, ensuring you have everything you need for home care.",
      image: medicalKit
    },
    {
      title: "24/7 Medical Support",
      subtitle: "Round-the-clock access to healthcare professionals, ensuring medical guidance and support whenever you need it, day or night.",
      image: support
    },
    {
      title: "Prescription Management",
      subtitle: "Digital prescription tracking and management system that keeps your medications organized, with timely refill reminders and seamless renewals.",
      image: precription
    },
    {
      title: "Lab Test Booking",
      subtitle: "Schedule lab tests online, receive digital results securely, and track your health metrics with ease and convenience.",
      image: labReport
    }
  ];

  useEffect(() => {
    // Three.js Background Effect
    let animationId: number;
    if (canvasRef.current && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        alpha: true,
        antialias: true 
      });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 30;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x2987F3,
        transparent: true,
        opacity: 0.2,
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      camera.position.z = 5;
      
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        renderer.render(scene, camera);
      };
      
      animate();
      
      const handleResize = () => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          renderer.setSize(rect.width, rect.height);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left content
      if (leftContentRef.current) {
        gsap.from(leftContentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate right feature box
      if (rightBoxRef.current) {
        gsap.from(rightBoxRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: rightBoxRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Animate feature items with stagger
        const features = rightBoxRef.current.querySelectorAll('h3');
        gsap.from(features, {
          x: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightBoxRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Animate button
        const button = rightBoxRef.current.querySelector('button');
        if (button) {
          gsap.from(button, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightBoxRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      }

      // Animate carousel section heading
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate carousel container
      if (carouselSectionRef.current) {
        gsap.from(carouselSectionRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Parallax effect on carousel images
      const carouselImages = document.querySelectorAll('.elementor-carousel-image');
      carouselImages.forEach((img) => {
        gsap.to(img, {
          y: -30,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20! px-4 flex gap-6! flex-col items-center justify-center sm:px-6 lg:px-8 relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
        style={{ zIndex: 0 }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div ref={leftContentRef} className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Onlymed is your trusted healthcare companion
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform connects you with verified healthcare professionals, making quality medical care accessible anytime, anywhere. 
              Whether booking consultations for yourself or loved ones, accessing our online pharmacy, or scheduling virtual visits, 
              Onlymed puts comprehensive healthcare management at your fingertips—supporting your journey to better health with 
              convenience, security, and care.
            </p>
          </div>

          {/* Right Side - Feature Box */}
          <div ref={rightBoxRef} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8! md:p-12 space-y-6">
          <h3 className="font-display text-2xl font-semibold text-gray-900">
              Access quality healthcare instantly
            </h3>
            <h3 className="font-display text-2xl font-semibold text-gray-900">
              Book for yourself and family members
            </h3>
            <h3 className="font-display text-2xl font-semibold text-gray-900">
              Connect with verified practitioners
            </h3>
            <h3 className="font-display text-2xl font-semibold text-gray-900">
              Manage prescriptions and medications
            </h3>
            
            <div className="pt-4!">
              <button className="bg-[#2987F3] text-white px-8! py-4! rounded-full font-semibold hover:bg-[#1E6FD8] transition-all shadow-lg hover:shadow-xl flex items-center gap-3 group">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Book a Consultation</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Services Carousel Section */}
        <div className="w-full mt-12!">
          <div ref={headingRef} className="text-center !mb-8">
            <h4 className="text-lg font-medium text-gray-600 mb-4!">
              See how Onlymed transforms your healthcare experience
            </h4>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Small change, big impact
            </h2>
          </div>
          
          <div ref={carouselSectionRef} className="mt-12!">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={10}
              slidesPerView={3}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              className="services-carousel"
            >
              {AboutServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="elementor-carousel-image w-full h-[400px] rounded-2xl bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${service.image})` }}
                    role="img"
                    aria-label={service.title}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl flex items-end p-6!">
                      <div className="text-white">
                        <h3 className="font-display text-xl font-semibold mb-2!">
                          {service.title}
                        </h3>
                        <p className="text-sm text-white/90 ">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus