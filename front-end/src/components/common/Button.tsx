import styled from 'styled-components';

type HTMLButtonElementType = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = HTMLButtonElementType & {
	variant: 'default' | 'primary' | 'danger' | 'warning' | 'success';
	children: React.ReactNode;
	onCopy?: React.ClipboardEventHandler<HTMLButtonElement>;
};
const VARIANTS = {
	default: 'bg-transparent',
	primary: 'text-white bg-blue-700 hover:bg-blue-800',
	danger: 'text-white bg-red-700',
	warning: 'text-white bg-yellow-400 hover:bg-yellow-500',
	success: 'bg-green-700 hover:bg-green-800',
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
	let variantClass = VARIANTS[variant];

	if (!variantClass) {
		variantClass = VARIANTS.default;
	}

	return (
		<StyledButton
			className={variantClass}
			{...rest}>
			{children}
		</StyledButton>
	);
};

export default Button;
