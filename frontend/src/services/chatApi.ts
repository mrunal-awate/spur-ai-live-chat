const API_URL = "https://spur-ai-live-chat-kz9q.onrender.com/chat/message";     // backend API URL

export async function sendMessage(                                              // function to send message to backend
  message: string,
  sessionId?: string | null                                        // optional sessionId parameter    
) {                                                             // send message to backend API and return response
  const res = await fetch(API_URL, {                                      // fetch API to send message                  
    method: "POST",
    headers: {
      "Content-Type": "application/json",                 // set content type to JSON
    },
    body: JSON.stringify({ message, sessionId }),        // send message and sessionId in body        
  });                                                     // check if response is ok

  if (!res.ok) {
    throw new Error("Failed to send message");              // throw error if response is not ok        
  }

  return res.json();                               // return response as JSON 
}
