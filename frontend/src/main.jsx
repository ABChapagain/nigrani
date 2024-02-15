import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// Tailwind css
import './index.css'

// i18n (needs to be bundled)
import './i18n'

// Table css
import 'tippy.js/dist/tippy.css'

// Sweet Alert
import 'sweetalert2/src/sweetalert2.scss'

// Router
import { RouterProvider } from 'react-router-dom'
import router from './router/index'

// Redux
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
)
