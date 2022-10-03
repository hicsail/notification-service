import {create_queue, delete_queue, get_queue_url, list_queue} from "./queue_controllers/index.js";
import {sendmessage, receivemessage} from "./message_controllers/index.js";


if(process.argv[2]=='receive'){
    receivemessage();
}else{
    sendmessage("Hello World");
}
