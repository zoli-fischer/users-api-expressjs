import { connect } from 'react-redux';
import Login from 'Pages/Login/Login';
import { setToken } from 'Actions/SessionUser';

const mapDispatchToProps = (dispatch) => {
    return {
        setUserToken: (authToken) => {
            dispatch(setToken(authToken));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Login);