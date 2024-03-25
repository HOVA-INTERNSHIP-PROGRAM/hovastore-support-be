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
        },
        {
            name: "Categories",
            description: "Operations related to Categories entities",
        }
    ],
    paths: {
        "/api/v1/users": {
            get: {
                tags: ["Users"],
                summary: "Get All Users",
                description: "Get all users",
                responses: {
                    200: {
                        description: "All User Posts retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            post: {
                tags: ["Users"],
                summary: "Create User",
                description: "Create a new user",
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
        "/api/v1/users/auth": {
            post: {
                tags: ["Users"],
                summary: "User Login",
                description: "User login",
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
                    200: {
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
        "/api/v1/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Read User By ID",
                description: "Get a user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "User retrieved successfully",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            put: {
                tags: ["Users"],
                summary: "Update User",
                description: "Update an existing user",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
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
                        description: "User updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            delete: {
                tags: ["Users"],
                summary: "Delete User",
                description: "Delete a user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "User deleted successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },


        "/api/v1/categories": {
            get: {
                tags: ["Categories"],
                summary: "Get All Categories",
                description: "Get all Categories",
                responses: {
                    200: {
                        description: "All Categories are retrieved successfully",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            post: {
                tags: ["Categories"],
                summary: "Create Categories",
                description: "Create a new Categories",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    description: {
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
                        description: "New Category created successfully",
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
        "/api/v1/categories/{id}": {
            get: {
                tags: ["Categories"],
                summary: "Read Category By ID",
                description: "Get a Category by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Category retrieved successfully",
                    },
                    404: {
                        description: "Category not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            put: {
                tags: ["Categories"],
                summary: "Update Category",
                description: "Update an existing Category",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
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
                                    description: {
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
                        description: "Category updated successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Category not found",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
            delete: {
                tags: ["Categories"],
                summary: "Delete Category",
                description: "Delete a Category by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Category deleted successfully",
                    },
                    400: {
                        description: "Bad Request",
                    },
                    404: {
                        description: "Category not found",
                    },
                    500: {
                        description: "Internal Server Error",
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
            },
        },
    },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
