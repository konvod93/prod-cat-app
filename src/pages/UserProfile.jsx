import { useState } from "react";
import { useUser } from "../hooks/useUser";
import ProfileHeader from "../components/user-profile/ProfileHeader";
import ProfileTabs from "../components/user-profile/ProfileTabs";
import ProfileInfo from "../components/user-profile/ProfileInfo";
import OrdersTab from "../components/user-profile/OrdersTab";
import WishlistTab from "../components/user-profile/WishlistTab";
import AddressesTab from "../components/user-profile/AddressesTab";

export default function UserProfile() {
  const { user } = useUser();  
  const [activeTab, setActiveTab] = useState("profile"); 
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Шапка профиля */}
        <ProfileHeader user={user} />

        {/* Табы */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Профиль */}
        {activeTab === "profile" && (
          <ProfileInfo />
        )}        

        {/* Заказы */}
        {activeTab === "orders" && (
          <OrdersTab />
        )}

        {/* Избранное */}
        {activeTab === "favorites" && (
          <WishlistTab />
        )}

        {/* Адреса */}
        {activeTab === "addresses" && (
          <AddressesTab />
        )}
      </div>
    </div>
  );
}
