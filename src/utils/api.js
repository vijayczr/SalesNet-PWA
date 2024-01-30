export const getProfileData = async (setUserData, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Authentication/ProfileData`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  const profileData = await res.json();
  if (profileData.resCode === 200) {
    setUserData(profileData?.resData);
  }
};

export const getPersonContactedData = async (personId, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Dar/CustDetail?CustId=${personId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  const personResponse = await res.json();
  if (personResponse.resCode === 200) {
    return personResponse?.resData;
  } else {
    console.log("Couldn't fetch contacted person data");
  }
};

export const DeleteDar = async (DarId, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Dar/DeleteDar?DarId=${DarId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  const personResponse = await res.json();
  if (personResponse.resCode === 200) {
    return personResponse?.resData;
  } else {
    console.log("Couldn't fetch contacted person data");
  }
};

export const getProductLists = async (productId, jwtToken) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/Dar/ProductListByPrincipalId?PrincipalId=${productId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  const Response = await res.json();
  if (Response.resCode === 200) {
    return Response?.resData;
  } else {
    console.log("Couldn't fetch product list data");
  }
};

export const submitDarForm = async (jwtToken, darForm) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/Dar/DarEntry`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(darForm),
  });

  const response = await res.json();
  if (response?.resCode === 200) {
    return response?.resData;
  } else {
    console.log("Couldn't post dar form data");
  }
};


export const uploadDarFile = async (jwtToken, DarId, file) => {
console.log(file, 'File')
  let formData = new FormData();
  formData.append('DarId', DarId);
  formData.append('DarDoc', file)

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/Dar/DarFileUpload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    body: formData
  });

  const response = await res.json();
  if (response?.resCode === 200) {
    return Response?.resData;
  } else {
    console.log("Couldn't upload file");
  }
}