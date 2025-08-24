import { useEffect, useState } from "react";
import { signup, login, getProfile } from "../api";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example: login first (in real app, you'd have a login form)
        await login({ username: "phantom", password: "test123" });

        // Now call protected profile
        const userProfile = await getProfile();
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h2>Welcome, {profile.username}!</h2>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
