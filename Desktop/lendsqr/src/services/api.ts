const API_URL = 'https://gist.githubusercontent.com/Richardudeh4/0712fb1d98eaad7a29ab3f03c840fa34/raw/gistfile1.txt';

export interface User {
  _id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

export interface ApiUser {
  _id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

export interface PaginatedUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchUsers = async (page: number = 1, limit: number = 100): Promise<PaginatedUsersResponse> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }
    const data: ApiUser[] = await response.json();
    
    // Map the API data to match our User interface
    const allUsers = data.map((user) => ({
      _id: user._id,
      organization: user.organization,
      username: user.username,
      email: user.email,
      phone: user.phone,
      dateJoined: formatDate(user.dateJoined),
      status: user.status,
    }));

    // Calculate pagination
    const total = allUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${month} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`;
  } catch (error) {
    return dateString; 
  }
};
