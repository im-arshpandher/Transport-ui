import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';

const testimonialsData = [
    {
        img: '/profile.webp',
        name: 'Alice Johnson',
        designation: 'Product Manager',
        testimonial: 'This product exceeded my expectations. The team was fantastic to work with!',
    },
    {
        img: '/profile.webp',
        name: 'Bob Smith',
        designation: 'Software Engineer',
        testimonial: 'A seamless experience from start to finish. Highly recommended!',
    },
    {
        img: '/profile.webp',
        name: 'Carol Lee',
        designation: 'UX Designer',
        testimonial: 'The attention to detail and user experience is top-notch.',
    },
];

const Testimonials = () => {
    const isDark = useSelector((state) => state.darkMode.value);

    // Determine slidesPerView based on screen size
    const [slidesPerView, setSlidesPerView] = React.useState(1);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`py-16 px-0 shadow-2xl w-full mx-auto transition-colors duration-300 ${
                isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'
            }`}
        >
            <h2
                className={`text-3xl font-extrabold text-center mb-4 tracking-tight ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
                What Our Clients Say
            </h2>
            <p
                className={`text-center mb-10 text-lg ${
                    isDark ? 'text-white' : 'text-gray-600'
                }`}
            >
                We value our clients' feedback and strive to provide the best service possible.
            </p>
            <div className="w-full">
                <Swiper
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    spaceBetween={40}
                    slidesPerView={slidesPerView}
                    className="w-full"
                >
                    {testimonialsData.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className={`flex flex-col items-center p-8 rounded-2xl shadow-lg border transition-colors duration-300 mx-4 my-6 ${
                                    isDark
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="relative mb-4">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full border-4 border-primary-500 shadow-lg"
                                    />
                                    <svg
                                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                                        width="40"
                                        height="24"
                                        viewBox="0 0 40 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20 24C31.0457 24 40 18.6274 40 12C40 5.37258 31.0457 0 20 0C8.9543 0 0 5.37258 0 12C0 18.6274 8.9543 24 20 24Z"
                                            fill={isDark ? "#1F2937" : "#F3F4F6"}
                                        />
                                    </svg>
                                </div>
                                <div
                                    className={`font-semibold text-xl mb-1 ${
                                        isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    {item.name}
                                </div>
                                <div
                                    className={`text-sm mb-4 ${
                                        isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                >
                                    {item.designation}
                                </div>
                                <div
                                    className={`italic text-center text-lg leading-relaxed ${
                                        isDark ? 'text-white' : 'text-gray-700'
                                    }`}
                                >
                                    “{item.testimonial}”
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
