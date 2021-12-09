import React from "react";
import axios from "axios";
import { Header, Checkbox, Table, Icon , Modal , Button, Tab} from "semantic-ui-react";
import cookie from "js-cookie";
import ReadMoreReact from 'read-more-react';
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";


function AccountPermissions() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = 'http://localhost:3000/api/ProductManage';
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="file outline "/>
        Manage Product
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>School OF</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>
              View
              
              
              </Table.HeaderCell>
         
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission({ user }) {
  const [admin, setAdmin] = React.useState(user.role === "admin");
  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
     updatePermission();
  }, [admin]);

  function handleChangePermission() {
    setAdmin(prevState => !prevState);
  }

  async function updatePermission() {
    const url = 'http://localhost:3000/api/ProductManage';
    const payload = { _id: user._id, role
      : admin ? "Available" : "Unavailable" };
    await axios.put(url, payload);
  }
  const router = useRouter(); 
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell  >{user.name}</Table.Cell>
      <Table.Cell >{user.price}</Table.Cell>
      <Table.Cell >{user.school_of}</Table.Cell>
      <Table.Cell>{admin ? "Available" : "Unavailable"}</Table.Cell>
      <Table.Cell> <Button icon="edit outline"  color="green"    content="view"
        onClick={() => router.push(`/product?_id=${user._id}`)}
      /> 
      </Table.Cell>
    </Table.Row>
  );
}

export default AccountPermissions;
