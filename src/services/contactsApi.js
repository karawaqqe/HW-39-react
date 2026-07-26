const BASE_URL = 'https://connections-api.goit.global';

const request = async (path, { token, ...options } = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const signUp = credentials =>
  request('/users/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const signIn = credentials =>
  request('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const signOut = token =>
  request('/users/logout', {
    method: 'POST',
    token,
  });

export const getCurrentUser = token =>
  request('/users/current', {
    token,
  });

export const getContacts = token =>
  request('/contacts', {
    token,
  });

export const createContact = ({ name, number }, token) =>
  request('/contacts', {
    method: 'POST',
    body: JSON.stringify({ name, number }),
    token,
  });

export const removeContact = (contactId, token) =>
  request(`/contacts/${contactId}`, {
    method: 'DELETE',
    token,
  });
