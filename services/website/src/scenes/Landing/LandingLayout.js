import {Logo, Button} from 'components/';
import './Landing.scss';

const LandingLayout = () => (
    <div className='landing'>
        <Logo className='landing-logo' />
        <div className='buttons-container'>
            <a href='https://github.com/apps/blockedtodo' rel='noreferrer' target='_blank'>
                <Button className='link-button' label='Install the GitHub App' />
            </a>
            <a href='https://github.com/BlockedTODO/BlockedTODO#readme' rel='noreferrer' target='_blank'>
                <Button className='link-button' label='More Information' />
            </a>
        </div>
    </div>
);

export default LandingLayout;
