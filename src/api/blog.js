import request from '@/helpers/request';

const URL = {
  GET_LIST: 'blog',
  GET_DETAIL: 'blog/:blogId',
  CREATE: 'blog',
  UPDATE: 'blog/:blogId',
  DELETE: 'blog/:blogId',
};

export default {
  getBlogs({ page = 1, userID, atIndex } = { page: 1 }) {
    return request(URL.GET_LIST, 'GET', { page, userID, atIndex });
  },

  getIndexBlogs({ page = 1 } = { page: 1 }) {
    return this.getBlogs({ page, atIndex: true });
  },

  getBlogsByUserId(userID, { page = 1, atIndex } = { page: 1 }) {
    return this.getBlogs({ userID, page, atIndex });
  },

  getDetail({ blogId }) {
    return request(URL.GET_LIST.replace(':blogId', blogId));
  },

  updateBlog({ blogId }, { title, content, description, atIndex }) {
    return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex });
  },

  deleteBlog({ blogId }) {
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE');
  },

  createBlog({ title = '', content = '', description = '', atINdex = false } = { title: '', content: '', description: '', atINdex: false }) {
    return request(URL.CREATE, 'POST', { title, content, description });
  },
};
