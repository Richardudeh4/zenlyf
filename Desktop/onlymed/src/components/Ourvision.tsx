import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import family from "../assets/family.jpg";
import technology from "../assets/healthTech.jpg";
import consult from "../assets/consult.jpg";
import drugs from "../assets/drugs.jpg";
import national from "../assets/national.jpg";
import med from "../assets/med.jpg";
import 'swiper/swiper-bundle.css';

gsap.registerPlugin(ScrollTrigger);

const Ourvision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const OurVisionItems = [
    {
      title: "Accessible Healthcare for All",
      description: "We envision a future where quality medical care is accessible to everyone, regardless of location or circumstance—bringing trusted healthcare professionals directly to your fingertips.",
      image: national,
    },
    {
      title: "Empowering Families",
      description: "Our vision is to empower families to take control of their health journey, with seamless access to consultations, prescriptions, and medical support for every member of your household.",
      image: family,
    },
    {
      title: "Technology-Driven Care",
      description: "We're building a healthcare ecosystem where innovative technology meets compassionate care, making medical services more convenient, efficient, and personalized than ever before.",
      image: technology,
    },
    {
      title: "Breaking Down Barriers",
      description: "We're committed to breaking down traditional healthcare barriers—eliminating distance, time constraints, and accessibility challenges that prevent people from receiving the care they need.",
      image:consult,
    },
    {
      title: "Trusted Healthcare Platform",
      description: "To become Nigeria's most trusted healthcare platform, where verified practitioners, secure prescriptions, and comprehensive health management come together in one seamless experience.",
      image: drugs,
    },
    {
      title: "24/7 Health Support",
      description: "We envision a world where medical guidance and support are available around the clock, ensuring that help is always just a click away whenever health concerns arise.",
      image: med,
    }
  ];

  useEffect(() => {
    // GSAP Animations for text elements
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from('.vision-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vision-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate all slide titles and descriptions when they come into view
      gsap.utils.toArray('.vision-slide-title').forEach((title: any) => {
        gsap.from(title, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray('.vision-slide-description').forEach((desc: any) => {
        gsap.from(desc, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: desc,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    // Three.js Background
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      canvasRef.current.appendChild(renderer.domElement);

      // Create particles
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];
      const color = new THREE.Color(0x2987F3);

      for (let i = 0; i < 800; i++) {
        vertices.push(
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000
        );
        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (canvasRef.current) {
          camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        ctx.revert();
        window.removeEventListener('resize', handleResize);
        if (canvasRef.current && renderer.domElement) {
          canvasRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    }

    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={sectionRef} className="w-full bg-white h-full py-6! overflow-hidden border-y border-gray-100 relative">
      {/* Three.js Canvas Background */}
      <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
      
      <h1 className="vision-heading text-center text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative z-10">Our Vision</h1>
      <div className="px-2! sm:px-4! md:px-6! lg:px-8! xl:px-10! py-16! relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          watchSlidesProgress={true}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="vision-carousel"
          style={{ display: 'flex', alignItems: 'stretch' }}
        >
            {OurVisionItems.map((item, index) => (
              <SwiperSlide key={index} className="flex items-stretch justify-center h-auto">
                <div 
                  className="text-center flex items-center flex-col justify-center gap-2! px-4! py-8! w-full rounded-[16px] h-full bg-cover bg-center bg-no-repeat relative overflow-hidden object-cover min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30 rounded-[16px]"></div>
                  <div className="relative z-10">
                    <h3 className="vision-slide-title font-display text-center text-3xl md:text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="vision-slide-description text-lg md:text-xl text-center text-white/90 max-w-3xl mx-auto leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Ourvision