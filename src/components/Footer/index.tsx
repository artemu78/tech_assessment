import React from "react";
export const links: [string, string][] = [
  ["questions source", "https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes"],
  ["this app source repository", "https://github.com/artemu78/tech_assessment"],
  ["this app typescript coverage", "https://artemu78.github.io/tech_assessment/coverage-ts/"],
  ["this app test coverage", "https://artemu78.github.io/tech_assessment/coverage/"],
  ["hire/contact me", "https://t.me/artemu78"],
];

const Footer = (): JSX.Element => {
  return (
    <footer style={{ backgroundColor: "lightgrey" }}>
      {links.map((link, index) => {
        return (
          <span key={index + link[1]}>
            <a href={link[1]}>{link[0]}</a>
            {links.length - 1 !== index ? ", " : ""}
          </span>
        );
      })}
    </footer>
  );
};

export default Footer;
