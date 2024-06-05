const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendBtn = document.getElementById('send-btn');
const historyList = document.getElementById('history-list');

// Base URL of your API
const apiUrl = 'http://localhost:3000/api/chatbot/messages';

sendBtn.addEventListener('click', sendMessage);
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = inputBox.value.trim();
    if (message !== '') {
        // Kirim pesan ke server API
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (response.ok) {
                const responseData = await response.json();
                const newMessage = document.createElement('div');
                newMessage.textContent = 'User: ' + responseData.message;
                chatBox.appendChild(newMessage);
                addToHistory(responseData.message);
            } else {
                console.error('Gagal mengirim pesan ke server.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Bersihkan kotak input setelah mengirim pesan
        inputBox.value = '';
    }
}

// Function to add a message to history
function addToHistory(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    historyList.appendChild(listItem);
}

// Example for loading history
historyList.addEventListener('click', (event) => {
    const clickedItem = event.target;
    if (clickedItem.tagName === 'LI') {
        const selectedChat = clickedItem.textContent;
        inputBox.value = selectedChat; // Populate input with selected chat
    }
});
