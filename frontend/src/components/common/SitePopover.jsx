/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from "react-aria-components";

export default function SitePopover({label, children, isDisabled})
{
    const popoverCss = css`
      
        border: 1px solid #0f0f0f;
        box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
        border-radius: 6px;
        background: white;
        color: black;
        outline: none;
        padding: 0.4rem;
        transition: transform 200ms, opacity 200ms;
      
        .react-aria-OverlayArrow svg {
          display: block;
          fill: white;
          stroke: #0f0f0f;
          stroke-width: 1px;
        }
      
        &[data-entering],
        &[data-exiting] {
          transform: var(--origin);
          opacity: 0;
        }
      
        &[data-placement=top] {
          --origin: translateY(8px);
      
          &:has(.react-aria-OverlayArrow) {
            margin-bottom: 6px;
          }
        }
      
        &[data-placement=bottom] {
          --origin: translateY(-8px);
      
          &:has(.react-aria-OverlayArrow) {
            margin-top: 6px;
          }
      
          .react-aria-OverlayArrow svg {
            transform: rotate(180deg);
          }
        }
      
        &[data-placement=right] {
          --origin: translateX(-8px);
      
          &:has(.react-aria-OverlayArrow) {
            margin-left: 6px;
          }
      
          .react-aria-OverlayArrow svg {
            transform: rotate(90deg);
          }
        }
      
        &[data-placement=left] {
          --origin: translateX(8px);
      
          &:has(.react-aria-OverlayArrow) {
            margin-right: 6px;
          }
      
          .react-aria-OverlayArrow svg {
            transform: rotate(-90deg);
          }
        }
      `;

    return (
        <DialogTrigger>
            <Button isDisabled={isDisabled}>{label}</Button>
            <Popover css={popoverCss}>
                <OverlayArrow>
                <svg width={12} height={12} viewBox="0 0 12 12">
                    <path d="M0 0 L6 6 L12 0" />
                </svg>
                </OverlayArrow>
                <Dialog>
                    {children}
                </Dialog>
            </Popover>
        </DialogTrigger>
    )
}