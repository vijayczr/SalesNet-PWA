import { useEffect, useState } from "react";

function useProfileData() {
  const [profileData, setProfileData] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getProfiledata() {
      try {
        const res = await fetch(
          `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
            },
          }
        );
        const profileData = await res.json();
        if (profileData.resCode === 200) {
          setProfileData(profileData.resData);
          setError(null);
        }
      } catch (err) {
        setProfileData("");
        setError(err.message);
      }
    }

    getProfiledata();
  }, []);

  return {
    profileData,
    profileError: error
  };
}

export default useProfileData;
