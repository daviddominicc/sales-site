import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homes from "../pagess/home/Homes";
import Spinner from "../components/Spinner";
import { Products, ProductsDetails } from "../pagess/products";
import Search from "../pagess/search/Search";
import Login from "../pagess/login/Login";
import Profile from "../pagess/profile/Profile";
import { PrivateRoutes } from "./ProtectedRoutes";

const Root = lazy(() => import("../layouts/Root"));
const Auth = lazy(() => import("../layouts/Auth"));

export default function Approutes() {
  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <Root />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Homes />,
        },
        {
          path: "products/:categoryName",
          element: <Products />,
        },
        {
          path: "product/:productId",
          element: <ProductsDetails />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "profile",
          element: (
            <PrivateRoutes>
              <Profile/>
            </PrivateRoutes>
          )
        }
      ],
    },
    {
      element: (
        <Suspense fallback={<Spinner />}>
          <Auth />
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
