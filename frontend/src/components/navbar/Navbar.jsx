import React, { useContext, useState } from "react";
import "../navbar/Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setmenu] = useState("Home");
  const [searchTerm, setSearchTerm] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  

  const { getTotalCartAmount, token, setToken, food_list,setSearchResult, searchResult } = useContext(StoreContext);

  const handleChange = (e) => { 
    setSearchBar(e.target.value)
    if (searchBar.length > 0) {
      const filteredFood = food_list.filter(food => food.name.toLowerCase().includes(searchBar))
      setSearchResult(filteredFood)
      //now what to do 
      console.log(searchResult);
      
    }

  }  

  const handleClick = () => {
    setSearchTerm(!searchTerm)
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {searchTerm ? (
        /* create search bar */
        <input
          onChange={handleChange}
          type="search"
          onBlur={() => setSearchTerm(false)}
          className="searchbar"
        />
      ) : (
        <ul className="navbar-menu">
          <Link
            to="/"
            value="Home"
            onClick={handleClick}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            value="Menu"
            onClick={handleClick}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            value="Mobile App"
            onClick={handleClick}
            className={menu === "Mobile App" ? "active" : ""}
          >
            Mobile App
          </a>
          <a
            href="#footer"
            value="Contact Us"
            onClick={handleClick}
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
      )}

      <div className="navbar-right">
        <img
          onClick={handleClick}
          className="searchImg"
          src={assets.search_icon}
          alt=""
        />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
