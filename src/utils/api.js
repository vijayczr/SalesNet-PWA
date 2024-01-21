export const getProfileData = async (updateUserData, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Authentication/ProfileData`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}}`,
      },
    }
  );
  const profileData = await res.json();
  if (profileData.resCode === 200) {
    updateUserData(profileData?.resData);
  }
};

export const getPersonContactedData = async (personId, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Dar/CustDetail?CustId=${personId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}}`,
      },
    }
  );
  const personResponse = await res.json();
  if (personResponse.resCode === 200) {
    return personResponse?.resData;
  } else {
    throw new Error("Couldn't fetch contacted person data");
  }
};
