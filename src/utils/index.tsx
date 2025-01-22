import axios from 'axios';

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 可以根据你的需求更改为其它 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可在此处添加全局请求配置，例如 token 头部等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 返回整个响应对象，而不是只返回 response.data
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 获取 TODO 数据
export const getTodo = (id: any) => {
  return request.get(`/todos/${id}`);
};

// 创建新的 TODO
export const createTodo = (newTodo: any) => {
  return request.post('/todos', newTodo);
};

// 更新 TODO
export const updateTodo = (id: any, updatedTodo: any) => {
  return request.put(`/todos/${id}`, updatedTodo);
};

// 删除 TODO
export const deleteTodo = (id: any) => {
  return request.delete(`/todos/${id}`);
};

export default request;
