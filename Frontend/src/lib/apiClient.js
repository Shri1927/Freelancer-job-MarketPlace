const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(
    path.startsWith("http") ? path : `${API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  let data = null;
  try {
    data = await response.json();
  } catch {
    // ignore JSON parse errors for empty responses
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export { API_BASE_URL };


