const dev = {
  baseUrl: 'http://localhost:3001'
};

const prod = {
  baseUrl: ''
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export { config };
