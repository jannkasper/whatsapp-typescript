import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 3001,
    protocol: process.env.PROTOCOL || 'http',
    db: {
        prod: process.env.DATABASE_URL || 'mongodb://localhost/whatsapp-clone',
        test: process.env.TEST_DATABASE_URL || 'mongodb://localhost/whatsapp-test-clone',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'development_secret',
        expiry: '7d'
    }
}

export default config
