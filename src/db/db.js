import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://rechleandroluis1:sebaquerido@futsal.n8iawow.mongodb.net/ecommerce?retryWrites=true&w=majority';

    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.log(error);
    }
