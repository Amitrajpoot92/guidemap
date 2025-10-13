//  import React, { useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// const loadingPhrases = [
//   "Charting your career course...",
//   "Crafting a path to success...",
//   "Unlocking career insights...",
//   "Aligning your professional stars...",
//   "Mapping your future...",
// ];

// function loadSessions() {
//   try {
//     const raw = localStorage.getItem("careerist_sessions");
//     if (!raw) return [];
//     const parsed = JSON.parse(raw);
//     if (!Array.isArray(parsed)) return [];
//     return parsed.filter(
//       (s) =>
//         s &&
//         typeof s.id === "string" &&
//         typeof s.title === "string" &&
//         Array.isArray(s.messages)
//     );
//   } catch {
//     localStorage.removeItem("careerist_sessions");
//     return [];
//   }
// }

// function saveSessions(sessions) {
//   localStorage.setItem("careerist_sessions", JSON.stringify(sessions));
// }

// export default function ChattApp({
//   backendUrl = import.meta.env.VITE_BACKEND_URL || "https://career-advisor-chatbot-5ifz.onrender.com",
// }) {
//   const [sessions, setSessions] = useState(loadSessions());
//   const [currentSession, setCurrentSession] = useState(
//     sessions.length > 0 ? sessions[0].id : null
//   );
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const containerRef = useRef(null);
//   const textareaRef = useRef(null);

//   const currentMessages =
//     sessions.find((s) => s.id === currentSession)?.messages || [];

//   const setCurrentMessages = (msgs) => {
//     if (!currentSession) return;
//     setSessions((prev) => {
//       const updated = prev.map((s) =>
//         s.id === currentSession ? { ...s, messages: msgs } : s
//       );
//       saveSessions(updated);
//       return updated;
//     });
//   };

//   // Scroll to top on initial render
//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0;
//     }
//   }, []);

//   // Scroll to bottom only when new messages are added
//   useEffect(() => {
//     if (currentMessages.length > 0) {
//       containerRef.current?.scrollTo({
//         top: containerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [currentMessages]);

//   useEffect(() => {
//     if (!currentSession) return;
//     const loadHistory = async () => {
//       try {
//         const res = await fetch(`${backendUrl}/history?session_id=${currentSession}`);
//         const data = await res.json();
//         if (data.chat_history && Array.isArray(data.chat_history)) {
//           setSessions((prev) =>
//             prev.map((s) =>
//               s.id === currentSession
//                 ? { ...s, messages: data.chat_history }
//                 : s
//             )
//           );
//         }
//       } catch (err) {
//         console.error("Error loading chat history:", err);
//       }
//     };
//     loadHistory();
//   }, [currentSession]);

//   useEffect(() => {
//     if (loading) {
//       const interval = setInterval(() => {
//         setLoadingPhrase(
//           (prevPhrase) =>
//             loadingPhrases[
//               (loadingPhrases.indexOf(prevPhrase) + 1) % loadingPhrases.length
//             ]
//         );
//       }, 1500);
//       return () => clearInterval(interval);
//     }
//   }, [loading]);

//   const sendMessage = async (e, sampleQuery = null) => {
//     if (e) e.preventDefault();
//     const messageToSend = sampleQuery || query;
//     if (!messageToSend.trim()) return;

//     let activeSession = currentSession;

//     if (!activeSession) {
//       const newSession = {
//         id:
//           "sess_" +
//           Date.now().toString(36) +
//           Math.random().toString(36).slice(2, 10),
//         title: "New Chat",
//         messages: [],
//       };
//       activeSession = newSession.id;
//       setSessions((prev) => {
//         const updated = [newSession, ...prev];
//         saveSessions(updated);
//         return updated;
//       });
//       setCurrentSession(newSession.id);
//     }

//     const userMsg = { role: "human", content: messageToSend };

