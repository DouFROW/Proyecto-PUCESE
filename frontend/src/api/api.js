const API_URL = import.meta.env.VITE_API_URL;

export const getMembers = async () => {
  const res = await fetch(`${API_URL}/api/socios`);
  return res.json();
};

export const addMember = async (data) => {
  const res = await fetch(`${API_URL}/api/socios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};