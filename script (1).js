
import { LRUChatClass} from './LRUChatClass.js';

// onload = function () {

    const chatlist = document.getElementById('chat-list');

    const newMsg = document.getElementById('add-message');
    const deleteMsg = document.getElementById('delete-message');
    const text = document.getElementById('temptext');
    const templates = document.getElementsByTagName('template')[0];
    const chat_item = templates.content.querySelector("li");
    const LRUClass = new LRUChatClass(chat_item, chatlist);
    let chats = [];

    newMsg.onclick = function () {
        const newMsgUser = document.getElementById('recName').value.toLowerCase();
    const newMsgText = document.getElementById('recMsg').value;
        let idOfMsg ;
        if((newMsgUser in LRUClass.hashmap2 ) === false)
        {
            console.log(newMsgText);
            console.log(newMsgUser);
            var i = 0;
            for(i=0;i<300;i++)
            {
                if((i in LRUClass.checkIdMap ) === false)
                {
                    LRUClass.checkIdMap[i] = 'true';
                    LRUClass.hashmap2[newMsgUser] = i;
                    idOfMsg = i;
                    break;
                }
            }
            if(i===300)
            {
                return alert("Total Message limit exceeded please delete some messages");
            }
        }
        else{
            idOfMsg = LRUClass.hashmap2[newMsgUser];
        }
        if(chats.includes(idOfMsg)===false){
            chats.push(idOfMsg);
        }
        LRUClass.newMsg(idOfMsg, newMsgUser , newMsgText);
        text.innerHTML = "New message from "+ newMsgUser + "<br>" + text.innerHTML;
        document.getElementById('recName').value = "";
        document.getElementById('recMsg').value = "";

    }

    deleteMsg.onclick = function () {
        const deleteMsgUser = document.getElementById('delName').value.toLowerCase();
        document.getElementById('delName').value = "";
        if((deleteMsgUser in LRUClass.hashmap2) === false)
        {
            return alert(`${deleteMsgUser} Does Not Exist!!!`);
        }
        else
        {
            let idToDelete = LRUClass.hashmap2[deleteMsgUser];
            delete LRUClass.hashmap2[deleteMsgUser];
            delete LRUClass.checkIdMap[idToDelete];
            LRUClass.deleteMsg(idToDelete);
            text.innerHTML = "Deleted message from "+ deleteMsgUser + "<br>" + text.innerHTML;
                chats.splice(index, 1);
        }
        
    };
// };