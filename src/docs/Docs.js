import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();


const options = {
    openapi: "3.0.1",
    info: {
        title: "Hova Ai API",
        version: "1.0.0",
        description: "Documentation for Hova Ai Support API.",
    },
    basePath: "/",
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [
        {
            name: "Users",
            description: "Operations related to Users entities",
        }
    ],
    paths: {
        "/api/user/create": {
            post: {
                tags: ["Users"],
                summary: "Create User",
                description: "Create a new user",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    img: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: "New user created successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/auth": {
            post: {
                tags: ["Users"],
                summary: "User Login",
                description: "User Login ",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    201: {
                        description: "User was logged in successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/auth/logout": {
            post: {
                tags: ["Logout"],
                description: "logging out a user",
                summary: "logging out a user",
                security: [
                    {
                        bearerAuth: [], 
                    },
                ],
                parameters: [],
                required: true,
                responses: {
                    200: {
                        description: "User successfully logged out",
                    },
                    401: {
                        description: "Unauthorized: User not logged in",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/read": {
            get: {
                tags: ["Users"],
                summary: "Get All Users",
                description: "Get all User posts",
                security: [
                    {
                        bearerAuth: [], 
                    },
                ],
                responses: {
                    200: {
                        description: "All User Posts retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/read/{id}": {
            get: {
                tags: ["Users"],
                summary: "Read User By ID",
                description: "Get a User post by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the User",
                        schema: {
                            type: "string",
                            pattern: "^[0-9a-fA-F]{24}$",
                        },
                    },
                ],
                security: [
                    {
                        bearerAuth: [], 
                    },
                ],
                responses: {
                    200: {
                        description: "User Post retrieved successfully",
                    },
                    404: {
                        description: "User Post not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/update/{id}": {
            put: {
                tags: ["Users"],
                summary: "Update an existing User",
                description: "Update User",
                security: [
                    {
                        bearerAuth: [], 
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID of the User",
                        schema: {
                            type: "string",
                            pattern: "^[0-9a-fA-F]{24}$",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    img: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    200: {
                        description: "User Applicant was updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/user/delete/{id}": {
            delete: {
                tags: ["Users"],
                summary: "Delete a user post",
                description: "Delete an existing user post by its ID.",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                            pattern: "^[0-9a-fA-F]{24}$",
                        },
                        description: "Unique identifier of the user post to be deleted",
                    },
                ],
                responses: {
                    200: {
                        description: "user post deleted successfully",
                    },
                    400: {
                        description: "Bad request",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    404: {
                        description: "Blog post not found",
                    },
                    500: {
                        description: "Internal server error",
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                in: "header",
                name: "Authorization",
            },
        },
    },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
