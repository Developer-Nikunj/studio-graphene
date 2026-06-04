
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TasksClient from "./TasksClient"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TasksClient />
      </main>
      <Footer />
    </div>
  );
}
