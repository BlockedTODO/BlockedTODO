import classNames from 'classnames';
import './Button.scss';

const Button = ({className, label = '', onClick, ...otherProps}) => (
    <button
        className={classNames('button', className)}
        onClick={onClick}
        {...otherProps}
    >
        <span className='label'>{label}</span>
    </button>
);

export default Button;
