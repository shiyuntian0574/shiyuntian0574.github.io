function blogsSort(blogs) {
    blogs.sort((a,b) => {
        const keyA = new Date(a.date);
        const keyB = new Date(b.date);

        if (keyA > keyB) {
            return -1;
        } else {
            return 1;
        }
    });

    return blogs;
}

function getBlogs(callback) {
    const url = new URL(window.location)
    fetch(url.origin + '/blog/posts.json')
    .then((r) => {
        if (r.status === 200) {
            r.json().then((d) => {
                callback(d);
            })                            
        }
    })
    .catch((e) => {
        console.log("error", e);
    }); 
}

function createBlog(blog) {
    const blog_container = document.createElement('div');
    const title = document.createElement('p');
    const date = document.createElement('p');
    const content = document.createElement('p');
    const line_top = document.createElement('div');
    const line_bottom = document.createElement('div');

    blog_container.classList.add('blog-container');
    title.classList.add('title');
    date.classList.add('date');
    content.classList.add('content');
    line_top.classList.add('sep');
    line_bottom.classList.add('sep');


    title.innerHTML = blog.title;
    date.innerHTML = blog.date;
    content.innerHTML = blog.content;

    blog_container.appendChild(title);
    blog_container.appendChild(date);
    blog_container.appendChild(line_top);
    blog_container.appendChild(content);
    blog_container.appendChild(line_bottom);

    return blog_container;
}


function main() {
    window.addEventListener('load', ()=>{
        
        const page = document.querySelector('#site-page');
        getBlogs((d)=>{
            const blogs = blogsSort(d.posts);
            for (let i=0; i<blogs.length; i++) {
                page.appendChild(createBlog(blogs[i]));
            }
        });
    });
}

main();