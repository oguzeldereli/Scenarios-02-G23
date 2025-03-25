/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";


export default function SiteModal({isOpen, setIsOpen, children})
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

    const modalOverlayCss = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0 0 0 / .5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: all;

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
    }`;

    let [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);   

    return(
        <ModalOverlay css={modalOverlayCss} isDismissable>
            <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                css={ModalCss}
            >
                <Dialog>{children({isOpen: isModalOpen, setIsOpen: setIsModalOpen})}</Dialog>
            </Modal>
        </ModalOverlay>
    )
}