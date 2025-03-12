/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router";
import MainContentContainer from "../../components/layout/MainContentContainer";
import SiteNavbar from "../../components/navigation/SiteNavbar";
import { Button, Link, MenuItem } from "react-aria-components";
import SiteMenu from "../../components/navigation/SiteMenu";
import SiteMenuItem from "../../components/navigation/SiteMenuItem";
import { css } from "@emotion/react";
import SiteSidebar from "../../components/navigation/SiteSidebar";

export default function MainLayout()
{
    /// TODO: add layout elements
    return (
        <>
        <SiteNavbar>
            <SiteMenu label="File">
                <SiteMenuItem onAction={() => alert('open')}>New Project</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Open Project</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Save</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Save as</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Export</SiteMenuItem>
            </SiteMenu>
            <SiteMenu label="Edit">
                <SiteMenuItem onAction={() => alert('open')}>Undo</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Redo</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Cut</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Copy</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Paste</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Delete</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Delete All</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Select</SiteMenuItem>
                <SiteMenuItem onAction={() => alert('open')}>Select All</SiteMenuItem>
            </SiteMenu>
        </SiteNavbar>
        <MainContentContainer>
            {/* TODO: Add content to sidebar */}
            <SiteSidebar />
            <Outlet />
        </MainContentContainer>
        </>
    )
}