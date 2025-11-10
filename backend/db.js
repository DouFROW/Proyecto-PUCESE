import mysql from 'mysql2/promise';

export const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307, // cuando corres fuera de Docker
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpassword',
    database: process.env.DB_NAME || 'my_database',
  });

  console.log('✅ Conectado correctamente a MySQL');
  return connection;
};
