import 'dotenv/config';

export default {
    WEB_URL: process.env.WEB_URL || 'http://localhost:4000',
    HOST: process.env.HOST || "http://localhost:4000/",
    BASE_MONGO_URL: process.env.BASE_MONGO_URL || 'mongodb://127.0.0.1:27017/',
    BASE_DATABASE: 'Kona-Management',
    API_PORT: process.env.PORT || 3000,
    SALT: 28,
    JWT_PRIVATE_KEY: "RandoM private key",
    PER_PAGE_SIZE: 10,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY || "abcd"

}
