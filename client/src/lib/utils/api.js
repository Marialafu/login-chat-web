const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/messages/';

export const saveBackUpMessages = async (body) => {
    
    try{
        const response = await fetch(URL_BASE + URL_API, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        
        })
        console.log(response);
        
        const messages = await response.json()
        console.log(messages);
        
        return messages

    } catch (error) {
        console.log(error);
    }
}