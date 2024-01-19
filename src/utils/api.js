export default async function getProfileData(updateUserData) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/Authentication/ProfileData`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      // console.log(profileData.resData, 'Profile Data');
      // setProfileData(profileData.resData);
      console.log(profileData, profileData.resData, 'res Data');
        updateUserData(profileData?.resData)
    //   setDarHeaderData((prev) => ({...prev, profileData: profileData?.resData}))
    }
  }