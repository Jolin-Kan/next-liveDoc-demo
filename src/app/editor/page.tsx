'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
        title="粗體"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
        title="斜體"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''}`}
        title="標題 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}`}
        title="標題 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
        title="無序列表"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
        title="有序列表"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-100' : ''}`}
        title="引用"
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('codeBlock') ? 'bg-gray-100' : ''}`}
        title="代碼塊"
      >
        <Code size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100"
        title="撤銷"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100"
        title="重做"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function EditorPage() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    onUpdate: ({ editor }) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'update',
          content: editor.getHTML()
        }));
      }
    }
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:1234');
    
    socket.onopen = () => {
      console.log('已連接到 WebSocket 服務器');
      setConnected(true);
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        
        if (data.type === 'update' && editor) {
          editor.commands.setContent(data.content);
        } else if (data.type === 'onlineUsers') {
          setOnlineUsers(data.count);
        }
      } catch (error) {
        console.error('處理消息時出錯:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket 連接已關閉');
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [editor]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">協作編輯器 Demo</h1>
      <div className="mb-2 flex gap-4">
        <div>連接狀態: {connected ? '已連接' : '未連接'}</div>
        <div>在線人數: {onlineUsers}</div>
      </div>
      <div className="border rounded-lg bg-white">
        <MenuBar editor={editor} />
        <div className="p-4 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}