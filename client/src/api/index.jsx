const API_URL = "http://localhost:8000";
const token = localStorage.getItem("token");

export const register = (formData) => {
  return fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const login = (formData) => {
  return fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const createSampel = (formDataToSend) => {
  return fetch(`${API_URL}/api/pemeriksaan-sampels`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
  });
};

export const getSampels = () => {
  return fetch(`${API_URL}/api/pemeriksaan-sampels`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSampel = (id) => {
  return fetch(`${API_URL}/api/pemeriksaan-sampels/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSampel = (id, formDataToSend) => {
  return fetch(`${API_URL}/api/pemeriksaan-sampels/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
  });
};

export const deleteSampel = (id) => {
  return fetch(`${API_URL}/api/pemeriksaan-sampels/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
