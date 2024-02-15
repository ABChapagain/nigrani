import { io } from "socket.io-client";

function App() {
   // const socket = io("https://server-socket-k10p.onrender.com/");

   useEffect(() => {
      socket.on("connect", () => {
         // This code will run when the component mounts in the browser.
         // const messageList = document.querySelector(".messageBox");
         // messageList.innerHTML += `<span>connected with ${socket.id}</span><br>`;
      });

      socket.on("receive-message", (message) => {
         console.log(message);
      });
   }, []);

   return <div className="App"></div>;
}

export default App;
