import Login from '../../pages/Login.jsx'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

//tests for Login Page
describe('Login component', () => {
    it('All components should render properly', () =>{
        render(<Login/>);
    })

    it('Submits the form and stores the values of the email and password', () => {
        render(<Login/>);
        const emailInput = screen.getByPlaceholderText("Email address");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, { target: { value: "testemail@gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "testpassword"}});

        expect(emailInput).toHaveValue("testemail@gmail.com");
        expect(passwordInput).toHaveValue("testpassword")
    })

    it('Disable the submit button if either field is left empty', () => {
        render(<Login/>);
        const submitButton = screen.getByRole('button', { name: "Sign in"});
        
        expect(submitButton).toBeDisabled();

        const emailInput = screen.getByPlaceholderText("Email address");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, { target: { value: "testemail@gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "testpassword"}});
        fireEvent.click(submitButton);

        expect(emailInput).toHaveValue("testemail@gamil.com");
        expect(passwordInput).toHaveValue("testpassword")
    })

    it('Input for email and password should not contain any invalid characters e.g. whitespace', () => {
        render(<Login/>);

        const emailInput = screen.getByPlaceholderText("Email address");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByRole('button', { name: "Sign in"});

        fireEvent.change(emailInput, { target: { value: "testemail @gmail.com" }});
        fireEvent.change(passwordInput, { target: { value: "test password"}});
        fireEvent.click(submitButton);

        expect(emailInput).toBe("testemail@gamil.com");
        expect(passwordInput).toBe("testpassword");
    })
    
    it('Must validate and find the correct user by an email and password', () => {
        const users = new Map([
            ["test@gmail.com", "test"], 
            ["tachorzyad@gmail.com", "fakepassword"], 
            ["randomuser@yahoo.com", "fakepassword2"], 
            ["jest@gmail.com", "totallyArealPassword444"], 
            ["gabenewell@valvesoftware.com", "test"], 
            ["YetAnotherFakeUser@gmail.com", "testtestest"]
        ])

        const userEmail = "bademail@gmail.com";
        const userPassword = "badpassword";
        const sendMockMessage = jest.fn()  
        // const routerPushMock = jest.fn()

        const userExists = users.has(userEmail) && users.get(userEmail) === userPassword;
        
        if(!userExists)
            sendMessageMock("Invalid email or password.")

        expect(sendMockMessage).toHaveBeenCalledWith("Invalid email or password.");
        // expect(routerPushMock).toHaveBeenCalledWith("../../pages/FuelQuote")
    })

    it('Must reroute to FuelQuote page if given a valid email and password', () => {
        const users = new Map([
            ["test@gmail.com", "test"], 
            ["tachorzyad@gmail.com", "fakepassword"], 
            ["randomuser@yahoo.com", "fakepassword2"], 
            ["jest@gmail.com", "totallyArealPassword444"], 
            ["gabenewell@valvesoftware.com", "test"], 
            ["YetAnotherFakeUser@gmail.com", "testtestest"]
        ])

        //valid email and password that's found in map
        const userEmail = "test@gmail.com";
        const userPassword = "test";

        const sendMockMessage = jest.fn()  
        const routerPushMock = jest.fn()

        const userExists = users.has(userEmail) && users.get(userEmail) === userPassword;
        
        if(!userExists)
            sendMessageMock("Invalid email or password.")
        else
            routerPushMock('../../pages/FuelQuote')

        expect(sendMockMessage).toHaveBeenCalledWith("Invalid email or password.");
        expect(routerPushMock).toHaveBeenCalledWith("../../pages/FuelQuote")
    })
})

