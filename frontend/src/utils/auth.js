// Helper function to get token from localStorage
export const getToken = () => {
  // Try direct token first
  let token = localStorage.getItem('token');
  
  // If not found, check inside user object
  if (!token) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        token = userData.token;
      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }
  }
  
  return token;
};

// Helper to get user data
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (err) {
      console.error('Error parsing user:', err);
      return null;
    }
  }
  return null;
};
