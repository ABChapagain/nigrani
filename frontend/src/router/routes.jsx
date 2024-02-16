import { lazy } from 'react';
import AnalyticsHome from '../pages/Analytics/AnalyticsHome';
// Dashboard
const Dashboard = lazy(() => import('../pages/Dashboard'));

const CameraListPage = lazy(() => import('../pages/cameras/CameraListPage'));
const AddCameraPage = lazy(() => import('../pages/cameras/AddCameraPage'));
const EditCameraPage = lazy(() => import('../pages/cameras/EditCameraPage'));

const DetectationListPage = lazy(() => import('../pages/detectations/DetectationListPage'));
const EditDetectationPage = lazy(() => import('../pages/detectations/EditDetectationPage'));

const routes = [
  // Dashboard
  {
    path: '/',
    element: <Dashboard />,
    layout: 'default',
  },
  {
    path: '/cameras/list',
    element: <CameraListPage />,
    layout: 'default',
  },
  {
    path: '/cameras/add',
    element: <AddCameraPage />,
    layout: 'default',
  },
  {
    path: '/cameras/edit/:id',
    element: <EditCameraPage />,
    layout: 'default',
  },
  {
    path: '/detectations/list',
    element: <DetectationListPage />,
    layout: 'default',
  },
  {
    path: '/detectations/edit/:id',
    element: <EditDetectationPage />,
    layout: 'default',
  },
  {
    path: '/analytics',
    element: <AnalyticsHome />,
    layout: 'default',
  },
];

export { routes };
