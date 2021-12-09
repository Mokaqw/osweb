import AccountHeader from "../components/Account/AccountHeader";
import AccountPermissions from "../components/Account/AccountPermissions";
import AccountInventory from "../components/Account/AccountInventory"
import AccountWishlist from "../components/Account/AccountWishlist"
import { parseCookies } from "nookies";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import SheetPermissions  from "../components/Account/SheetPermissions"
import { Header,  Divider  } from "semantic-ui-react";
function Account({ user, orders }) {
  return (
    <><Header as="h2" >
    Account
 </Header>
 <Divider />
      <AccountHeader {...user} />
      {user.role === "user" && <AccountInventory orders={orders} />}
      {user.role === "admin" && <SheetPermissions/>}
      {user.role === "admin" && <AccountPermissions />}
    </>
  );
}
Account.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx);
  if(!token){
    return { orders: [] };
  }
  const payload = {
    headers: { Authorization: token}
  };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  return response.data;
}

export default Account;

