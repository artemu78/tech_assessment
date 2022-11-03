import styles from "./app.module.css";
import LangSelector from "./components/lang_selector";
import QuestionsAnswers from "./components/questionsanswers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QuestionsProvider, ResultsProvider } from "hooks/usecontext";

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
