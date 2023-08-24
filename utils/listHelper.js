const dummy = (blogs) => {
    let blogList = blogs;
    return 1;
  }
const totalLikes = (blogs) => {
    let reducer = (sum,addition) => {
        return sum + addition.likes;
    }
    if(Array.isArray(blogs)){
        let total = blogs.reduce(reducer,0);
        return total;
    }   
    else{
        throw new Error("blog must be of type 'array'");
        return;
    }
}
const favouriteBlog = (blogs) => {
    let reducer = (current,nextChecked) => {
        return current.likes > nextChecked.likes ? current : nextChecked
    }
    let fav = blogs.reduce(reducer,{});
    return fav;
}
  
  module.exports = {
    dummy, totalLikes, favouriteBlog
  }