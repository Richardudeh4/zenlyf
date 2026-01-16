import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import doc from "../assets/doc.jpg";

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqColumn1 = [
    {
      question: "How do I book a consultation on Onlymed?",
      answer: "Simply create an account, search for practitioners by specialty or location, view their profiles and availability, then select a time slot that works for you. You can book for yourself or family members you've added to your account."
    },
    {
      question: "Can I book consultations for my family members?",
      answer: "Yes! Onlymed allows you to manage healthcare for your entire family from one account. Add family members to your profile and book appointments on their behalf with ease."
    },
    {
      question: "What types of consultations are available?",
      answer: "We offer both in-person consultations at practitioners' offices and virtual video consultations. You can choose based on your preference, location, and the nature of your health concern."
    },
    {
      question: "How does the online pharmacy work?",
      answer: "After your consultation, if medication is prescribed, you can fill your prescription directly through our integrated online pharmacy. We offer convenient home delivery with same-day options in select areas."
    }
  ];

  const faqColumn2 = [
    {
      question: "Are all practitioners on Onlymed verified?",
      answer: "Yes. Every healthcare professional on our platform undergoes a thorough verification process. We confirm their credentials, licenses, and professional standing to ensure you receive care from qualified practitioners."
    },
    {
      question: "Is my medical information secure?",
      answer: "Absolutely. Onlymed uses bank-level encryption and is fully HIPAA compliant. Your medical records, consultation history, and personal information are protected with the highest security standards."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, bank transfers, and mobile payment options. Payment is processed securely at the time of booking, and you'll receive a detailed receipt for your records."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule appointments through your Onlymed account. Please note our cancellation policy: free cancellation up to 24 hours before your appointment time."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headings
      gsap.from('.faq-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-heading', start: 'top 85%' },
      });

      gsap.from('.faq-subheading', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-subheading', start: 'top 85%' },
      });

      // Accordion items
      gsap.from('.faq-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-grid', start: 'top 80%' },
      });
    }, sectionRef);

    // Three.js particles
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      canvasRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];
      const color = new THREE.Color(0x2987F3);

      for (let i = 0; i < 700; i++) {
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
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0004;
        particles.rotation.y += 0.0006;
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
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden py-20! px-4! flex items-center justify-center"
      style={{ backgroundImage: `url(${doc})` }}
    >
      {/* Three.js layer */}
      <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-12!">
          <h2 className="faq-heading font-display text-5xl md:text-6xl font-bold text-white mb-4!">
           Frequently Asked Questions
          </h2>
          
        </div>

        {/* FAQ Grid */}
        <div className="faq-grid grid md:grid-cols-2 gap-8! mb-12!">
          {/* Column 1 */}
          <div className="space-y-4!">
            {faqColumn1.map((faq, index) => (
              <div
                onClick={() => toggleAccordion(index)}
                key={index}
                className={`faq-item border-b rounded-[16px] px-4! border-white/20 pb-4! ${openIndex === index ? 'bg-white text-gray-400' : 'bg-gray-500/20 text-white'}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left py-4! group"
                  aria-expanded={openIndex === index}
                >
                  <span className={`text-lg md:text-xl font-semibold text-white pr-4! group-hover:text-white/80 transition ${openIndex === index ? 'text-gray-400!' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-6! h-6! flex items-center! justify-center!">
                    {openIndex === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2 10.5714V13.4286H22V10.5714H2Z" fill="gray"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.5714 10.5714V2H13.4286V10.5714H22V13.4286H13.4286V22H10.5714V13.4286H2V10.5714H10.5714Z" fill="white"/>
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100 bg-white' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className={`text-base md:text-lg leading-relaxed pb-4! ${openIndex === index ? 'text-gray-400' : 'text-white/80'}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4!">
            {faqColumn2.map((faq, index) => {
              const adjustedIndex = index + faqColumn1.length;
              return (
                <div
                onClick={() => toggleAccordion(adjustedIndex)}
                  key={adjustedIndex}
                  className={`faq-item border-b rounded-[16px] px-4! border-white/20 pb-4! ${openIndex === adjustedIndex ? 'bg-white text-gray-400' : 'bg-gray-500/20 text-white'}`}
                >
                  <button
                    onClick={() => toggleAccordion(adjustedIndex)}
                    className="w-full flex items-center justify-between text-left py-4! group"
                    aria-expanded={openIndex === adjustedIndex}
                  >
                    <span className={`text-lg md:text-xl font-semibold text-white pr-4! group-hover:text-white/80 transition ${openIndex === adjustedIndex ? 'text-gray-400!' : 'text-white'}`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-6! h-6! flex items-center! justify-center!">
                      {openIndex === adjustedIndex ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M2 10.5714V13.4286H22V10.5714H2Z" fill="gray"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10.5714 10.5714V2H13.4286V10.5714H22V13.4286H13.4286V22H10.5714V13.4286H2V10.5714H10.5714Z" fill="white"/>
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      openIndex === adjustedIndex ? 'max-h-96 opacity-100 bg-white' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className={`text-base md:text-lg leading-relaxed pb-4! ${openIndex === adjustedIndex ? 'text-gray-400' : 'text-white/80'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       
      </div>
    </section>
  )
}

export default Faq
