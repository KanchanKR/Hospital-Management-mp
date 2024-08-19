
import {Link, useNavigate} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../components/About/About'
import heroImg01 from "../assets/images/hero-img01.png"
import heroImg02 from "../assets/images/hero-img02.png"
import heroImg03 from "../assets/images/hero-img03.png"
import icon01 from "../assets/images/icon01.png"
import icon02 from "../assets/images/icon02.png"
import icon03 from "../assets/images/icon03.png"
import faqImg from "../assets/images/faq-img.png"
import FaqList from '../components/Faq/FaqList'
import Testimonial from '../components/Testimonial.jsx/Testimonial'

const Home = () => {

  const navigate = useNavigate();
  const handleLBookAppointmentClick = () => {
    navigate("/appointment"); 
  };
  return (
   <>
      {/* ============= Hero section ============ */}
      
        <section className="hero__section pt-[60px] 2xl:h[800px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/* ============ Hero content =========== */}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className="text-[30px] leading-[60px] text-headingColor font-[800] md:text-[60px]">We help patients live a healthy, longer life.</h1>
                  <p className='text__para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem animi, ipsam quibusdam tempora, iure doloribus commodi totam magni minus excepturi consectetur explicabo a!</p>

                  <button className="btn" onClick={handleLBookAppointmentClick}>Book a Appointment</button>
                </div>

                {/* ======== Hero counter =========== */}
                <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">30+</h2>
                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Years of Experience</p>
                  </div>

                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">15+</h2>
                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Clinic Location</p>
                  </div>

                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">400+</h2>
                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                    <p className='text__para'>Patient Satisfaction</p>
                  </div>
                </div>
              </div>
              {/* ============ Hero content =========== */}

              <div className='flex gap-[30px] justify-end'>
                <div>
                  <img className="w-full"src={heroImg01} alt="" />
                </div>
                <div className='mt-[30px]'>
                  <img className="w-full mb-[30px]"src={heroImg02} alt="" />
                  <img className="w-full"src={heroImg03} alt="" />
                </div>
              </div>

            </div>
          </div>
        </section>
      {/* ============= Hero section End ============ */}

      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Providing the best medical services</h2>
            <p className='text__para text-center'>World-class care for everyone. Our health System offers unmatched, expert health care.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>

            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find Doctor</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone, Our health System offers unmatched, expert heath care, From the lab to the clinic.
                </p>

                <Link 
                  to='/appointment'
                  className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>

            </div>

            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find Location</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone, Our health System offers unmatched, expert heath care, From the lab to the clinic.
                </p>

                <Link 
                  to='/appointment'
                  className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>

            </div>

            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone, Our health System offers unmatched, expert heath care, From the lab to the clinic.
                </p>

                <Link 
                  to='/appointment'
                  className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* =============== services section ============ */}
      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our Medical services</h2>
            <p className='text__para text-center'>
              World-class care for everyone. Our health System offers unmatched, expert health care.
            </p>
          </div>
        </div>
      </section>
      {/* =============== services section END ============ */}

      {/* =========== FAQ Section ========= */}
      <section>
        <div className="container">
          <div className='flex justify-between gap[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img src={faqImg} alt="" />
            </div>

            <div className='w-full md:w-1/2'>
            <h2 className='heading'>
              Most asked questions by our beloved patients
            </h2>
            <FaqList/>
            </div>

          </div>
        </div>
      </section>
      {/* =========== FAQ Section ========= */}

      {/* =========== testimonial ========= */}
      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What our patients say</h2>
            <p className='text__para text-center'>
              World-class care for everyone. Our health System offers unmatched, expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
      {/* =========== testimonial eng ========= */}
   </>
  )
}

export default Home