//     setSessions((prev) => {
//       const updated = prev.map((s) => {
//         if (s.id === activeSession) {
//           const newTitle = s.title === "New Chat" ? messageToSend.slice(0, 50) : s.title;
//           return { ...s, title: newTitle, messages: [...s.messages, userMsg] };
//         }
//         return s;
//       });
//       saveSessions(updated);
//       return updated;
//     });

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("query", messageToSend);
//       formData.append("session_id", activeSession);

//       const res = await fetch(`${backendUrl}/ask`, {
//         method: "POST",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Backend error");
//       const data = await res.json();

//       const aiMsg = { role: "ai", content: data.answer || "(no answer)" };

//       setSessions((prev) => {
//         const updated = prev.map((s) => {
//           if (s.id === activeSession) {
//             return {
//               ...s,
//               messages: [...s.messages, aiMsg],
//             };
//           }
//           return s;
//         });
//         saveSessions(updated);
//         return updated;
//       });
//     } catch (err) {
//       console.error(err);
//       setSessions((prev) => {
//         const updated = prev.map((s) =>
//           s.id === activeSession
//             ? { ...s, messages: [...s.messages, { role: "ai", content: "⚠️ Error contacting backend." }] }
//             : s
//         );
//         saveSessions(updated);
//         return updated;
//       });
//     }

//     setQuery("");
//     setLoading(false);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "52px";
//     }
//   };

//   const clearChats = () => {
//     localStorage.removeItem("careerist_sessions");
//     setSessions([]);
//     setCurrentSession(null);
//   };

//   const removeSession = (id) => {
//     const updated = sessions.filter((s) => s.id !== id);
//     saveSessions(updated);
//     setSessions(updated);
//     if (currentSession === id) {
//       setCurrentSession(updated.length ? updated[0].id : null);
//     }
//   };

//   const handleSampleQueryClick = (sampleQuery) => {
//     setQuery(sampleQuery);
//     sendMessage(null, sampleQuery);
//   };

//   return (
//     <div className="w-screen h-screen flex overflow-hidden bg-[#0f0425] text-white">
//       {/* Sidebar */}
//       <aside className={`bg-[#1a103d] border-r border-purple-800 flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64 flex'}`}>
//         <div className="p-3 font-semibold border-b border-purple-700 bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex justify-between items-center">
//           {!isSidebarCollapsed && <span>Chats</span>}
//           <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1 rounded hover:bg-purple-600">
//             {isSidebarCollapsed ? "➡️" : "⬅️"}
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-2 space-y-1">
//           {sessions
//             .filter((s) => s && (s.title !== "New Chat" || s.messages.length > 0))
//             .map((s) => (
//               <div
//                 key={s.id}
//                 className={`flex items-center justify-between p-2 rounded cursor-pointer truncate ${
//                   s.id === currentSession
//                     ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
//                     : "hover:bg-[#2a1b56] text-gray-300"
//                 }`}
//               >
//                 <div
//                   onClick={() => setCurrentSession(s.id)}
//                   className="flex-1 truncate"
//                 >
//                   {!isSidebarCollapsed && s.title}
//                 </div>
//                 {!isSidebarCollapsed && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeSession(s.id);
//                     }}
//                     className="ml-2 text-gray-400 hover:text-red-500 text-xs"
//                     title="Delete Chat"
//                   >
//                     ✖
//                   </button>
//                 )}
//               </div>
//             ))}
//         </div>
//         <div className="p-2 space-y-2">
//           {!isSidebarCollapsed && (
//             <button
//               onClick={() => {
//                 const newSession = {
//                   id: "sess_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10),
//                   title: "New Chat",
//                   messages: [],
//                 };
//                 setSessions((prev) => {
//                   const updated = [newSession, ...prev];
//                   saveSessions(updated);
//                   return updated;
//                 });
//                 setCurrentSession(newSession.id);
//               }}
//               className="w-full px-3 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform"
//             >
//               + New Chat
//             </button>
//           )}
//           {!isSidebarCollapsed && (
//             <button
//               onClick={clearChats}
//               className="w-full px-3 py-2 bg-gray-600 hover:bg-red-600 rounded-lg"
//             >
//               Clear Chats
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* Chat main */}
//       <div className="flex-1 flex flex-col">
//         <header className="bg-gradient-to-r from-indigo-500 to-pink-500 p-4 text-white shadow-lg">
//           <div className="max-w-4xl mx-auto flex items-center justify-between">
//             <div className="text-xl font-bold">Careerist — AI Career Roadmap Advisor</div>
//           </div>
//         </header>

