import React from "react";
import axios from "axios";
import { Header, Checkbox, Table, Icon , Modal , Button, Tab} from "semantic-ui-react";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";
import formatDate from "../../utils/formatDate";
import {useRouter} from 'next/router';

function AccountPermissions() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = 'http://localhost:3000/api/users';
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
      <Icon name="id badge "/>
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
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

function UserPermission({ user ,_id }) {
  const [modal, setModal] = React.useState(false);
  const [admin, setAdmin] = React.useState(user.role === "admin");
  const isFirstRun = React.useRef(true);
  const router = useRouter();
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
    const url = 'http://localhost:3000/api/account';
    const payload = { _id: user._id, role: admin ? "admin" : "user" };
    await axios.put(url, payload);
  }
  async function handleDelete() {
    const url = 'http://localhost:3000/api/account';
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/buy");
 }

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
}

export default AccountPermissions;
