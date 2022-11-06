import { useState } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./styles.module.css";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 13,
    backgroundColor: "transparent",
  },
}));

const Header = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((st) => !st);
  };

  return (
    <header>
      <a href="https://war.ukraine.ua/support-ukraine/" target="_blank" rel="noreferrer">
        <div className={styles.praporBlue} />
        <div className={styles.praporYellow} />
      </a>
      <StyledBadge
        badgeContent={<InfoIcon htmlColor="#404040" />}
        color="primary"
        onClick={handleClick}
      >
        <h1>Technical Assessment</h1>
      </StyledBadge>
      <Dialog onClose={handleClick} open={isOpen}>
        <div>
          This is open source technical questions assessment.
          <br />
          <br />
          Choose theme. Answer questions one by one or choose one you feel comfortable with.
          <br />
          You can find your right and wrong answers counted.
          <br />
          <br />
          Questions and answers - are open source community baked{" "}
          <a
            href="https://github.com/ebazhanov/linkedin-skill-assessments-quizzes/"
            target="_blank"
            rel="noreferrer"
          >
            repository
          </a>
          . You see a fresh version every time you load page.
          <br />
          Feel free to{" "}
          <a
            href="https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github"
            target="_blank"
            rel="noreferrer"
          >
            contribute
          </a>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
