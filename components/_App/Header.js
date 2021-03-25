import { Menu,Container ,Image,Icon } from 'semantic-ui-react'
import Link from 'next/link'
import Router,{useRouter} from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header() {
  const router = useRouter()
  const user = true;

function isActivee(route){
  return route ==  router.pathname
}

  return (
    <Menu stackable size="huge" fluid id="menu" inverted>
    <Container children>
    <Link href ="/">
    <Menu.Item header active ={isActivee('/index')}>
            <Image size ="mini" 
            src=""
            style={{ marginRight: '1em'}}/>
               
         One Summary
          </Menu.Item>
        </Link>

        <Link href ="/buy">
        <Menu.Item header active ={isActivee('/buy')}>
          
           Buy Sheet
          </Menu.Item>

        </Link>
        <Link href ="/create">
          <Menu.Item header active ={isActivee('/create')}>
         
           Sell Sheet
          </Menu.Item>
        </Link>

        <Link href ="/cart">
          <Menu.Item header active ={isActivee('/cart')}>
           
           Cart
          </Menu.Item>
        </Link>
        {user ?(<>
        <Link href ="/account">
          
          <Menu.Item position='right'  header active ={isActivee('/account')}>
           <Icon
           name ="user"
           size="large"/>
           Account
          </Menu.Item>
        </Link>

          <Menu.Item   header>
           <Icon
           name ="sign out"
           size="large"/>
           Logout
          </Menu.Item>
        </>)  
        :
        (<>
        
          <Link href ="/login">
          <Menu.Item position='right' header active ={isActivee('/login')}>
           <Icon
           name ="sign in"
           size="large"/>
           Login
          </Menu.Item>
          </Link>

          <Link href ="/signup">
          <Menu.Item  header active ={isActivee('/signup')}>
           <Icon
           name ="signup"
           size="large"/>
           Signup
          </Menu.Item>
          </Link>
</>)}

    </Container>

  </Menu>);
}


export default Header;
