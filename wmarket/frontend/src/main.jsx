import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Earn from "./Pages/Earn";
import News from "./Pages/News";
import Shop from "./Pages/Shop";
import Profile from "./Pages/Profile";
import Record from "./Pages/Recorde";
import Order from "./Pages/Order";
import Paid from "./Pages/Paid";
// import Settled from "./Pages/Settled";
import Help from "./Pages/Help";
import Withdrawalhistory from "./Pages/Withdrawalhistory";
import Withdrawalrequest from "./Pages/withdrawalrequests";
import Dashoard from "./Admin/Dashoard";
import Product from "./Admin/Product";
import CategoryPage from "./Admin/CategoryPage";
import WithdrawalRequestsPage from "./Admin/WithdrawalRequestsPage";
import CustomerPage from "./Admin/CustomerPage";
import RequestPage from "./Admin/RequestPage";
import NewsPage from "./Admin/NewsPage";
import Signup from "./Signup";
import Login from "./Login";
// import CreateProduct from "./Admin/CreateProduct";
// import UpdateProduct from "./Admin/UpdateProduct";
import ProductPage from "./Admin/ProductPage";
import UpdateProductPage from "./Admin/UpdateProductPage";
import AddCustomer from "./Admin/AddCustomer";
import UpdateCustomerPage from "./Admin/UpdateCustomerPage";
import AddNews from "./Admin/AddNews";
import UpdateNewsPage from "./Admin/UpdateNewsPage";
import AddMembership from "./Admin/AddMembership";
import UpdateMembershipPage from "./Admin/UpdateMembershipPage";
// import Pending from "./Pages/Pending";
import ForgotPass from "./components/ForgotPassword/ForgotPass";
import Checkcode from "./components/ForgotPassword/Checkcode";
import Changepassword from "./components/ForgotPassword/Changepassword";
// import Pending from "./Pages/Pending";
import LuckyOrderPage from "./Admin/LuckyOrderPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/news" element={<News />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/withdrawalhistory" element={<Withdrawalhistory />} />
        <Route path="/withdrawal_requests" element={<Withdrawalrequest />} />
        <Route path="/record" element={<Record />} />
        <Route path="/order" element={<Order />} />
        <Route path="/help" element={<Help />} />
        <Route path="/paid" element={<Paid />} />
        {/* <Route path="/pending" element={<Pending />} />
        <Route path="/settled" element={<Settled />} /> */}
        <Route path="/dashoard" element={<Dashoard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/createproduct" element={<ProductPage />} />
        <Route path="/update/:product_id" element={<UpdateProductPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/membership_create" element={<AddMembership />} />
        <Route path="/membership_request" element={<RequestPage />} />
        <Route
          path="/membership_update/:m_id"
          element={<UpdateMembershipPage />}
        />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/createcustomer" element={<AddCustomer />} />
        <Route path="/customer_update/:id" element={<UpdateCustomerPage />} />
        <Route path="/new" element={<NewsPage />} />
        <Route path="/news_create" element={<AddNews />} />
        <Route path="/news_update/:n_id" element={<UpdateNewsPage />} />
        <Route
          path="/WithdrawalRequestsPage"
          element={<WithdrawalRequestsPage />}
        />

        <Route path="/forgotpass" element={<ForgotPass/>}/>
        <Route path="/checkcode/:id" element={<Checkcode/>}/>
        <Route path="changepassword/:id" element={<Changepassword/>}/>
        <Route path="/lucky" element={<LuckyOrderPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
