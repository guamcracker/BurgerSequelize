$(document).ready(function () {
    // Click events for the "Burger Eaten", "Add to Menu", and delete buttons
    $(document).on("click", "button.eat", handleBurgerEaten)
    $(document).on("click", "button.menuize", handleMenuize)
    $(document).on("click", "button.delete", handlePostDelete)

    // Getting jQuery references to the post body
    var bodyInput = $("#body")
    var burgerContainer = $(".burger-container")
    var posts

    // Adding an event listener for when the form is submitted
    $("#burgers").on("submit", function handleFormSubmit(event) {
        event.preventDefault()
        // Condition: will not submit the post if we are missing a body 
        if (!bodyInput.val().trim()) {
            return
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            body: bodyInput.val().trim(),
            devoured: false
        }
        // Run submitPost to create a whole new post
        submitPost(newPost);
    })

    // Submits a new post and brings user to burger page upon completion
    function submitPost(Post) {
        $.post("/api/posts/", Post, function (data) {
            window.location.href = "/burgers"
        })
    }

    // Gets post data for a post if we're editing
    function getPostData(id) {
        $.get("/api/posts/" + id, function (data) {
            if (data) {
                // If this post exists, prefill our burger forms with its data
                bodyInput.val(data.body)
            }
        })
    }

    // Update a given post
    function updatePost(post) {
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
    }

    // This function grabs posts from the database 
    function getPosts() {
        $.get("/api/posts", function (data) {
            console.log("Posts", data)
            posts = data
            if (!posts || !posts.length) {
                displayEmpty()
            } else {
                initializeRows()
            }
        })
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
    }

    // InitializeRows handles appending all of our constructed post HTML inside
    function initializeRows() {
        burgerContainer.empty()
        var postsToAdd = []
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]))
        }
        burgerContainer.append(postsToAdd)
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var newPostPanel = $("<div>")
        newPostPanel.addClass("panel panel-default text-center")
        newPostPanel.css({
            border: "4px solid red",
            "border-radius": "10px",
            "font-size": "20px",
            "overflow": "auto"
        })
        var eatBtn = $("<button>")
        eatBtn.text("Eat me")
        eatBtn.addClass("eat btn btn-success")
        eatBtn.css({
            width: "50%"
        })
        var deleteBtn = $("<button>")
        deleteBtn.text("Delete")
        deleteBtn.addClass("delete btn btn-danger")
        deleteBtn.css({
            width: "50%"
        })
        var newPostDate = $("<small>")
        var newPostPanelBody = $("<div>")
        newPostPanelBody.addClass("panel-body")
        var newPostBody = $("<p>")
        newPostBody.text(post.id + ". " + post.body)
        newPostPanelBody.append(newPostBody)
        newPostPanel.append(newPostPanelBody)
        newPostPanel.data("post", post)
        newPostPanel.append(eatBtn)
        newPostPanel.append(deleteBtn)
        return newPostPanel
    }

    //This function handles when burger has been eaten and moves to "Eaten Burgers" column
    function handleBurgerEaten(currentPost) {
        var currentPost = $(this).parent()
        var postData = currentPost.data("post")
        console.log(postData)
        postData.devoured = true
        console.log("Devoured: " + postData.devoured)
        $('.devoured-container').append(currentPost)
        var currentBtn = $(this)
        currentBtn.text("Add to menu")
        currentBtn.removeClass("eat")
        currentBtn.addClass("menuize")
        currentPost.css({
            "text-decoration": "line-through"
        })
    }

    //This function handles moving the burger back to the "Burger Menu" column
    function handleMenuize(currentPost) {
        var currentPost = $(this).parent()
        var postData = currentPost.data("post")
        console.log(postData)
        postData.devoured = false
        console.log("Devoured: " + postData.devoured)
        burgerContainer.append(currentPost)
        var currentBtn = $(this)
        currentBtn.text("Eat me")
        currentBtn.removeClass("menuize")
        currentBtn.addClass("eat")
        currentPost.css({
            "text-decoration": ""
        })
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this).parent().data("post");
        var currentPanel = $(this).parent()
        $(".deleted-container").append(currentPanel)
        deletePost(currentPost.id);
    }

    // This function displays a messgae when there are no posts
    function displayEmpty() {
        burgerContainer.empty()
        var messageh2 = $("<h2>")
        messageh2.css({
            "text-align": "center",
            "margin-top": "50px"
        })
        messageh2.html("No burger posts yet, please create a new post.")
        $(".message").append(messageh2)
    }

    //Initialize
    getPosts()
})