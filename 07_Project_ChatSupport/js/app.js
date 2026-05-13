class ChatSupport {
    constructor() {
        this.currentConversation = 1;
        this.messages = this.generateMockMessages();
        this.mockResponses = this.generateMockResponses();
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.scrollToBottom();
    }
    
    generateMockMessages() {
        return {
            1: [
                { id: 1, type: 'received', content: '您好！欢迎使用在线客服服务。我是客服小美，很高兴为您服务。', time: '10:00' },
                { id: 2, type: 'received', content: '请问有什么可以帮助您的？', time: '10:00' },
                { id: 3, type: 'sent', content: '你好，我想咨询一下产品的使用问题。', time: '10:01' },
                { id: 4, type: 'received', content: '当然可以！请问具体是哪个产品呢？我们有多种产品，我需要了解更多信息才能更好地帮助您。', time: '10:02' }
            ],
            2: [
                { id: 1, type: 'received', content: '您好，我是客服小王，很高兴为您服务！', time: '09:30' },
                { id: 2, type: 'sent', content: '你好', time: '09:31' }
            ],
            3: [
                { id: 1, type: 'received', content: '您好，我是客服小李，请问有什么问题？', time: '09:00' }
            ],
            4: [
                { id: 1, type: 'received', content: '您好，感谢您的咨询！', time: '昨天 14:30' },
                { id: 2, type: 'sent', content: '我的订单什么时候发货？', time: '昨天 14:30' },
                { id: 3, type: 'received', content: '您好，您的订单已安排发货，预计明天送达。', time: '昨天 14:32' }
            ]
        };
    }
    
    generateMockResponses() {
        return {
            greetings: [
                '您好！很高兴为您服务，请问有什么可以帮助您的？',
                '你好呀！请问需要我帮您做什么呢？',
                '嗨~ 欢迎咨询，请问有什么问题我可以帮您解答的？',
                '您好，请问有什么需求吗？',
                '您好！请问我能为您做些什么？'
            ],
            thanks: [
                '不客气，能帮到您是我的荣幸！',
                '不用谢，有问题随时找我哦~',
                '很高兴能为您服务！',
                '您太客气了，这是我应该做的。'
            ],
            apologies: [
                '非常抱歉给您带来了不便，我会尽力帮您解决。',
                '实在不好意思，让您遇到了这个问题。',
                '很抱歉给您造成困扰，我马上处理。',
                '对不起，给您添麻烦了，我来帮您解决。'
            ],
            confirmations: [
                '好的，我明白了，这就为您处理。',
                '收到，我来帮您解决这个问题。',
                '了解，我马上为您查询相关信息。',
                '好的，我会尽快为您处理。'
            ],
            questions: [
                '请问您能提供更多细节吗？这样我能更好地帮到您。',
                '为了更好地帮助您，方便告诉我更多信息吗？',
                '请问具体是哪方面的问题呢？',
                '能请您详细描述一下情况吗？'
            ],
            status: [
                '正在为您查询，请稍等片刻。',
                '我需要查询一下相关信息，请您耐心等待。',
                '正在处理中，请稍候。',
                '请给我一点时间，我来帮您确认。'
            ],
            general: [
                '好的，我来为您解答。',
                '请您详细描述一下问题，我会尽力帮助您。',
                '感谢您的耐心等待，我来帮您查询。',
                '请问还有其他问题吗？',
                '感谢您的反馈，我们会尽快处理。',
                '好的，我明白了，会尽快给您回复。',
                '没问题，我来帮您解决。',
                '您的问题我已经记录，会尽快处理。',
                '我理解您的需求，这就为您安排。',
                '好的，收到！我来处理。',
                '非常感谢您的咨询！',
                '有任何问题随时联系我哦~'
            ]
        };
    }
    
    getResponseForMessage(message) {
        const responses = this.generateMockResponses();
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('你好') || lowerMsg.includes('您好') || lowerMsg.includes('嗨') || lowerMsg.includes('哈喽')) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }
        
        if (lowerMsg.includes('谢谢') || lowerMsg.includes('感谢') || lowerMsg.includes('辛苦了')) {
            return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
        }
        
        if (lowerMsg.includes('抱歉') || lowerMsg.includes('不好意思') || lowerMsg.includes('麻烦')) {
            return responses.apologies[Math.floor(Math.random() * responses.apologies.length)];
        }
        
        if (lowerMsg.includes('好的') || lowerMsg.includes('可以') || lowerMsg.includes('行') || lowerMsg.includes('没问题')) {
            return responses.confirmations[Math.floor(Math.random() * responses.confirmations.length)];
        }
        
        if (lowerMsg.includes('什么') || lowerMsg.includes('怎么') || lowerMsg.includes('为什么') || lowerMsg.includes('哪') || lowerMsg.includes('谁')) {
            return responses.questions[Math.floor(Math.random() * responses.questions.length)];
        }
        
        if (lowerMsg.includes('查') || lowerMsg.includes('订单') || lowerMsg.includes('物流') || lowerMsg.includes('进度') || lowerMsg.includes('状态')) {
            return responses.status[Math.floor(Math.random() * responses.status.length)];
        }
        
        return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
    
    bindEvents() {
        const sendBtn = document.getElementById('send-btn');
        const messageInput = document.getElementById('message-input');
        const conversationItems = document.querySelectorAll('.conversation-item');
        const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
        
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
                this.switchConversation(parseInt(item.dataset.conversation));
            });
        });
        
        quickReplyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                messageInput.value = btn.textContent;
                this.sendMessage();
            });
        });
    }
    
    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        this.addMessage('sent', message, time);
        input.value = '';
        
        setTimeout(() => {
            this.simulateTyping();
        }, 500);
        
        setTimeout(() => {
            this.sendMockResponse(message);
        }, 1500 + Math.random() * 2000);
    }
    
    addMessage(type, content, time) {
        const container = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">${time}</div>
        `;
        
        container.appendChild(messageElement);
        this.scrollToBottom();
        
        if (!this.messages[this.currentConversation]) {
            this.messages[this.currentConversation] = [];
        }
        this.messages[this.currentConversation].push({
            id: Date.now(),
            type: type,
            content: content,
            time: time
        });
    }
    
    simulateTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const container = document.getElementById('message-container');
        const typingElement = document.createElement('div');
        typingElement.className = 'message received typing';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        container.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const container = document.getElementById('message-container');
        const typingElement = container.querySelector('.typing');
        if (typingElement) {
            typingElement.remove();
        }
        this.isTyping = false;
    }
    
    sendMockResponse(userMessage) {
        this.removeTypingIndicator();
        
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const response = this.getResponseForMessage(userMessage);
        
        this.addMessage('received', response, time);
    }
    
    switchConversation(conversationId) {
        this.currentConversation = conversationId;
        
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-conversation="${conversationId}"]`).classList.add('active');
        
        this.updateChatHeader(conversationId);
        this.renderMessages(conversationId);
    }
    
    updateChatHeader(conversationId) {
        const conversationInfo = {
            1: { name: '客服小美', status: 'online' },
            2: { name: '客服小王', status: 'online' },
            3: { name: '客服小李', status: 'online' },
            4: { name: '历史对话', status: 'offline' }
        };
        
        const info = conversationInfo[conversationId];
        document.querySelector('.chat-info h3').textContent = info.name;
        const statusText = document.querySelector('.status-text');
        
        if (info.status === 'online') {
            statusText.innerHTML = '<span class="online-dot"></span> 在线';
            statusText.style.color = '#27ae60';
        } else {
            statusText.innerHTML = '<span class="online-dot" style="background-color: #95a5a6;"></span> 离线';
            statusText.style.color = '#95a5a6';
        }
    }
    
    renderMessages(conversationId) {
        const container = document.getElementById('message-container');
        container.innerHTML = '';
        
        const conversationMessages = this.messages[conversationId] || [];
        conversationMessages.forEach(msg => {
            this.addMessage(msg.type, msg.content, msg.time);
        });
    }
    
    scrollToBottom() {
        const container = document.getElementById('message-container');
        container.scrollTop = container.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatSupport();
});