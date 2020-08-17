const production = process.env.NODE_ENV === "production";
export const baseUrl = production ? 'https://lol-finder-back.herokuapp.com' : 'http://localhost:8080';