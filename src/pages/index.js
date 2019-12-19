import matter from 'gray-matter'

// components
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";

const Index = (props) => {
    return (
        <Layout
            pathname="/"
            siteTitle={props.title}
            siteDescription={props.description}>
            <section>
                <BlogList allBlogs={props.allBlogs}/>
            </section>
            
        </Layout>
    );
};

export default Index;

Index.getInitialProps = async function () {
    const siteConfig = await import (`../data/config.json`)
    //get posts & context from folder
    const posts = (context => {
        const keys = context.keys(); // this is the sorted 
        const values = keys.map(context);
        const data = keys.map((key, index) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\\/]/, "")
                .split(".")
                .slice(0, -1)
                .join("."); // remove hypens and dot
            const value = values[index]; 
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default);
            return {document, slug};
        });
        
        return data;
    })(require.context("../posts", true, /\.md$/));
      
    return {
        allBlogs: posts,
        ...siteConfig
    }
}