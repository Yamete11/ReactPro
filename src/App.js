import React, {useRef, useState, useMemo} from 'react'
import Counter from "./components/Counter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";

function App() {
    const [posts, setPosts] = useState([
        {id:1, title: 'a', body: 'c'},
        {id:2, title: 'b', body: 'b'},
        {id:3, title: 'c', body: 'a'}
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        if(filter.sort){
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <MyModal>
            <PostForm create={createPost}></PostForm>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
        <PostList remove={removePost}  posts={sortedAndSearchedPosts} title={'List about js'}/>
    </div>
  );
}

export default App;
