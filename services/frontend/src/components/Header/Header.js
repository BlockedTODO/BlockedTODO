import React, {useState, useEffect} from 'react';
import {useRestClient} from 'hooks/';
import restClient from 'utils/restClient';
import HeaderLayout from './HeaderLayout';

const Header = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    const {run: getAvatarUrl} = useRestClient({
        deferFn: () => restClient.get('/github/avatar'),
        onResolve: ({data}) => setAvatarUrl(data.avatarUrl),
    });

    useEffect(getAvatarUrl, []);

    return (
        <HeaderLayout avatarUrl={avatarUrl} />
    );
};

export default Header;
