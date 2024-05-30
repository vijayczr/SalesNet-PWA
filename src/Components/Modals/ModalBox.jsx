function ModalBox({ 
    children,
    modalClassName, 
    modalTitleHeading, 
    secondaryBtnText, 
    primaryBtnText, 
    modalId,
    action,
    uniqueId,
    labelledBy
}) {
  return (
    <div
      className={`${modalClassName} fade`}
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={labelledBy}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {modalTitleHeading}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss={modalClassName}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss={modalClassName}
            >
              {secondaryBtnText}
            </button>
            {
              (primaryBtnText || action) &&
              <button
                type="button"
                data-dismiss={modalClassName}
                aria-label="Close"
                className="btn btn-primary"
                onClick={() => action ? action(uniqueId) : null}
              >
                {primaryBtnText}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
