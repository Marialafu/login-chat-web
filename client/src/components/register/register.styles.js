import styled from "styled-components";

const StyledRegisterContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

const StyledRegisterOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const StyledTitle = styled.label`
    margin: 0;
    font-weight: bold;
`

export {StyledRegisterContainer, StyledRegisterOptions, StyledTitle}