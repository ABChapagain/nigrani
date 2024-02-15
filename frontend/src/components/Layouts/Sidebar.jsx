import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const themeConfig = useSelector((state) => state.themeConfig);
  const semidark = useSelector((state) => state.themeConfig.semidark);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul = selector.closest('ul.sub-menu');
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('NIGRANI')}</span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="nav-item">
                <ul>
                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'cameras' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('cameras')}>
                      <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17 10.9996V9.99956C17 8.11394 17 7.17113 16.4142 6.58535C15.9427 6.1138 15.2398 6.02184 14 6.00391M7 10.9996V9.99956C7 8.11394 7 7.17113 7.58579 6.58535C8.05733 6.1138 8.76022 6.02184 10 6.00391"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path d="M5 11H19" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 16H9M16 16H12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('cameras')}</span>
                      </div>

                      <div className={currentMenu === 'cameras' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'cameras' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <NavLink to="/cameras/list">{t('list')}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/cameras/add">{t('add')}</NavLink>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'detectations' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('detectations')}>
                      <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17 10.9996V9.99956C17 8.11394 17 7.17113 16.4142 6.58535C15.9427 6.1138 15.2398 6.02184 14 6.00391M7 10.9996V9.99956C7 8.11394 7 7.17113 7.58579 6.58535C8.05733 6.1138 8.76022 6.02184 10 6.00391"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path d="M5 11H19" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M8 16H9M16 16H12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('detectations')}</span>
                      </div>

                      <div className={currentMenu === 'detectations' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'detectations' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <NavLink to="/detectations/list">{t('list')}</NavLink>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
