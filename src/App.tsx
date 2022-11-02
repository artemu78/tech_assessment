import styles from "./app.module.css";
import LangSelector from "./components/lang_selector";
import QuestionsAnswers from "./components/questionsanswers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QuestionsProvider } from "hooks/usecontext";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <LangSelector />
        <QuestionsProvider>
          <QuestionsAnswers />
        </QuestionsProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
