import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useInput} from 'utils/hooks';
import {useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import SignupLayout from './SignupLayout';

const signupMutation = gql`
    mutation CreateUser($email: String!, $password: String!){
        createUser(userInput: {email: $email, password: $password}) {
            id
            email
        }
    }
`;

const Signup = () => {
    const emailInput = useInput();
    const passwordInput = useInput();
    const [error, setError] = useState('');
    const history = useHistory();

    const onSuccessfulSignup = (_data) => {
        history.push('/');
    }
    const [createUser, {loading}] = useMutation(signupMutation, {
        onCompleted: onSuccessfulSignup,
        onError: (e) => {setError(e.message); console.dir(e);}
    });

    const onSignup = () => {
        createUser({variables: {email: emailInput.value, password: passwordInput.value}});
    };

    return (
        <SignupLayout isLoading={loading} emailInput={emailInput} passwordInput={passwordInput} onSignup={onSignup} errorMessage={error} />
    );
};

export default Signup;
