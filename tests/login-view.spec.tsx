import { rest } from 'msw';
import {setupServer} from 'msw/node';
import LoginView, { backendAddress } from '../components/login-view';
import Employee from '../models/employee';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

const server = setupServer(
    rest.patch<{ user: string, pass: string }, {}>(`${backendAddress}/loginMobile`, (req, res, ctx) => {
    const { user, pass } = req.body;
    const testUsers = [{ user: "Employee", pass: "Employee" }, { user: "Manager", pass: "Manager" }];
    const index = testUsers.findIndex(u => { return u.user === user && u.pass === pass });
    if (index !== 1) {
    return res(ctx.status(404, 'No such user found'));
    };
    const employee: Employee = { id: "test", fname: "Harvey", lname: "Harvey", manages: index ? [] : undefined };
    return res(ctx.json(employee));
    })
);

let managerId:string = "";
const setManagerId = (id:string) => managerId = id;
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("allow a user to log in", async () => {
    const view = render(<LoginView setManagerId={setManagerId}/>);
    const nameInput = view.getByPlaceholderText("username");
    const passInput = view.getByPlaceholderText("password");
    fireEvent.changeText(nameInput, "Manager");
    fireEvent.changeText(passInput, "Manager");
    fireEvent.press(view.getByRole("button"));
    await waitFor(() => {
        expect(managerId).toBe("test");})
});