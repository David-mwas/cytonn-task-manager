const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";

function getToken() {
  return (
    localStorage.getItem("token") ||
    (() => {
      const stored = localStorage.getItem("cytonnUserToken");
      if (!stored) return null;
      try {
        return stored;
      } catch {
        return null;
      }
    })()
  );
}

export const api = {
  get: async (path: string) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  post: async (path: string, body: unknown) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to post data");
    return res.json();
  },

  put: async (path: string, body: unknown) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to update");
    return res.json();
  },

  delete: async (path: string) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete");
    return res.json();
  },
};
