import {app} from "./app.js";
import { ConnectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();
const PORT=process.env.PORT;

ConnectDB()
.then(()=>{
    app.on("error",()=>{
        console.log(`Error in database connection ${error}`);
    })

    app.listen(PORT ||8000,()=>{
        console.log(`App is live on http://localhost:${PORT}`);
    })

})
.catch((error)=>{
    console.error(`Error in database connection ${error} `);
})