import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div>
      <MyFooter
        author="TraLTB"
        email="traltb@fe.edu.vn"
        linkGithub={{ url: "#", label: "Movie Management Project" }}
      />
    </div>
  );
}
