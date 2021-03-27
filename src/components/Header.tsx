import styled from 'styled-components';
import { useRouter } from 'next/router';

const Background = styled.div`
    background-color: ${props => props.theme.colors.darkGraffiti};
`;

const Header = () => {
    const router = useRouter();

    return (
        <Background>This is the header. We are in {router.pathname}</Background>
    );
};

export default Header;
