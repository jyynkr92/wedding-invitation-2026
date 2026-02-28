import { useEffect, useState, useRef } from 'react';
import { supabase, type GuestbookMessage } from '../../lib/supabase';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

const MessageContent = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guest_book')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('방명록 데이터를 가져오는 중 오류가 발생했습니다:', error);
    } else {
      console.log(data);
      setMessages(data || []);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to new message inserts using Realtime
    const channel = supabase
      .channel('guestbook_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guest_book' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as GuestbookMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('guest_book')
      .insert([{ name: name.trim(), content: content.trim() }]);
    fetchMessages();
    setIsSubmitting(false);

    if (error) {
      console.error('메시지 전송 오류:', error);
      alert('메시지 전송에 실패했습니다.');
    } else {
      setContent(''); // Clear the message input, but keep the name for consecutive messages
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce(
    (acc, msg) => {
      const dateObj = new Date(msg.created_at);
      const dateStr = dateObj.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(msg);
      return acc;
    },
    {} as Record<string, typeof messages>,
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      <motion.h2
        className="carattere-regular text-5xl text-gray-800 mt-1 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Messages
      </motion.h2>
      <div className="flex-1 flex flex-col h-full bg-[#f4f4f4]/70 rounded-lg w-full max-w-full mx-auto overflow-hidden text-sm relative">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pt-6">
          <p className="text-center text-xs text-gray-400">방명록에 축하 메시지를 남겨주세요!</p>

          {Object.entries(groupedMessages).map(([dateLabel, msgs], groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              {/* Date Separator like iOS */}
              <div className="flex justify-center mt-2 mb-2">
                <span className="text-[11px] font-medium text-gray-500">{dateLabel}</span>
              </div>

              {msgs.map((msg, idx) => (
                <div key={msg.id || idx} className="flex flex-col items-start w-full">
                  <span className="text-xs text-gray-500 ml-2 mb-1.5">{msg.name}</span>
                  <div className="flex items-end gap-1.5">
                    <div className="bg-[#e9e9eb] px-3.5 py-2.5 text-black text-[15px] leading-relaxed rounded-[20px] rounded-bl-[4px] max-w-[250px] sm:max-w-[280px] shadow-sm wrap-break-word whitespace-pre-wrap">
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1.5 shrink-0">
                      {new Date(msg.created_at).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* Empty div for auto-scrolling to bottom */}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area (Liquid Glass Style) */}
        <div className="px-3 py-3 w-full shrink-0 rounded-b-lg relative z-10 pb-safe sm:pb-3 bg-white/20 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="px-3 py-2 text-xs bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white/80 rounded-xl w-24 shadow-[0_4px_30px_rgba(0,0,0,0.05)] outline-none transition-all placeholder:text-gray-500"
              maxLength={10}
              required
              autoComplete="off"
            />
            <div className="flex items-start gap-2">
              <textarea
                placeholder="축하 메시지를 남겨주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
                rows={1}
                className="flex-1 px-3 py-2 text-xs bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] outline-none focus:border-white/80 focus:bg-white/70 focus:ring-1 focus:ring-white/80 transition-all placeholder:text-gray-500 resize-none min-h-[36px] max-h-[84px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full leading-4"
                required
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  if (target.value === '') {
                    target.style.height = 'auto';
                  } else {
                    target.style.height = '0px';
                    target.style.height = `${target.scrollHeight}px`;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (name.trim() && content.trim()) {
                      handleSubmit(e);

                      // Reset height after submit
                      const target = e.target as HTMLTextAreaElement;
                      setTimeout(() => {
                        target.style.height = 'auto';
                      }, 0);
                    }
                  }
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !content.trim()}
                className="w-[36px] h-[36px] flex items-center justify-center bg-green-500/90 hover:bg-green-500 text-white rounded-full shrink-0 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
                aria-label="Send message"
              >
                <Send size={16} className="translate-x-px" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
