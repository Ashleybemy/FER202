import Button from "react-bootstrap/Button";
import "./Footer.css";

export default function MyFooter({ author, email, linkGithub }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} QuanVM. All rights reserved</p>
      <Button variant="link" href={linkGithub?.url || "#"} target="_blank" rel="noreferrer">
        My Link Github: {linkGithub?.label || "Movies Management Project"}
      </Button>
    </footer>
  );
}
