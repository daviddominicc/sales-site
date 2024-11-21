import { Link, NavLink } from "react-router-dom";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import useFetch from "../hooks/useFetch";
import { getProductCategories } from "../api/api";
import { useState } from "react";
import SearchBox from "./SearchBox";
import { RxPerson } from "react-icons/rx";
import { useAuth } from "../hooks/useStore";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

export default function Nav() {
  const [showSearch, setShowSearch] = useState(false);
  const { error, data, loading } = useFetch(getProductCategories);
  const { user, logout } = useAuth();

  const { data: authUser, isAuthenticated } = user;

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <div className=" py-4 lg:py-12 px-4 sticky top-0 bg-slate-100 z-40">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center">
        <NavLink to="/" className="font-bold text-xl">
          DUMMY STORE
        </NavLink>
        <div className="hidden lg:block">
          {error && <span className="text-[12px]">{error}</span>}
          {loading ? (
            <span className="text-[12px]">Loading Categories...</span>
          ) : (
            <>
              {data.slice(0, 5).map((item, index) => (
                <NavLink
                  key={index}
                  className="mx-4 font-semibold capitalize"
                  to={`/products/${item}`}
                >
                  {({ isActive }) => (
                    <span
                      className={
                        isActive ? "text-blue-400" : "hover:text-gray-400"
                      }
                    >
                      {item}
                    </span>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <CiSearch
            size="24px"
            onClick={() => handleShowSearch(true)}
            className="cursor-pointer"
          />
          <CiShoppingCart size="24px" />
          {isAuthenticated ? (
            <>
              <details className="dropdown dropdown-end">
                <summary className="btn m-1 bg-transparent shadow-none border-0">
                  <h1>Hi, {authUser.username}</h1>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <span onClick={logout}>Logout</span>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <NavLink to="/login">
              <RxPerson size="24px" className="cursor-pointer" />
            </NavLink>
          )}
          <div className="lg:hidden">
          <div className="drawer">
            <FiMenu id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button">
                <FiMenu  size="24px"/>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 py-4">
                {/* Sidebar content here */}
                <div className="flex justify-end">
                  <AiOutlineClose
                    size="24px"
                    onClick={() =>
                      (document.getElementById("my-drawer").checked = false)
                    }
                    className="cursor-pointer"
                  />
                </div>
                {data.slice(0, 10).map((item, index) => (
                  <li key={index}>
                    <NavLink
                      className="my-2 font-semibold capitalize"
                      to={`/products/${item}`}
                      onClick={() =>
                        (document.getElementById("my-drawer").checked = false)
                      }
                    >
                      {({ isActive }) => (
                        <span
                          className={
                            isActive ? "text-blue-400" : "hover:text-gray-400"
                          }
                        >
                          {item}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>


        </div>
      </div>
      {showSearch && <SearchBox handleShowSearch={handleShowSearch}/>}
    </div>
  );
}
