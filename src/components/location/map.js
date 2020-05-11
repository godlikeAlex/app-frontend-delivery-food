import React, {useCallback, useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import {Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import markerImg from './pin.png'
import { YMaps, Map, GeolocationControl } from 'react-yandex-maps';
let ymaps;

const API = process.env.REACT_APP_YANDEX_KEY;

const MapSelector = props => {  
    const [region, setRegion] = useState({
        center: props.location.position && props.location.position.latitude ? props.location.position : {
            latitude: 39.653173497797304,
            longitude: 66.97555186226964
        },
        zoom: 17
    });

    const [adress, setAdress] = useState(props.location.address && props.location.position && props.location.position.latitude ? props.location.address : 'Укажите ваш адресс...');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []); // eslint-disable-line

    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
            props.openLocation(false);
        }
    }, []); // eslint-disable-line

    const closeMap = (e) => {
        if(e.target.classList.contains('map-container')) {
            props.openLocation(false);
        }
    };

    const changeLocation = ({originalEvent}) => {
        ymaps.geocode && ymaps.geocode(originalEvent.newCenter).then(res => {
            const result = res.geoObjects.get(0).getAddressLine().replace('Узбекистан, Самарканд, ', '');
            setAdress(result);
            setDisabled(false);
            setRegion({zoom: originalEvent.newZoom, center: {latitude: originalEvent.newCenter[0], longitude: originalEvent.newCenter[1]}});
        })
    };

    const saveAdress = () => {
        const selectedPosition = {address: adress, position: region.center}
        props.setLocation(selectedPosition);
        localStorage.setItem('location', JSON.stringify(selectedPosition));
        props.openLocation(false);
    }


    return (
        <div className='map-container' style={{display: 'flex', justifyContent: 'center',  height: ' 100%', alignItems: 'center' }} onClick={closeMap}>
            <YMaps query={{apikey: API}}>
                <Map onActionbegin={() => setDisabled(true)} onBoundschange={changeLocation} modules={['geocode']} onLoad={api => ymaps = api} style={{width: '95%',  height: '650px', background: 'white', borderRadius: '10px', position: 'relative'}} defaultState={{
                    center: [region.center.latitude, region.center.longitude],
                    zoom: region.zoom
                }} >
                    <div className='address_on_map'>{adress}</div>
                    <div className='pin'><img style={{width: '100%', userSelect: 'none'}} src={markerImg} alt="маркер" /></div>
                    <GeolocationControl click={() => console.log('true')} options={{ float: 'left' }} />
                    <Button className='save_adderess_btn' color='orange' onClick={saveAdress} disabled={disabled}>Сохранить адрес</Button>
                </Map>
            </YMaps>
        </div>
    )
}

const mapStateProps = ({location}) => {
    return {
        location
    }
}

const mapDispatchToProps = displatch => {
    const {setLocation, openLocation} = bindActionCreators(actions, displatch);

    return {
        setLocation: (payload) => {
            setLocation(payload);
        },
        openLocation: payload => openLocation(payload)
    }
};

export default connect(mapStateProps, mapDispatchToProps)(MapSelector);