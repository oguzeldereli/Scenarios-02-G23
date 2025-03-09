import { Popover, SubmenuTrigger } from "react-aria-components";
import SiteMenuItem from "./SiteMenuItem";

export default function SiteSubmenu({label, children})
{
    return (
        <SubmenuTrigger>
            <SiteMenuItem>{label}</SiteMenuItem>
            <Popover>
                <Menu>
                    {children}
                </Menu>
            </Popover>
        </SubmenuTrigger>
    )
}