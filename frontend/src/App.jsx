import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import { store } from './store/store';
import { io } from 'socket.io-client';
import moment from 'moment';
import { Link } from 'react-router-dom';

function App({ children }) {
  const socket = io('https://bpc-hackfest-socket.onrender.com/');

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({});

  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
    dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
    dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
    dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
    dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
    dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
  }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

  useEffect(() => {
    socket.on('connect', () => {
      // This code will run when the component mounts in the browser.
      // const messageList = document.querySelector(".messageBox");
      console.log(`connected with ${socket.id}`);
      // messageList.innerHTML += `<span>connected with ${socket.id}</span><br>`;
    });

    socket.on('receive-message', (message) => {
      setShowModal(true);
      setMessage(message);
    });
  }, []);

  return (
    <div
      className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
      <div
        id="default-modal"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${showModal ? 'flex' : 'hidden'}`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{message?.numberOfElephant} (approx) Elephant Detected!!</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {message?.numberOfElephant} (approx) Elephant Detected in the {message?.cameraId?.name} at {message?.cameraId?.location}. Please take necessary action.
              </p>

              <img src={message?.image} alt="Elephant" className="w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="flex justify-between   p-4 items-center md:p-5 border-t">
              <div className="flex items-center  border-gray-200 rounded-b dark:border-gray-600">
                <Link
                  to={`/detectations/edit/${message?._id}`}
                  onClick={() => setShowModal(false)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Additional Information
                </Link>
              </div>
              <p>
                {moment(message?.createdAt).format('LL')} , {moment(message?.createdAt).format('LT')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
