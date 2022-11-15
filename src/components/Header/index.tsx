import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [anchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("burger menu click");
    setMenuAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleDialogClose = () => {
    console.log("close dialog");
    setModalOpen(false);
  };
  const handleMenuClose = () => {
    console.log("close burger menu");
    setMenuAnchorEl(null);
  };

  const aboutItemClick = () => {
    console.log("open dialog");
    setModalOpen(true);
    setMenuAnchorEl(null);
  };

  console.log({ open, isModalOpen });
  return (
    <header>
      <a href="https://war.ukraine.ua/support-ukraine/" target="_blank" rel="noreferrer">
        <div className={styles.praporBlue} />
        <div className={styles.praporYellow} />
      </a>

      <div className={styles.titleLine}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, p: 2 }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
          data-testid="header_menuButton"
        >
          <MenuIcon />
        </IconButton>
        <h1>Technical Assessment</h1>
      </div>
      <Dialog
        onClose={() => {
          console.log("try to close dialog");
          handleDialogClose();
        }}
        open={isModalOpen}
        data-testid="header_aboutDialog"
      >
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} data-testid="header-closeButton">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={aboutItemClick} data-testid="header_aboutItem">
          About
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
