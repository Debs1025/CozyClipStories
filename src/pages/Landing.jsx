import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Devider1 from '../components/Devider1';
import Devider2 from '../components/Devider2';
import Stories from '../components/Stories';
import Aboutus from '../components/Aboutus';
import Footer from '../components/Footer';

const Landing = () => {
  const navigate = useNavigate(); // ✅ create navigate instance

  const handleGetStarted = () => {
    navigate('/login'); // ✅ redirect to Login.jsx page
  };

  // Ensure the page starts at the top / hero section when Landing mounts (so refresh shows Discover)
  useEffect(() => {
    const el = document.getElementById('discover');
    if (el) {
      // Use instant jump on mount to avoid flicker from browser restoring scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // also ensure discover is focused for accessibility
      el.focus?.();
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div
        id="discover"
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <img
          src="/src/assets/BG-1.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative text-center text-white px-4 sm:px-6 md:space-y-8 max-w-7xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-snug drop-shadow-xl">
            <span
              className="text-[#b0042b]"
              style={{
                WebkitTextStroke: '1px white',
                textStroke: '1px white',
              }}
            >
              CozyClips
            </span>{' '}
            Stories turns reading into a fun, interactive learning experience
            that motivates students.
          </h1>

          <p className="text-xl sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-md sm:max-w-2xl mx-auto mt-5">
            CozyClips Stories combines digital storytelling with interactive
            quizzes, rewards, and progress dashboards to create a personalized
            and engaging learning experience for students.
          </p>

          <button
            onClick={handleGetStarted}
            className="bg-[#b0042b] border border-gray-300 text-white font-semibold px-7 sm:px-12 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-[#8a0321] hover:scale-95 hover:shadow-xl mt-10 sm:mt-7"
          >
            Get Started
          </button>
        </div>
      </div>

      <section id="features">
        <Features />
      </section>

      <Devider1 />

      <section id="stories">
        <Stories />
      </section>

      <Devider2 />

      <section id="about">
        <Aboutus />
      </section>
      <Footer />
    </div>
  );
};

export default Landing;

