const Modal = ({children, onClose })=>{
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}/>
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                {children}
            </div>
        </div>
    );
};

export default Modal;