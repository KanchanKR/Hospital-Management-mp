import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { useAuth } from '../../AuthContext/AuthContext';
import userImg from "../../assets/images/avatar-icon.png";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/appointment", display: "Book Appointment" },
  { path: "/pOnboarding", display: "Patient Onboarding" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleLHeaderClick = () => {
    navigate("/home");
  };

  console.log(isAuthenticated)

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[25px] heading text-primaryColor cursor-pointer" onClick={handleLHeaderClick}>Hospital Management</h1>
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full">
                  <img
                    src={userImg}
                    className="w-full rounded-full cursor-pointer"
                    alt=""
                  />
                </figure>
              </Link>
            </div>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-500 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
