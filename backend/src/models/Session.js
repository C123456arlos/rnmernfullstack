import mongoose from 'mongoose'
const sessionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required:true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required:true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:null
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default:'active'
    },
    callId: {
        type: String,
        default:''
    }
}, {timestamps:true})
const Session = mongoose.model('Session', sessionSchema)
export default Session


    // "@clerk/clerk-react": "^5.61.9",
    // "@monaco-editor/react": "^4.7.0",
    // "@stream-io/video-react-sdk": "^1.24.0",
    // "@tailwindcss/vite": "^4.1.14",
    // "@tanstack/react-query": "^5.90.5",
    // "axios": "^1.12.2",
    // "canvas-confetti": "^1.9.3",
    // "date-fns": "^4.4.0",
    // "lucide-react": "^1.41.0",
    // "react": "^19.1.1",
    // "react-dom": "^19.1.1",
    // "react-hot-toast": "^2.6.0",
    // "react-resizable-panels": "^3.0.6",
    // "react-router": "^7.9.4",
    // "stream-chat": "^9.23.0",
    // "stream-chat-react": "^13.9.0",
    // "tailwindcss": "^4.1.14"