//         <main ref={containerRef} className="flex-1 p-4 flex flex-col overflow-auto chat-container">
//           <div className="flex-1 p-6 bg-[#1a103d] rounded-2xl shadow-lg">
//             {currentMessages.length === 0 && (
//               <div className="text-center text-gray-400 py-12">
//                 <div className="text-lg font-semibold mb-2">
//                   Your Buddy for Career Roadmap Guidance
//                 </div>
//                 <div className="text-sm text-pink-400 font-bold">
//                   Powered by Gemini 2.5-Flash
//                 </div>
//                 <div className="text-sm mt-2">
//                   Ask about jobs, careers, skills & more 🚀
//                 </div>
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
//                   <button onClick={() => handleSampleQueryClick("What are the key skills for an AI Engineer?")} className="bg-[#2a1b56] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-4 rounded-xl transition-colors">
//                     What are the key skills for an AI Engineer?
//                   </button>
//                   <button onClick={() => handleSampleQueryClick("How can I prepare for a software engineering interview?")} className="bg-[#2a1b56] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-4 rounded-xl transition-colors">
//                     How can I prepare for a software engineering interview?
//                   </button>
//                   <button onClick={() => handleSampleQueryClick("Provide a detailed roadmap for a successful entrepreneur.")} className="bg-[#2a1b56] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-4 rounded-xl transition-colors">
//                     Provide a detailed roadmap for a successful entrepreneur.
//                   </button>
//                   <button onClick={() => handleSampleQueryClick("How can i became a software engineer.")} className="bg-[#2a1b56] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-4 rounded-xl transition-colors">
//                     How can I become a software engineer?
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-4">
//               {currentMessages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${m.role === "human" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed whitespace-normal ${
//                       m.role === "human"
//                         ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-br-none"
//                         : "bg-[#2a1b56] text-gray-200 rounded-bl-none"
//                     }`}
//                   >
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       rehypePlugins={[rehypeRaw]}
//                       components={{
//                         h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3 text-pink-400" {...props} />,
//                         h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-2 text-indigo-400" {...props} />,
//                         h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-1 text-purple-300" {...props} />,
//                         ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-1" {...props} />,
//                         ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-1" {...props} />,
//                         li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
//                         strong: ({ node, ...props }) => <strong className="text-pink-300 font-semibold" {...props} />,
//                         a: ({ node, ...props }) => <a className="text-blue-400 underline hover:text-blue-300" target="_blank" {...props} />,
//                         code: ({ node, ...props }) => <code className="bg-black/40 px-1 py-0.5 rounded text-pink-200 font-mono text-sm" {...props} />,
//                       }}
//                     >
//                       {m.content}
//                     </ReactMarkdown>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Input box */}
//           <form
//             onSubmit={sendMessage}
//             className="mt-3 p-2 bg-[#1a103d] rounded-xl shadow-md flex items-end gap-2"
//           >
//             <textarea
//               ref={textareaRef}
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 e.target.style.height = "52px";
//                 e.target.style.height = e.target.scrollHeight + "px";
//               }}
//               placeholder={loading ? loadingPhrase : "Type your question..."}
//               className="flex-1 px-4 py-2 rounded-xl bg-[#2a1b56] border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none overflow-hidden leading-relaxed"
//               rows={1}
//               style={{ minHeight: "52px", maxHeight: "200px" }}
//             />

//             <button
//               type="submit"
//               disabled={loading || !query.trim()}
//               className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-60"
//             >
//               {loading ? "..." : "Send"}
//             </button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// }
