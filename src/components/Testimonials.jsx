import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonialsData = [
  {
    name: 'Brian K.',
    designation: 'Supply Chain Manager, Emirates Steel',
    testimonial: 'Mashiana and their flatbed crews go above and beyond. Sourcing reliable flatbeds across borders is always tough, but they consistently deliver on-time with clean cargo protection.',
    rating: 5,
  },
  {
    name: 'Laura M.',
    designation: 'Operations Director, GCC Infrastructure Corp',
    testimonial: 'We wish every logistics company had the same commitment to communication as Mashiana! Not only do they handle our heavy oversized loads safely, they provide actual real-time location maps.',
    rating: 5,
  },
  {
    name: 'Adam H.',
    designation: 'Procurement Specialist, Dubai Heavy Equipments',
    testimonial: 'They make my job easier! Whenever I have hot cargo in construction sites, they arrange the trucks and flatbeds, custom binders, and border permits within hours. Absolute lifesavers.',
    rating: 5,
  },
];

const Testimonials = () => {
  const isDark = useSelector((state) => state.darkMode.value);

  return (
    <section
      className={`py-20 px-0 transition-colors duration-300 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            Client Success
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            What Our Clients Say
          </h2>
          <p
            className={`max-w-xl mx-auto mt-4 text-sm sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            We coordinate directly with site managers and coordinators to guarantee safe drop-offs.
          </p>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              }
            }}
            className="w-full"
          >
            {testimonialsData.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto flex">
                <div
                  className={`p-8 rounded-xl shadow-md border flex flex-col justify-between transition-all duration-300 w-full relative ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-brand-red text-white'
                      : 'bg-white border-slate-200 hover:border-brand-red text-slate-800'
                  }`}
                >
                  {/* Top Portion: Quote Icon, Testimonial and Rating */}
                  <div>
                    {/* Star Ratings (AMT style) */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-sm" />
                      ))}
                    </div>

                    <FaQuoteLeft className="text-brand-red text-2xl opacity-20 mb-4" />

                    <p className={`text-sm leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      “{item.testimonial}”
                    </p>
                  </div>

                  {/* Bottom Portion: Author Details */}
                  <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col justify-start">
                    <div className="font-bold text-sm uppercase tracking-wide">
                      {item.name}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                      {item.designation}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
