import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyledHeader = styled.div`
    background-color: ${props => props.theme.colors.darkGraffiti};
    min-height: 80px;
    color: #ffffff50;
    font-family: ${props => props.theme.fonts.robotoMono};
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const Title = styled.span`
    font-weight: bold;
    margin: auto 0;
    font-size: 24px;
`;

const Path = styled.span`
    margin: auto 0;
    font-weight: 400;
    font-size: 20px;
`;

const LastOfPath = styled(Path)`
    font-size: 36px;
    line-height: 42px;
    color: white;
`;

interface HeaderProps {
    /**
     * Path to be used instead of the current URL
     */
    pathname?: string;
}

const Header = ({ pathname }: HeaderProps) => {
    const path = pathname ? pathname : useRouter().pathname;

    const capitalize = (str: string) =>
        str
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ');

    /*
     * Array that representes the path name but the slashes are individual
     * elements, not a part of the string of the pathname
     */
    const pathArr = path
        .split('/')
        .map(str => capitalize(str.replace(/-/g, ' ')))
        .reduce((arr: string[], e) => (e ? [...arr, '/', e] : arr), []);

    return (
        <StyledHeader>
            <Title>Open Collab</Title>
            {pathArr.map((text, i) =>
                i === pathArr.length - 1 ? (
                    <LastOfPath className="mx-2" key={i}>
                        {text}
                    </LastOfPath>
                ) : (
                    <Path className="mx-2" key={i}>
                        {text}
                    </Path>
                )
            )}
        </StyledHeader>
    );
};

export default Header;
