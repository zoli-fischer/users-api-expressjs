import { connect } from 'react-redux';
import Users from 'Pages/Users/Users';
import { clearData } from 'Actions/SessionUser';

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(clearData());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(Users);