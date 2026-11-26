import { useState, useEffect } from "react";
import logo from "../assets/image/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("univoice_user") || "null");
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setCurrentUser(JSON.parse(localStorage.getItem("univoice_user") || "null"));
    } catch {
      setCurrentUser(null);
    }
    setOpen(false);
  }, [pathname]);

  if (pathname === "/login") {
    return null;
  }

  const isLoggedIn = Boolean(currentUser);
  const isStaff = currentUser?.role === "Staff";

  const links = isStaff
    ? [
     
      { name: "Dashboard", to: "/staff-dashboard" },
     
    ]
    : [
      { name: "Home", to: "/" },
      { name: "Complaint", to: "/complaint" },
      { name: "About Us", to: "/about" },
      { name: "Profile", to: "/profile" },
    ];

  return (
    <nav className="sticky top-0 z-50 flex md:grid md:grid-cols-3 items-center justify-between px-5 md:px-12 h-24 md:h-28 bg-white shadow-md shadow-[#1c3d2a1f]">
    
      <div className="flex items-center justify-start">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="UniVoice Logo"
            className="h-16 md:h-28 w-auto object-contain scale-125 md:scale-150 origin-left"
          />
        </Link>
      </div>

     
      <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-9 text-base lg:text-lg font-medium text-[var(--TextHeroSecondarySecond)]">
        {links.map((link) => (
          <li key={link.to} className="shrink-0">
            <Link
              to={link.to}
              className={`whitespace-nowrap transition-colors duration-200 hover:opacity-75 ${pathname === link.to ? "font-bold underline underline-offset-8" : ""
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end gap-3.5">
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:inline-block whitespace-nowrap text-sm md:text-base font-medium text-white bg-[var(--TextHeroSecondarySecond)] 
                       hover:opacity-90 border-2 border-[var(--TextHeroSecondarySecond)] 
                       px-6 py-2.5 rounded-full transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        )}

        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl text-2xl text-[var(--TextHeroSecondarySecond)] hover:bg-purple-100/70 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>

     
      {open && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-white border-t border-purple-950/10 flex flex-col items-center gap-5 py-7 shadow-lg z-50 text-lg font-medium text-[var(--TextHeroSecondarySecond)]">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className={`whitespace-nowrap ${pathname === link.to ? "font-bold" : ""}`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {!isLoggedIn && (
            <div className="flex sm:hidden items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="text-sm font-medium text-white bg-[var(--TextHeroSecondarySecond)] px-5 py-2.5 rounded-full"
              >
                Sign In
              </button>
            </div>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Nav;