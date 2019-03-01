import { connect } from 'react-redux';
import Login from 'Pages/Login/Login';
import { setData } from 'Actions/SessionUser';

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (data) => {
            dispatch(setData(data));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Login);