import {Link } from 'react-router-dom';
import {RiLinkedinFill} from 'react-icons/ri'
import { AiFillGithub } from 'react-icons/ai';

const socialLinks = [
  {
    path: "https://github.com/KanchanKR",
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path: "https://www.linkedin.com/in/kanchan-renapurkar/",
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
  },
]

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/",
    display: "Find a doctor",
  },
  {
    path: "/appointment",
    display: "Book Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get Opinions",
  },
];

const quickLinks03 = [
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {

  const year = new Date().getFullYear

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <h1 className='heading'>Hospital Management</h1>
            <p>Copyright &copy; {year} developed by Kanchan Renapurkar all rights reserved.</p>

          <div className='flex items-center gap-3 mt-4'>
            {socialLinks.map((link, index)=>(
              <Link 
              to={link.path}
              key={index}
              className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'
              >
                {link.icon}
              </Link>
            ))}
            </div>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index)=>(
                <li key={index} className='mb-4'>
                  <Link 
                    to={item.path}
                    className='text-[16px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>I want to:
            </h2>

            <ul>
              {quickLinks02.map((item, index)=>(
                <li key={index} className='mb-4'>
                  <Link 
                    to={item.path}
                    className='text-[16px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>Support
            </h2>

            <ul>
              {quickLinks03.map((item, index)=>(
                <li key={index} className='mb-4'>
                  <Link 
                    to={item.path}
                    className='text-[16px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer