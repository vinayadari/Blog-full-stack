1️⃣ User Controller (userController.js)

Handles all user-related actions:

register → create new user, hash password, send JWT/cookie

login → authenticate user, send JWT/cookie

getProfile → fetch user info (name, bio, location, etc.)

updateProfile → update user metadata (bio, website, profile picture, location)

logout → clear JWT cookie

2️⃣ Blog Controller (blogController.js)

Handles blog CRUD and feed:

createBlog → add new blog post

updateBlog → edit a blog (author only)

deleteBlog → delete a blog (author only)

getBlogById → fetch single blog with author, likes, comments

getUserBlogs → fetch all blogs by a specific user (dashboard)

getFeedBlogs → fetch recent blogs from all users, optionally paginated

3️⃣ Like Controller (likeController.js)

Handles blog likes:

toggleLike → add/remove like for a blog (per user)

getLikeCount → get total likes for a blog

Optional: getUserLikes → fetch all blogs a user liked

4️⃣ Comment Controller (commentController.js) — optional

If you implement comments:

addComment → add a comment to a blog

updateComment → edit a comment (author only)

deleteComment → remove a comment (author only)

getCommentsForBlog → fetch all comments for a blog, optionally with author details
