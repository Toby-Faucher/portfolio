'use client';

import { 
  ArrowDown, 
  ArrowUp, 
  Briefcase, 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Send, 
  Star, 
  Youtube, 
  Twitter 
} from 'lucide-react'; 
import Image from 'next/image'; 
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; 

// Social links data
const socialLinks = [
  { name: 'X', href: 'https://x.com/Tobias_Faucher', icon: Twitter },
  { name: 'Instagram', href: 'https://www.instagram.com/tobias.faucher/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@Toby-Faucher', icon: Youtube },
  { name: 'GitHub', href: 'https://github.com/Toby-Faucher', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tobias-faucher-223295356/', icon: Linkedin },
];

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
// -------------------------

export default function Home() {
  // State for tracking mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ 
      x: (x - 0.5) * 2, 
      y: (y - 0.5) * 2 
    });
  };


  const maxRotation = 15;
  const perspective = 1500;
  const scale = 1.05;

  const imageTransform = isHovering
    ? `perspective(${perspective}px) 
       rotateY(${-mousePosition.x * maxRotation}deg) 
       rotateX(${mousePosition.y * maxRotation}deg)
       scale(${scale})`
    : 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';

  // --- Scroll Top Logic ---
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.scrollY > 400){
        setShowScrollTop(true);
      } else if (showScrollTop && window.scrollY <= 400){
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop); 
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // ------------------------

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
        <motion.h1 
          className="text-6xl sm:text-8xl md:text-9xl font-bold text-[#E1F2FE] leading-tight mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className='text-[#EBB198]'>Hi.</span> I&apos;m Toby<br />
        </motion.h1>
        <motion.a 
          href="#about-section" 
          className="relative group flex flex-col items-center no-underline"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* About Me button content */}
          <div 
            className="bg-[#E1F2FE] text-[#050505] font-semibold px-6 py-3 rounded-full text-lg 
                       transform transition-transform duration-300 ease-in-out 
                       group-hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#E1F2FE] focus:ring-opacity-50 z-10"
          >
            About Me
          </div>
          <ArrowDown 
            className="absolute top-full mt-2 text-[#E1F2FE] 
                       opacity-0 group-hover:opacity-100 
                       transform translate-y-[-10px] group-hover:translate-y-0 
                       transition-all duration-300 ease-out"
            size={24} 
          />
          {/* Popping Star Icons */}
          <Star 
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[#EBB198] 
                       opacity-0 scale-75 group-hover:opacity-70 group-hover:scale-100 group-hover:translate-x-[150%] group-hover:-translate-y-[130%] group-hover:rotate-192
                       transition-all duration-300 ease-in-out pointer-events-none delay-50"
            size={36} 
            strokeWidth={1.5}
            fill="currentColor"
          />
          <Star 
            className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 text-[#E1F2FE] 
                       opacity-0 scale-75 group-hover:opacity-70 group-hover:scale-100 group-hover:-translate-x-[150%] group-hover:translate-y-[130%] group-hover:-rotate-192
                       transition-all duration-300 ease-in-out pointer-events-none delay-150"
            size={30} 
            strokeWidth={1.5}
            fill="currentColor"
          />
        </motion.a>
      </main>

      {/* About Section */}
      <motion.section 
        id="about-section" 
        className="min-h-screen flex items-center justify-center p-8 md:p-16 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
          <motion.div 
            className="animated-border-box" 
            style={{ perspective: perspective }}
            variants={fadeInUp} // Use fadeInUp variant
            transition={{ duration: 0.8 }}
          >
            <div 
              ref={imageContainerRef}
              className="w-full aspect-square relative rounded-lg overflow-hidden shadow-lg bg-[#010203]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="absolute inset-0 transition-all duration-200 ease-out"
                style={{ transform: imageTransform, transformStyle: 'preserve-3d' }}
              >
                <Image 
                  src="/assets/HeadShot.jpg" 
                  alt="About Me Image" 
                  layout="fill" 
                  objectFit="cover" 
                  quality={100}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="text-[#E1F2FE]"
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" variants={fadeInUp}>A Little More About Me</motion.h2>
            <motion.p className="text-lg mb-4" variants={fadeInUp}>
              I am a tech enthusiast, programmer, IT technician, and high school student.
            </motion.p>
            <motion.p className="text-lg" variants={fadeInUp}>
              I enjoy <span className=' font-extrabold'>making</span> things, check out my projects!
            </motion.p>
            <motion.div className="flex items-center space-x-6 mt-6" variants={fadeInUp}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to Toby Faucher's ${link.name}`}
                    className="text-[#E1F2FE] hover:text-white transform transition-transform duration-300 hover:scale-125"
                  >
                    <Icon size={28} />
                  </a>
                );
              })}
              
              {/* Container for Projects */}
              <div className="relative group flex flex-col items-center">
                <div className="relative">
                  <a 
                    href="#projects-section" 
                    className="bg-[#E1F2FE] text-[#050505] font-semibold px-5 py-2 rounded-full text-md 
                               transform transition-transform duration-300 ease-in-out no-underline inline-block
                               group-hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#E1F2FE] focus:ring-opacity-50"
                  >
                    Projects
                  </a>
                  <Briefcase 
                    className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#E1F2FE] 
                               opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:-translate-x-[140%] group-hover:-translate-y-[120%] group-hover:-rotate-12
                               transition-all duration-300 ease-in-out pointer-events-none"
                    size={20} 
                    strokeWidth={1.5}
                  />
                  <Briefcase 
                    className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-[#E1F2FE] 
                               opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:translate-x-[140%] group-hover:translate-y-[120%] group-hover:rotate-12
                               transition-all duration-300 ease-in-out pointer-events-none delay-100"
                    size={24} 
                    strokeWidth={1.5}
                  />
                </div>
                <ArrowDown 
                  className="absolute top-full mt-1 text-[#E1F2FE] 
                             opacity-0 group-hover:opacity-100 
                             transform translate-y-[-10px] group-hover:translate-y-0 
                             transition-all duration-300 ease-out pointer-events-none"
                  size={20} 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Placeholder Projects Section */}
      <motion.section 
        id="projects-section" 
        className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-4xl font-bold text-[#E1F2FE] mb-12" variants={fadeInUp}>Projects Coming Soon...</motion.h2>
        <motion.a 
          href="#contact-section" 
          className="relative group flex flex-col items-center no-underline"
          variants={fadeInUp} 
          transition={{ delay: 0.2 }}
        >
          <div 
            className="bg-[#E1F2FE] text-[#050505] font-semibold px-6 py-3 rounded-full text-lg 
                       transform transition-transform duration-300 ease-in-out 
                       group-hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#E1F2FE] focus:ring-opacity-50 z-10"
          >
            Get In Touch
          </div>
          <Send 
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#E1F2FE] 
                       opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:-translate-x-[140%] group-hover:-translate-y-[120%] group-hover:-rotate-12
                       transition-all duration-300 ease-in-out pointer-events-none"
            size={20} 
            strokeWidth={1.5}
          />
          <Send 
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-[#E1F2FE] 
                       opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:translate-x-[140%] group-hover:translate-y-[120%] group-hover:rotate-12
                       transition-all duration-300 ease-in-out pointer-events-none delay-100"
            size={24} 
            strokeWidth={1.5}
          />
        </motion.a>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact-section" 
        className="min-h-[50vh] flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 className="text-3xl sm:text-4xl font-bold text-[#E1F2FE] mb-6 text-center" variants={fadeInUp}>Get In Touch</motion.h2>
        <motion.p className="text-lg text-gray-300 mb-8 text-center max-w-md" variants={fadeInUp}>
          Have a question or want to collaborate? Feel free to send me an email!
        </motion.p>
        <motion.div className="relative group" variants={fadeInUp} transition={{ delay: 0.2 }}>
          <a 
            href="mailto:toby@tfaucher.com"
            className="bg-[#E1F2FE] text-[#050505] font-semibold px-6 py-3 rounded-full text-lg 
                       transform transition-transform duration-300 ease-out no-underline inline-block
                       hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#E1F2FE] focus:ring-opacity-50"
          >
            Send Email
          </a>
          <Mail 
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-[#E1F2FE] 
                       opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:-translate-x-[140%] group-hover:-translate-y-[120%] group-hover:-rotate-12
                       transition-all duration-300 ease-in-out pointer-events-none"
            size={20} 
            strokeWidth={1.5}
          />
          <Mail 
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-[#E1F2FE] 
                       opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100 group-hover:translate-x-[140%] group-hover:translate-y-[120%] group-hover:rotate-12
                       transition-all duration-300 ease-in-out pointer-events-none delay-100"
            size={24} 
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.section>

      {/* --- Scroll to Top Button --- */}
      <motion.button
        className="fixed bottom-6 right-6 bg-[#E1F2FE] text-[#050505] p-3 rounded-full shadow-lg z-50 
                   focus:outline-none focus:ring-2 focus:ring-[#E1F2FE] focus:ring-opacity-50"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={showScrollTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ArrowUp size={24} />
      </motion.button>
      {/* --------------------------- */}
    </>
  );
}
