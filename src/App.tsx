import styles from "./app.module.css";
import LangSelector from "./components/lang_selector";
import QuestionsAnswers from "./components/questionsanswers/index";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QuestionsProvider, ResultsProvider } from "context/usecontext";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <QuestionsProvider>
          <ResultsProvider>
            <>
              <LangSelector />
              <QuestionsAnswers />
            </>
          </ResultsProvider>
        </QuestionsProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
