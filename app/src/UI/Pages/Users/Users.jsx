import React from 'react';

export default function Users(props) {
    return (
        <div className="middle">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h1>Users</h1>
                        <button type="button" onClick={props.onLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
