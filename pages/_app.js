import App from "next/app";
import Layout from "../components/_App/Layout";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    } if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const isRoot = user.log ==='root';
        const isADmin = user.log ==='admin';
        const isNotPermitted = !(user) && ctx.pathname === '/create'
        if (isNotPermitted){
          redirectUser(ctx, '/')
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login")
      }
    }

    return { pageProps };

  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
