import { useEffect, useState } from "react";
import { getPosts } from '../services/api';
import { Link } from "react-router-dom";

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts()
            setPosts(data);
        }
        fetchPosts();
    }, [])

    return <div>
        <Link to="/" >Launcher</Link>
        <h1>Home Page</h1>
        {posts.map(post => (
            <div key={post._id}>
                <p>{post.content}</p>
            </div>
        ))}
    </div>
}

export default Home;