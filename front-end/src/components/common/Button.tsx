import styled from 'styled-components';

type ButtonProps = {
	variant: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'light';
	children: React.ReactNode;
};

const VARIANTS = {
	primary: 'text-white bg-blue-700 hover:bg-blue-800',
	secondary: '',
	danger: '.text-white .bg-red-700',
	warning: '',
	success: '',
	light: '',
};

const StyledButton = styled.button`
	padding: 1em 2em;
	font-weight: var(--fw-700);
	text-decoration: none;
	border: 0;
	border-radius: 0.5em;
	cursor: pointer;
`;

const Button = ({ variant, children, ...rest }: ButtonProps) => {
	const variantClass = VARIANTS[variant];

	return (
		<StyledButton
			className={variantClass}
			{...rest}>
			{children}
		</StyledButton>
	);
};

export default Button;
