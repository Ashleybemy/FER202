import { Button, Container } from "react-bootstrap";
import "./Footer.css";

function MyFooter({ author, email, linkGithub }) {
  return (
    <div className="app-footer">
      <Container className="page">
        <p><strong>Author:</strong> {author}</p>
        <p>Created by: {email}</p>
        <p>© {new Date().getFullYear()} {author}. All rights reserved</p>
        <Button variant="link" href={linkGithub} target="_blank" rel="noreferrer">
          My Link Github: Movies Management
        </Button>
      </Container>
    </div>
  );
}
export default MyFooter;
