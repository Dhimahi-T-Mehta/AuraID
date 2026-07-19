import "../styles/confirmationModal.css";

export default function ConfirmationModal({

    open,

    title,

    message,

    confirmText = "Confirm",

    cancelText = "Cancel",

    danger = false,

    onConfirm,

    onCancel,

}) {

    if (!open) return null;

    return (

        <div className="confirmation-overlay">

            <div className="confirmation-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirmation-actions">

                    <button

                        className="cancel-btn"

                        onClick={onCancel}

                    >

                        {cancelText}

                    </button>

                    <button

                        className={danger ? "danger-btn" : "confirm-btn"}

                        onClick={onConfirm}

                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}