// IMPORT MODEL
const express = require('express');
const Post = require('../models/postModel');
const comment = require('../models/commentModel');

// Business Logic
createComment = async (req, resp) => {
    try{
        // fetch data from request body
        const {post, user, body} = req.body;
        // create a new comment
        const newComment = new comment({
            post,
            user,
            body
        });
        // create a new comment in the database
        const createComment = await newComment.create();
        // send response
        resp.status(200).json({
            status: 'success',
            message: 'Comment created successfully',
            data: {
                comment: createComment
            }
        });

        // Handle errors

    }
    catch (error) {
        resp.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}