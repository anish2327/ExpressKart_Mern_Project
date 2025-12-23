import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    // ✅ Clear localStorage or redux data
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    { id: "profile", label: "Profile Info" },
    { id: "orders", label: "Your Orders" },
    {id: "savedaddres", label: "Save Address"},
    { id: "payments", label: "Payment History" },
    { id: "support", label: "Help & Support" },
    { id: "about", label: "About Us" },
    { id: "logout", label: "Logout" },
   
  ];
  console.log(user)
  console.log(user.email);
  console.log(user.firstName)

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-slate-700">Profile Info</h2>
            <div className="bg-white p-4 rounded-xl shadow">
              {/* <p><strong>Name:</strong> {user.fullName}</p> */}
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-slate-700">Your Orders</h2>
            <p className="text-gray-500">You haven’t placed any orders yet.</p>
          </div>
        );

      case "payments":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-slate-700">Payment History</h2>
            <p className="text-gray-500">No payment history available yet.</p>
          </div>
        );

      case "support":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-slate-700">Help & Support</h2>
            <p className="text-gray-600 mb-2">
              📧 Email: anishgiri6393@gmail.com
            </p>
            <p className="text-gray-600">
              📞 Phone: +91 1234567890
            </p>
          </div>
        );

      case "about":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-slate-700">About Us</h2>
            <p className="text-gray-600">
              Welcome to <strong>MyShop</strong> — your one-stop destination for the best online shopping experience.
            </p>
            <br/>
            <p>
                Expresskart is one of India's fastest-growing online shopping platforms, providing a seamless and convenient way
                 for customers to shop from the comfort of their homes. Just like popular platforms such as Flipkart and Amazon, 
                 Expresskart offers a wide range of products — from electronics, fashion, and home essentials to everyday needs. 
                 Our platform is designed with a user-friendly interface to make browsing, adding items to the cart, and making 
                 secure payments simple and hassle-free. Expresskart aims to bring the best products to Indian customers quickly, 
                 reliably, and with excellent support, making online shopping in India smarter and more enjoyable for everyone.
            </p>
          </div>
        );

      case "logout":
        handleLogout();
        break;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-600">User Dashboard</h2>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-left p-2 mb-2 rounded-md font-medium transition-all ${
              activeTab === item.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default Profile;
