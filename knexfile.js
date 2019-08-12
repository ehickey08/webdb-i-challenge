const localPg = {
    host: 'localhost',
    user: 'postgres',
    password: '123456!',
    database: 'webdb-i-challenge',
};

const productionDBConnection = process.env.DATABASE_URL || localPg;

module.exports = {
    development: {
        client: 'pg',
        connection: localPg,
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds/',
        },
    },
    production: {
        client: 'pg',
        connection: productionDBConnection,
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds/',
        },
    },
};
