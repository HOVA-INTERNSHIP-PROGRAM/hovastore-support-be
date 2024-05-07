import express from "express";
import { string } from "joi";
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
    },
    {
      name: "Articles",
      description: "Operations related to Category's Article entities",
    },
    {
      name: "Question",
      description: "Operations related to question entities",
    },
    {
      name: "Answers",
      description: "Operations related to answer entities",
    },
    {
      name: "Feedback",
      description: "Operations related to feedback entities",
    },
    {
      name: "Reply",
      description: "Operations related to reply entities",
    },
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
    "/api/v1/users/forgot-password": {
      post: {
        tags: ["Users"],
        summary: "Forgot Password",
        description: "Forgot Password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  email: {
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
            description: "Code to reset your password is sent to your email",
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
    "/api/v1/users/reset-password": {
      post: {
        tags: ["Users"],
        summary: "Reset Password",
        description: "Reset Password",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                  },
                  confirmPassword: {
                    type: "string",
                  },
                  code: {
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
            description:
              "Your Password changed!... you may now login with new password",
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
    "/api/v1/users/change-password/{id}": {
      post: {
        tags: ["Users"],
        summary: "Change Password",
        description: "Change Password",
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
                  current_password: {
                    type: "string",
                  },
                  new_password: {
                    type: "string",
                  },
                  confirm_password: {
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
            description:
              "Password Updated",
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
                  icon: {
                    type: "string",
                    format: "binary",
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
    "/api/v1/categories/{categoryId}": {
      get: {
        tags: ["Categories"],
        summary: "Read Category By ID",
        description: "Get a Category by ID",
        parameters: [
          {
            name: "categoryId",
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
            name: "categoryId",
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
                  icon: {
                    type: "string",
                    format: "binary",
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
            name: "categoryId",
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

    //Category's Articles
    "/api/v1/articles/{categoryId}/category": {
      post: {
        tags: ["Articles"],
        summary: "Create Article",
        description: "Category ID to create new Article",
        parameters: [
          {
            name: "categoryId",
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
                  title: {
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
            description: "Article added",
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
    "/api/v1/articles/{categoryId}/category/viewArticles": {
      get: {
        tags: ["Articles"],
        summary: "Read all category's articles",
        description: "Enter category ID to view all articles.",
        parameters: [
          {
            name: "categoryId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Articles retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/articles/{articleId}": {
      get: {
        tags: ["Articles"],
        summary: "Read article by ID",
        description: "Enter ID to view article details.",
        parameters: [
          {
            name: "articleId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Article retrieved",
          },
          404: {
            description: "Article not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Articles"],
        summary: "Update Article",
        description: "Article ID to update",
        parameters: [
          {
            name: "articleId",
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
                  title: {
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
            description: "Article updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Article not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Articles"],
        summary: "Delete Articles",
        description: "Article ID to be deleted",
        parameters: [
          {
            name: "articleId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Article deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Article not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    //Question side
    "/api/v1/questions/{articleId}/article": {
      post: {
        tags: ["Question"],
        summary: "Create Question",
        description: "Article ID to create a new Question",
        parameters: [
          {
            name: "articleId",
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
                  question: {
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
            description: "Question added",
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
    "/api/v1/questions": {
      get: {
        tags: ["Question"],
        summary: "Get all Questions for article you want",
        description: "View all questions",
        responses: {
          200: {
            description: "Question retrieved",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/questions/{questionId}": {
      get: {
        tags: ["Question"],
        summary: "Read Question by ID",
        description: "Enter ID to view question details.",
        parameters: [
          {
            name: "questionId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Question retrieved",
          },
          404: {
            description: "Question not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Question"],
        summary: "Update Question",
        description: "Question ID to update question",
        parameters: [
          {
            name: "questionId",
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
                  question: {
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
            description: "Question updated",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Question not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Question"],
        summary: "Delete Question",
        description: "Question ID to be deleted",
        parameters: [
          {
            name: "questionId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Question deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Question not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // add likes to question
    "/api/v1/questions/like/{questionId}": {
      post: {
        tags: ["Question"],
        summary: "Like Question by ID",
        description: "Enter ID to like how question is being answered.",
        parameters: [
          {
            name: "questionId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Your like added",
          },
          404: {
            description: "Question not found",
          },
          500: {
            description: "Failed to like question",
          },
        },
      },
    },
    // Answer Documentation
    "/api/v1/answers": {
      get: {
        tags: ["Answers"],
        summary: "Get All Answers",
        description: "Get all answers",
        responses: {
          200: {
            description: "All Answers to a question are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/answers/{questionId}/question": {
      post: {
        tags: ["Answers"],
        summary: "Create Answer",
        description: "Create a new answer by entering question ID",
        parameters: [
          {
            name: "questionId",
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
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New Answer created successfully",
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
    "/api/v1/answers/{answerId}": {
      put: {
        tags: ["Answers"],
        summary: "Update Answer",
        description: "Enter answer ID to update",
        parameters: [
          {
            name: "answerId",
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
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Answer Updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Answers"],
        summary: "Delete Answer",
        description: "Answer ID to be deleted",
        parameters: [
          {
            name: "answerId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Answer deleted",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Answer not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Feedback Documentation
    "/api/v1/feedbacks/{questionId}/question": {
      post: {
        tags: ["Feedback"],
        summary: "Create Feedback",
        description: "Create New Feedback",
        parameters: [
          {
            name: "questionId",
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
                  names: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  feedback: {
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
            description: "Feedback Added",
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
    "/api/v1/feedbacks": {
      get: {
        tags: ["Feedback"],
        summary: "Get All Feedbacks",
        description: "Get all Feedbacks",
        responses: {
          200: {
            description: "All Feedbacks are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/feedbacks/{id}": {
      get: {
        tags: ["Feedback"],
        summary: "Get Feedback by ID",
        description: "Get Feedback by ID",
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
            description: "Feedback Retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Feedback"],
        summary: "Delete Feedback by ID",
        description: "Delete Feedback by ID",
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
            description: "Feedback Deleted",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
      "/api/v1/replies": {
        get: {
          tags: ["Reply"],
          summary: "Retrieve All Replies",
          description: "Retrieve All Replies",
          responses: {
            200: {
              description: "All Replies are retrieved successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/v1/replies/{feedbackId}/feedback": {
        post: {
          tags: ["Reply"],
          summary: "Create Reply",
          description: "Create Reply",
          parameters: [
            {
              name: "feedbackId",
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
                    message: {
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
              description: "Reply Added",
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
      "/api/v1/replies/{id}": {
        get: {
          tags: ["Reply"],
          summary: "Retrieve Reply by ID",
          description: "Retrieve Reply by ID",
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
              description: "A Reply is retrieved successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        put: {
          tags: ["Reply"],
          summary: "Update Reply",
          description: "Update Reply",
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
                    message: {
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
              description: "Reply Update",
            },
            400: {
              description: "Bad Request",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
        delete: {
          tags: ["Reply"],
          summary: "Delete Reply by ID",
          description: "Delete Reply by ID",
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
              description: "Reply Deleted",
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
        in: "header",
        name: "Authorization",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
