import { Menu,Container ,Image,Icon, Select, } from 'semantic-ui-react'
import Link from 'next/link'
import Router,{useRouter} from 'next/router'
import NProgress from 'nprogress'
import { handleLogout } from "../../utils/auth";
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  console.log(user);
  const router = useRouter();


function isActive(route){
  return route ==  router.pathname
}

  return (
    <Menu stackable size="huge" fluid id="menu" inverted>
    <Container children>
    <Link href ="/">
    <Menu.Item header active ={isActive('/index')}>
            <Image size ="mini" 
            src=""
            style={{ marginRight: '1em'}}/>
               
         One Summary
          </Menu.Item>
        </Link>
        <Link href ="/buy">
        <Menu.Item header active ={isActive('/buy')}>
          
           Buy Sheet
          </Menu.Item>
          
        </Link>
       
          
        
        <Link href ="/create">
          <Menu.Item header active ={isActive('/create')}>
         
           Sell Sheet
          </Menu.Item>
        </Link>

        <Link href ="/cart">
          <Menu.Item header active ={isActive('/cart')}>
           
           Cart
          </Menu.Item>
        </Link>
 {user ? (
          <>
            <Link href="/account">
              <Menu.Item position="right" header active={isActive("/account")}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item  onClick={handleLogout} header>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item position="right" header active={isActive("/login")}>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item  header active={isActive("/signup")}>
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}


export default Header;
