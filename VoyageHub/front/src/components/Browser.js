import "../layout/browser.scss";
import "../layout/style.scss";
import "../layout/datePicker.css";
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { DateRangePicker } from 'rsuite';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Link, useNavigate } from "react-router-dom";

class Browser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guestButtonClicked: false,
            guestNumberConfirmed: false,
            maxAdultNumber: 20,
            adultNumber: '',
            location: '',
            date: null,
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleButtonClick = (event) => {
        event.preventDefault();
    };

    removePerson = (type, event) => {
        event.preventDefault();

        let currentNumber;
        switch (type) {
            case 'adult':
                currentNumber = this.state.adultNumber;
                break;
            default:
                return;
        }

        if (currentNumber > 0) {
            this.setState({
                [`${type}Number`]: currentNumber - 1,
                guestNumberConfirmed: true,
            });
        }
    }

    addPerson = (type, event) => {
        event.preventDefault();
        let currentNumber;
        switch (type) {
            case 'adult':
                currentNumber = this.state.adultNumber;
                break;
            default:
                return;
        }

        const maxNumber = this.state[`max${type.charAt(0).toUpperCase() + type.slice(1)}Number`];

        if (currentNumber < maxNumber) {
            this.setState({
                [`${type}Number`]: currentNumber + 1,
                guestNumberConfirmed: true,
            });
        }
    }

    handleClickOutside(event) {
        const button = document.querySelector('.browser-guestButton');
        const buttonField = document.querySelector('.browser-guestButtonField');

        if (button && buttonField &&
            !button.contains(event.target) && !buttonField.contains(event.target)) {
            this.setState({
                guestButtonClicked: false,
            });
        }
    }

    confirmGuestNumber = (event) => {
        this.showGuestPickPanel(event);
        this.setState({
            guestNumberConfirmed: true,
        });
    }

    showGuestPickPanel = (event) => {
        this.handleButtonClick(event);
        this.setState(prevState => ({
            guestButtonClicked: !prevState.guestButtonClicked,
        }));
    };

    handleSearch = (event) => {
        event.preventDefault();

        const searchData = {
            location: this.state.location,
            date: this.state.date,
            guests: this.state.adultNumber,
        };

        const navigate = this.props.navigate;
        if (navigate) {
            console.log(this.props.navigate);
            navigate('/list', { state: searchData });
        }
    };

    render() {
        const guestsLabel = `Goście: ${this.state.adultNumber}`;
        const buttonClass = `browser-guestButton w-100 ${this.state.guestButtonClicked ? 'zindex-100' : 'zindex-0'} ${this.state.guestNumberConfirmed ? 'font-black' : ''}`;

        const isHomePage = window.location.pathname === '/';
        const containerClass = isHomePage
            ? "browser d-flex justify-content-center align-items-start position-absolute"
            : "top-70 w-100 browser d-flex justify-content-center align-items-start position-absolute";

        return (
            <form id="browser">
                <Container fluid className={containerClass}>
                    <Row className="d-flex justify-content-center align-items-start w-100">
                        <Col md={12} lg={3}>
                            <InputText
                                className="w-100"
                                placeholder="Miejscowość"
                                value={this.state.location}
                                onChange={(e) => this.setState({ location: e.target.value })}
                            />
                        </Col>

                        <Col md={12} lg={3}>
                            <DateRangePicker
                                className="browser-dataPicker w-100"
                                character={" -"}
                                format={"dd.MM.yyyy"}
                                placeholder="Data zameldowania"
                                value={this.state.date}
                                onChange={(value) => this.setState({ date: value })}
                            />
                        </Col>

                        <Col md={12} lg={3}>
                            <Button className={buttonClass} label={(this.state.guestButtonClicked || this.state.guestNumberConfirmed) ? guestsLabel : "Goście"} onClick={this.showGuestPickPanel} />
                            {this.state.guestButtonClicked && (
                                <div className="browser-guestButtonField shadow-lg ">
                                    <div className="browser-guestElement d-flex justify-content-between align-items-center">
                                        <div className="browser-guestTitle">Goście</div>
                                        <div className="browser-guestNumber d-flex justify-content-start align-items-center">
                                            <Button id="button1" label="-" disabled={this.state.adultNumber === 1 ? true : false} onClick={(event) => this.removePerson('adult', event)} />
                                            <InputNumber
                                                value={this.state.adultNumber}
                                                onValueChange={(event) => this.setState({ adultNumber: event.value })}
                                                mode="decimal"
                                                min={0}
                                                max={this.state.maxAdultNumber}
                                                step={1}
                                                inputMode="numeric"
                                            />
                                            <Button label="+" disabled={this.state.adultNumber === this.state.maxAdultNumber ? true : false} onClick={(event) => this.addPerson('adult', event)} />
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex justify-content-end align-items-center browser-buttonContainer">
                                        <Button label="OK" onClick={this.confirmGuestNumber} />
                                    </div>
                                </div>
                            )}
                        </Col>

                        <Col md={12} lg={2}>
                            <Link to="/list" className='w-100 d-flex justify-content-center align-items-center'>
                                <Button type="submit" label="Szukaj" className="w-100" onClick={this.handleSearch} />
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </form>
        );
    }
}

export default function BrowserWithRouter(props) {
    const navigate = useNavigate();
    return <Browser {...props} navigate={navigate} />;
}