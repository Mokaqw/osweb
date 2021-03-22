import Head from "next/head";
import { Container, Grid} from "semantic-ui-react";
import Footer from "./Footer";
import Header from "./Header";
import HeadContent from "./HeadContent";


function Layout({ children }) {
  return (
    <div style={{backgroundColor: "#FFFAF5"}}>
      <Head>
        <HeadContent />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <title>Onesummary</title>
      </Head>
      <Header />    
    <Container fluid text style={{ paddingTop: "3em" }}   >
        {children}
      </Container>
    </div>
  );
}

export default Layout;
