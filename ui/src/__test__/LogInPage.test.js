const { default: App } = require("../App");
const { default: LogIn } = require("../Components/Login/login");


it("renders without crashing", () => {
    shallow(<App />);
});

it("renders Login page with Title", () => {
    const wrapper = shallow(<LogIn />);
    const LoginPageLabel = <h2>User Log In</h2>;
    expect(wrapper.contains(LoginPageLabel)).toEqual(true);
});

it('Test case checking username textbox', () => {
    let wrapper;
    wrapper = mount(<LogIn />);
    wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'mohitgupta' } });
    expect(wrapper.find('input[type="text"]').getDOMNode().value).toEqual('mohitgupta');
})


