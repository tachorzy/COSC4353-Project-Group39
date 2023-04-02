import {Schema, model, models} from 'mongoose';

const clientSchema = new Schema({
    id: Number,
    email: String,
    password: String,
    profileSet: Boolean,
    personalDetails: [{
        address1: String,
        address2: String,
        state: String,
        city: String,
        zip: String,
    }]
})

const Client = models.Client || model('client', clientSchema);

export default Client;