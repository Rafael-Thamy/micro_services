const env = process.env;

//if not found create an api secret
export const API_SECRET = env.API_SECRET ? env.API_SECRET: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlciI6eyJpZCI6MSwibmFtZSI6InVzZXIgdGVzdGUxIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20ifSwiaWF0IjoxNjgzNzU4MjMxLCJleHAiOjE2ODM4NDQ2MzF9.Lsy1bP3RBUSaQR9PH_1n0NAdZg7LPqcoyN6dpyBaIpQ"