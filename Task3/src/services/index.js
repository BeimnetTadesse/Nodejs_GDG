const users = []; // In-memory user storage
const posts = []; // In-memory post storage

// User management
export const addUser = (user) => users.push(user);
export const findUser = (email) => users.find((user) => user.email === email);
export const findUserByRole = (email) => users.find((user) => user.email === email);

// Post management
export const addPost = (post) => posts.push(post);
export const getPosts = (filters = {}) => {
    let filteredPosts = posts;

    if (filters.category) {
        filteredPosts = filteredPosts.filter(post => post.category === filters.category);
    }
    if (filters.author) {
        filteredPosts = filteredPosts.filter(post => post.author === filters.author);
    }
    if (filters.date) {
        filteredPosts = filteredPosts.filter(post => post.date === filters.date);
    }
    if (filters.tags) {
        filteredPosts = filteredPosts.filter(post => post.tags.includes(filters.tags));
    }
    return filteredPosts;
};
export const approvePost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (post) post.approved = true;
};
export const deletePost = (postId) => {
    const index = posts.findIndex((p) => p.id === postId);
    if (index !== -1) posts.splice(index, 1);
};
