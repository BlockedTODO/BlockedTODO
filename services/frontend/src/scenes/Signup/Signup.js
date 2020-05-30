import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from 'utils/hooks';
import {useLazyQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import SignupLayout from './SignupLayout';

const signupQuery = gql`
    query User($email: String!, $password: String!){
        createUser(authenticationInput: {email: $email, password: $password}) {
            userId
            email
        }
    }
`;

const Signup = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');
    const history = useHistory();

    const onSuccessfulSignup = ({signup}) => {
        history.push('/');
    }
    const [createUser, {loading}] = useLazyQuery(signupQuery, {
        onCompleted: onSuccessfulSignup,
        onError: (e) => setError(e.message)
    });

    const onSubmit = () => {
        createUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <SignupLayout isLoading={loading} emailInput={emailInput} passwordInput={passwordInput} onSubmit={onSubmit} errorMessage={error} />
    );
};

export default Signup;
