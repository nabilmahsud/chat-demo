export const authSwaggerSchema = {
  loginBody: {
    description: 'Login body',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'admin',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  },
  registerBody: {
    description: 'Register body',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'admin',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  },
};
