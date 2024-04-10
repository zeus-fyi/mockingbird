import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

const GoogleLoginPage = (props: any) => {
    const {loading, handleGoogleLogin} = props;

    if (loading) return (<div></div>)
    return (
        <div className="">
            <div className="">
                <GoogleOAuthProvider
                    clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                >
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}

export default GoogleLoginPage