import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // родитель
    children: [
      { index: true, element: <Home /> },  // дочерний маршрут по умолчанию
      { path: "catalog", element: <Catalog /> },
      { path: "movie/:id", element: <MovieDetail /> },
      { path: "*", element: <NotFound /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
