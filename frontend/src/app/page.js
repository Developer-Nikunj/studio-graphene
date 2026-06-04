//ssr for data

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TasksClient from "./TasksClient"
import {getTasks} from "../services/taskService"


export default async function Home() {
  const tasks = await getTasks(); 
  console.log("Tasks",tasks);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TasksClient allTasks={tasks.data}/>
      </main>
      <Footer />
    </div>
  );
}
