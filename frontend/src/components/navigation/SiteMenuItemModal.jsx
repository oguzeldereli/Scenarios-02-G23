/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay, Pressable, useSlottedContext } from "react-aria-components";
import SiteMenuItem from "./SiteMenuItem";
import { useState } from "react";

export default function SiteMenuItemModal({title, children})
{
    const ModalCss = css`
        box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
        border-radius: 6px;
        background: white;
        color: black;
        border: 1px solid #eee;
        outline: none;
        padding: 0.3rem;

        &[data-entering] {
            animation: modal-zoom 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .react-aria-TextField {
            margin-bottom: 8px;
        }

        @keyframes modal-zoom {
            from {
                transform: scale(0.8);
            }

            to {
                transform: scale(1);
            }
        }
    `;

    const ModalOverlayCss = css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0 0 0 / .5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;

        &[data-entering] {
            animation: modal-fade 200ms;
        }

        &[data-exiting] {
            animation: modal-fade 150ms reverse ease-in;
        }

        @keyframes modal-fade {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }
    `;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <SiteMenuItem>
            <Button onPress={() => setIsOpen(true)}>{title}</Button>
            {isOpen && <ModalOverlay css={ModalOverlayCss} isDismissable>
                <Modal isOpen={isOpen} onOpenChange={setIsOpen} css={ModalCss}>
                    <Dialog>
                        {children({isOpen, setIsOpen})}
                    </Dialog>
                </Modal>
            </ModalOverlay>}
        </SiteMenuItem>
    )
}