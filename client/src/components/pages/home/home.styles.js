import styled from 'styled-components';

const StyledTitleContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.625rem;
	align-items: center;
	justify-content: center;
`;

const StyledConnectedMessage = styled.li`
	font-size: 0.5625rem;
	color: green;
	margin-bottom: 0.3125rem;
`

const StyledDisconnectedMessage = styled.li`
	font-size: 0.5625rem;
	color: red;
	margin-bottom: 0.3125rem;
`

const StyledMessage = styled.li`
	margin-bottom: 0.3125rem;
	font-size: 0.6875rem;
`

export { StyledTitleContainer, StyledConnectedMessage, StyledDisconnectedMessage, StyledMessage };
