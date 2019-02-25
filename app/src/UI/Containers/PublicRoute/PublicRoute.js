import { connect } from 'react-redux';
import PublicRoute from 'Components/PublicRoute/PublicRoute';

function mapStateToProps(state) {
    return {
        isSessionUser: !!state.sessionUser.token,
    };
};

export default connect(
    mapStateToProps,
)(PublicRoute);
