function Navbar({ handleAboutClick, handlePopupClose, showAboutPopup }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                Fuelinator
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about" onClick={handleAboutClick}>
                            About
                        </a>
                    </li>
                </ul>
            </div>

            {showAboutPopup && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">About Fuelinator</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handlePopupClose}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Fuelinator is an application that helps you find prices for
                                    petrol stations in Ireland.
                                </p>
                                <p>
                                    Simply click on the marker to get more information about the
                                    petrol station such as its location and prices.
                                </p>
                                <p>
                                    Created by{" "}
                                    <a href="https://github.com/CianHession">Cian Hession</a>
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={handlePopupClose}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar