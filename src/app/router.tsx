import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '../layout/site-layout'
import { HomePage } from '../pages/home-page'
import { NotFoundPage } from '../pages/not-found-page'
import { ProjectDetailPage } from '../pages/project-detail-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
