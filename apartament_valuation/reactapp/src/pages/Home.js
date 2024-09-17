import React, { useRef } from 'react';
import Img from '../assets/bck.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

  const howItWorks = useRef(null);
  const top = useRef(null);
  const about = useRef(null);
  const contact = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header
        scrollToSection={scrollToSection} 
        refs={{ top, howItWorks, about, contact }}  
      />

      <div className="pt-18 min-h-screen flex justify-center items-center">
        <div className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-[image:var(--image-url)]" style={{ '--image-url': `url(${Img})` }}>

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/10 pointer-events-none"></div>
          
          <div ref={top} className="w-full min-h-screen flex flex-col justify-center items-center p-32">
            <h1 className="mt-32 text-4xl pb-4 font-bold text-white tracking-widest">apartment valuation</h1>
            <button 
              className="mb-40 relative h-12 w-40 overflow-hidden border border-white text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-black hover:shadow-white hover:before:h-64 hover:before:-translate-y-32"
            >
              <span className="relative z-10">TRY IT</span>
            </button>

            <svg onClick={() => scrollToSection(howItWorks)} className="w-[44px] h-[44px] text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="m19 9-7 7-7-7"/>
            </svg>
          </div>

          <div ref={howItWorks} className="w-full min-h-screen bg-white flex justify-center items-center">
            <section className="py-10 bg-white sm:py-16 lg:py-24">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
                  <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.
                  </p>
                </div>
                <div className="mt-12 lg:mt-20">
                  <div className="grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">1</span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a free account</h3>
                      <p className="mt-4 text-base text-gray-600">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">2</span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Build your website</h3>
                      <p className="mt-4 text-base text-gray-600">
                        Velit officia consequat duis enim velit mollit.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700">3</span>
                      </div>
                      <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Release & Launch</h3>
                      <p className="mt-4 text-base text-gray-600">
                        Release your website and make it live.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <hr ref={about}/><hr/><hr/>
          <div className='flex w-full min-h-screen justify-center pt-24'>
              <section class="bg-white ">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h4 class="text-xl font-medium text-gray-900">Numbers tell the hard works we’ve done in last 6 years</h4>
                    </div>

                    <div class="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
                        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg">
                            <div class="px-4 py-6">
                                <div class="flex items-start">
                                    <svg class="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <div class="ml-4">
                                        <h4 class="text-4xl font-bold text-gray-900">6+</h4>
                                        <p class="mt-1.5 text-lg font-medium leading-tight text-gray-500">Years in business</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg">
                            <div class="px-4 py-6">
                                <div class="flex items-start">
                                    <svg class="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <div class="ml-4">
                                        <h4 class="text-4xl font-bold text-gray-900">37+</h4>
                                        <p class="mt-1.5 text-lg font-medium leading-tight text-gray-500">Team members</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg">
                            <div class="px-4 py-6">
                                <div class="flex items-start">
                                    <svg class="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div class="ml-4">
                                        <h4 class="text-4xl font-bold text-gray-900">3,274</h4>
                                        <p class="mt-1.5 text-lg font-medium leading-tight text-gray-500">Projects delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white border border-gray-200 rounded-lg">
                            <div class="px-4 py-6">
                                <div class="flex items-start">
                                    <svg class="flex-shrink-0 w-12 h-12 text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1"
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                        />
                                    </svg>
                                    <div class="ml-4">
                                        <h4 class="text-4xl font-bold text-gray-900">98%</h4>
                                        <p class="mt-1.5 text-lg font-medium leading-tight text-gray-500">Customer success</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          </div>
          <section ref={contact} class="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Contact us</h2>
                    <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                </div>

                <div class="max-w-5xl mx-auto mt-12 sm:mt-16">
                    <div class="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                        <div class="overflow-hidden bg-white rounded-xl">
                            <div class="p-6">
                                <svg class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <p class="mt-6 text-lg font-medium text-gray-900">+1-316-555-0116</p>
                                <p class="mt-1 text-lg font-medium text-gray-900">+1-446-526-0117</p>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white rounded-xl">
                            <div class="p-6">
                                <svg class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p class="mt-6 text-lg font-medium text-gray-900">contact@example.com</p>
                                <p class="mt-1 text-lg font-medium text-gray-900">hr@example.com</p>
                            </div>
                        </div>

                        <div class="overflow-hidden bg-white rounded-xl">
                            <div class="p-6">
                                <svg class="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p class="mt-6 text-lg font-medium leading-relaxed text-gray-900">8502 Preston Rd. Ingle, Maine 98380, USA</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 overflow-hidden bg-white rounded-xl">
                        <div class="px-6 py-12 sm:p-12">
                            <h3 class="text-3xl font-semibold text-center text-gray-900">Send us a message</h3>

                            <form action="#" method="POST" class="mt-14">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Your name </label>
                                        <div class="mt-2.5 relative">
                                            <input type="text" name="" id="" placeholder="Enter your full name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                                        <div class="mt-2.5 relative">
                                            <input type="email" name="" id="" placeholder="Enter your full name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Phone number </label>
                                        <div class="mt-2.5 relative">
                                            <input type="tel" name="" id="" placeholder="Enter your full name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="" class="text-base font-medium text-gray-900"> Company name </label>
                                        <div class="mt-2.5 relative">
                                            <input type="text" name="" id="" placeholder="Enter your full name" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="" class="text-base font-medium text-gray-900"> Message </label>
                                        <div class="mt-2.5 relative">
                                            <textarea name="" id="" placeholder="" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
