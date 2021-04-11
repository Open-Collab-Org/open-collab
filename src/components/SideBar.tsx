import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin: 0;
    width: 227px;
    height: 417px;
    background-color: white;
    border: 2px solid ${props => props.theme.colors.sheetBorder};
    font-family: ${props => props.theme.fonts.roboto};
`;

const ActiveBeforeCSS = css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    content: '';
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
    width: 4px;
`;

const Item = styled.a<{ active?: boolean; disabled?: boolean }>`
    position: relative;
    padding: 8px 19px;
    border-bottom: 1px solid ${props => props.theme.colors.sheetBorder};
    color: ${props => (props.active ? 'white' : 'rgba(0, 0, 0, 0.7)')};
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    background-color: ${props =>
        props.active ? props.theme.colors.primary : 'white'};
    :hover {
        text-decoration: ${props =>
            props.active || props.disabled ? 'none' : 'underline'};
        color: ${props => (props.active ? 'white' : 'rgba(0, 0, 0, 0.7)')};
    }
    ::before {
        ${props => (props.active ? ActiveBeforeCSS : '')}
    }
`;

const Title = styled.span`
    display: block;
    color: ${props => props.theme.colors.grayScale.three};
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;

export interface ISideBarItem {
    /**
     * Props to Next's Link component
     */
    linkProps?: LinkProps;

    /**
     * Shortcut for setting the href inside the linkProps object. If an href
     * is present in the linkProps, the latter will be used
     */
    href?: string;

    /**
     * Display text for this item
     */
    text: string;

    /**
     * If the item is currently active/selected. If more than
     * one item has this attribute set to true, the first one to have it
     * will be the only one considered as active. The active state is controlled
     * by the SideBar component, use this attribute only to initialize with an
     * item pre-selected
     */
    active?: boolean;

    /**
     * Whether or not the item is usable/clickable
     */
    disabled?: boolean;

    /**
     * Click handler for the item. Two params are passed to this callback: the click
     * event and the object of the clicked item, respectively
     */
    onClick?: (
        e: React.MouseEvent<HTMLAnchorElement>,
        item: ISideBarItem
    ) => void;
}

const SideBar = ({ items }: { items: ISideBarItem[] }) => {
    const [active, setActive] = useState<ISideBarItem | null>(
        items.find(item => item.active) || null
    );

    const clickHandler = (
        e: React.MouseEvent<HTMLAnchorElement>,
        item: ISideBarItem
    ) => {
        setActive(item);
        item.onClick && item.onClick(e, item);
    };

    return (
        <Wrapper>
            <Item disabled={true}>
                <Title>Actions</Title>
            </Item>
            {items.map((item, i) => (
                <Link
                    key={i}
                    passHref={!(item.disabled || item === active)}
                    href={item.href || 'javascript:void(0)'}
                    {...item.linkProps}
                >
                    <Item
                        active={JSON.stringify(item) === JSON.stringify(active)}
                        disabled={item.disabled}
                        onClick={e => clickHandler(e, item)}
                    >
                        {item.text}
                    </Item>
                </Link>
            ))}
        </Wrapper>
    );
};

export default SideBar;
