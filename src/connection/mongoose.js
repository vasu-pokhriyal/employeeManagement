import mongoose from "mongoose";
import constants from "../utils/constants";

// Mongoose setup with server
mongoose.connect(constants.BASE_MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
},(err) => {
    if(err) {
        console.log('Mongoose connection err', err);
    } else {
        console.log('database connected');
    }
});

export default mongoose;
