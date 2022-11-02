import { Langs, IQuestion, EMode } from "hooks/types";

const QUESTION_PREFIX = "####";
const ANSWER_PREFIX = "- [";

export const getCookie = (cname: string): string => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function setCookie(cname: string, cvalue: Langs, exdays: number | null = null): void {
  let expires = "";
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function parseQuestionLine(line: string): string {
  const parsedArray = line.match(/([q,Q]\d+\.\s)(.*)/);
  if (parsedArray && parsedArray.length === 3) {
    return parsedArray[2];
  }
  return line;
}

function parseAnswerLine(line: string): string {
  const parsedArray = line.split("] ");
  if (parsedArray && parsedArray.length === 2) {
    return parsedArray[1];
  }
  return line;
}

export function parseRawMDFile(lines: string): IQuestion[] {
  const linesArr = lines.split("\n");
  const quiz: IQuestion[] = [];
  let quizItem: IQuestion | null = null;
  let mode = EMode.question;

  linesArr.forEach((rawline) => {
    const line = rawline.trim();
    const isQuestions = (line: string): boolean => line.substring(0, 4) === QUESTION_PREFIX;
    const isAnswer = (line: string): boolean => line.substring(0, 3) === ANSWER_PREFIX;

    if (isQuestions(line)) {
      quizItem && quiz.push(quizItem);
      quizItem = {
        question: parseQuestionLine(line.substring(5)),
        explanation: [],
        answers: [],
        description: [],
      };
      mode = EMode.question;
    }

    if (isAnswer(line)) {
      quizItem && quizItem.answers.push(parseAnswerLine(line));
    }

    if (!isAnswer(line) && !isQuestions(line)) {
      if (mode === EMode.question) quizItem?.explanation.push(line);
      if (mode === EMode.answers && quizItem)
        quizItem.answers[quizItem.answers.length - 1] += "\n" + line;
      if (mode === EMode.answers && line === "") {
        mode = EMode.explanation;
      }
      if (mode === EMode.explanation) quizItem?.explanation.push(line);
    }
  });
  quizItem && quiz.push(quizItem);
  return quiz;
}
