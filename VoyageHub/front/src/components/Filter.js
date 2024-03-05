
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "../layout/main.scss";
import "../layout/filter.scss";
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Nav, Navbar, Col } from "react-bootstrap";
import { Checkbox } from 'primereact/checkbox';

const Filter = () => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);

    const categories = [
        { title: 'Rozrywka', items: ['Basen', 'Jacuzzi', 'Siłownia', 'Sauna', 'Sala kinowa', 'Boisko'] },
        { title: 'Udogodnienia', items: ['Klimatyzacja', 'Telewizja', 'Konsola', 'Nagłośnienie', 'Gry', 'Portale streamingowe', 'Wi-Fi'] },
        { title: 'Ogród', items: ['Mable ogrodowe', 'Grill', 'Leżaki', 'Ognisko', 'Miejsce na piknik', 'Taras', 'Parking'] },
        { title: 'Pokoje', items: ['Szafa', 'Kanapa', 'Lampy', 'Fotele', 'Wieszaki'] },
        { title: 'Łazienka', items: ['Prysznik', 'Wanna', 'Bidet', 'Pralka', 'Żelazko', 'Ręczniki', 'Kosmetyki'] },
        { title: 'Kuchnia', items: ['Prysznik', 'Ekspres do kawy', 'Mikrofalówka', 'Lodówka', 'Czajnik', 'Kuchenka', 'Piekarnik', 'Toster', 'Zamrażalka'] },
    ];

    const onOptionsChange = (e) => {
        let _options = [...options];

        if (e.checked)
            _options.push(e.value);
        else
            _options.splice(_options.indexOf(e.value), 1);

        setOptions(_options);
    }

    return (
        <section id="filter">
            <Button type="submit" label="Filtry" className="filter-btn" onClick={() => setVisible(true)}>
                <FontAwesomeIcon icon={faFilter} />
            </Button>
            <Dialog className="filter-dialog" header="Wybierz co cie interesuje" visible={visible} onHide={() => setVisible(false)}>
                <Container>
                    <Row>
                        {categories.map((category, index) => (
                            <React.Fragment key={index}>
                                <Col sm={12}>
                                    <h4>{category.title}</h4>
                                </Col>
                                {category.items.map((item, itemIndex) => (
                                    <Col xs={12} sm={6} md={4} xxl={3} className="filter-cb" key={itemIndex}>
                                        <Checkbox inputId={`option${index + 1}_${itemIndex + 1}`} value={item} onChange={onOptionsChange} checked={options.includes(item)} />
                                        <label htmlFor={`option${index + 1}_${itemIndex + 1}`}>{item}</label>
                                    </Col>
                                ))}
                            </React.Fragment>
                        ))}
                        <Col sm={12}>
                            <Button type="submit" label="Filtruj" className="mt-3 w-100">
                                <FontAwesomeIcon icon={faFilter} />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Dialog>
        </section>
    );
};

export default Filter;
