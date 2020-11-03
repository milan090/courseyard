import axios from "axios";

export const searchCourses = async (q) => {
  try {
    const response = await axios.get(`/courses/search?q=${q}`);
    if (response.status !== 200) return [];
    return response.data.courses;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
};
