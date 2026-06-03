export const taskService = {
  getTasks: async (filters) => {
    try {
      const response = await fetch('/api/issues', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
};
