import { IQuizItem, EParsePartition, IAnswer } from "context/types";
import { IQuizCode } from "tools/const";

const QUESTION_PREFIX = "####";
const ANSWER_PREFIX = "- [";
const MD_CODE_BLOCK = "```";

export const getCookie = (cname: string): string => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function setCookie(cname: string, cvalue: IQuizCode, exdays: number | null = null): void {
  let expires = "";
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString();
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const parseQuestionLine = (line: string): string => {
  const parsedArray = line.match(/([q,Q]\d+\.\s)(.*)/);
  if (parsedArray && parsedArray.length === 3) {
    return parsedArray[2];
  }
  return line;
};

const parseAnswerLine = (line: string): string => {
  const parsedArray = line.match(/(\]\s)(.*)/);
  if (parsedArray && parsedArray.length === 3) {
    return parsedArray[2];
  }
  return line;
};

const isAnswerCorrect = (line: string): boolean => {
  const parsedArray = line.match(/(\[\s?x\s?\])/);
  if (parsedArray && parsedArray.length > 1) {
    return true;
  }
  return false;
};

export function parseRawMDFile(lines: string): IQuizItem[] {
  const linesArr = lines.split("\n");
  const quiz: IQuizItem[] = [];
  let quizItem: IQuizItem | null = null;
  let mode = EParsePartition.question;
  let answer: IAnswer | null = null;

  const isMDCodeBlock = (line: string): boolean => line.substring(0, 3) === MD_CODE_BLOCK;
  const isQuestions = (line: string): boolean => line.substring(0, 4) === QUESTION_PREFIX;
  const isAnswer = (line: string): boolean => line.substring(0, 3) === ANSWER_PREFIX;

  linesArr.forEach((rawline, lineindex) => {
    const line = rawline.trim();

    if (isMDCodeBlock(line)) return;

    if (isQuestions(line)) {
      quizItem && answer && quizItem.answers.push({ ...answer });
      answer = null;
      quizItem && quiz.push({ ...quizItem });

      quizItem = {
        question: parseQuestionLine(line.substring(5)),
        explanation: "",
        answers: [],
        description: "",
      };
      mode = EParsePartition.question;
    }

    if (isAnswer(line)) {
      quizItem && answer && quizItem.answers.push({ ...answer });
      answer = {
        text: parseAnswerLine(line),
        description: "",
        isCorrect: isAnswerCorrect(line),
      };
      mode = EParsePartition.answers;
    }

    if (!isAnswer(line) && !isQuestions(line)) {
      if (quizItem && mode === EParsePartition.question) quizItem.explanation += "\n" + line;
      if (mode === EParsePartition.answers && answer) answer.description += line;
      // i don't know how to different question description from last answer description (((
      // if (mode === EParsePartition.answers && line === "") {
      //   mode = EParsePartition.description;
      // }
      if (quizItem && mode === EParsePartition.explanation) quizItem.explanation += "\n" + line;
      if (quizItem && mode === EParsePartition.description) quizItem.description += "\n" + line;
    }
  });
  quizItem && quiz.push(quizItem);
  return quiz;
}
