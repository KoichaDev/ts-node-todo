import styled from 'styled-components';

type HTMLInputElementType = React.InputHTMLAttributes<HTMLInputElement>;

type InputProps = HTMLInputElementType & {
	variant?: 'light' | 'dark';
};

const StyledInput = styled.input`
	display: block;
	padding: 0.625rem;
	font-size: 0.875rem;
	line-height: 1.25rem;
	border-width: 1px;
	border-radius: 0.5rem;
`;

const VARIANTS = {
	light: '',
	dark: 'bg-gray-700 text-gray-300 text-sm dark:bg-gray-700',
};

const Input = ({ variant = 'dark', ...rest }: InputProps) => {
	const variantClassName = VARIANTS[variant];

	return (
		<StyledInput
			className={variantClassName}
			{...rest}
		/>
	);
};

export default Input;
