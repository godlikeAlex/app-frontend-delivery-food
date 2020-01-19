import React, {useState} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import {Button, Modal, Header, Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';


const MapSelector = ({setLocation, location}) => {
    const [geo, setGeo] = useState({
        position: [39.65156597430449, 66.97351455688478],
        fullName: 'Пожалуйста укажите на карте где вы находитесь'
    });
    const {position, fullName} = geo;
    const [open, setOpen] = useState(false);

    const handleClickMap = e => {
        const {lat, lng} = e.latlng;
        fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=eb6a8eca-b3bf-41c2-b304-b9f5b255d3f1&geocode=${lat}, ${lng}&ll=39.654515, 66.968847&sco=latlong`, {
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            setGeo({...geo, fullName: result.response.GeoObjectCollection.featureMember["0"].GeoObject.name, position: [lat, lng], addressLoaded: true});
        });
    };

    const handleLocation = () => {
        setLocation({position, address: fullName});
        localStorage.setItem('location', JSON.stringify({position, address: fullName}));
        setOpen(false);
    }

    const openModal = isopen => setOpen(isopen);

    return (
        <Modal open={open} onClose={() => openModal(false)} trigger={<li onClick={() => openModal(true)}><Icon name='map marker alternate'/> {location.address || 'Выбрать местоположение'}</li>}>
            <Modal.Header>Выберите свое местоположение</Modal.Header>
            <Modal.Content >
            <Map onclick={handleClickMap} style={{width: '100%', height: '500px'}} center={position} zoom={13}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <Marker position={position}>
                </Marker>
            </Map>
            <div className='fullname-address'>
                <Header as='h2'>{fullName}</Header>
            </div>
            <div className='select-btn'>
                <Button positive onClick={handleLocation}>Выбрать местоположение</Button>
            </div>
            </Modal.Content>
        </Modal>
    )
}

const mapStateProps = ({location}) => {
    return {
        location
    }
}

const mapDispatchToProps = displatch => {
    const {setLocation} = bindActionCreators(actions, displatch);

    return {
        setLocation: (payload) => {
            setLocation(payload);
        }
    }
};

export default connect(mapStateProps, mapDispatchToProps)(MapSelector);