import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { CheckBox } from "components/index";

interface LatLng {
  lat: number;
  lng: number;
}

interface SetLatLngArg extends LatLng {
  x: number;
  y: number;
}

export default function Create() {
  const [onClickCoordinate, setOnClickCoordinate] = useState<LatLng>({
    lat: 35.7022589,
    lng: 139.7744733,
  });
  const [layerTypes, setLayerTypes] = useState<string[]>([]);
  const [googleMap, setMap] = useState<google.maps.Map | null>(null);
  const [googleMaps, setMaps] = useState<typeof google.maps | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<google.maps.Marker>(null);

  const moveCenter = (latLng: LatLng) => {
    if (marker) {
      marker.setMap(null);
    }

    setMarker(
      new googleMaps.Marker({
        map: googleMap,
        position: latLng,
      })
    );

    setOnClickCoordinate(latLng);
  };

  const setLatLng = ({ x, y, lat, lng }: SetLatLngArg) => {
    moveCenter({ lat, lng });
  };

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLayerTypes = [...layerTypes];
    if (e.currentTarget.checked) {
      newLayerTypes.push(e.target.name);
    } else {
      const index = newLayerTypes.indexOf(e.target.name);
      newLayerTypes.splice(index, 1);
    }
    setLayerTypes(newLayerTypes);
  };

  const handleApiLoaded = ({
    map,
    maps,
  }: {
    map: google.maps.Map;
    maps: typeof google.maps;
  }) => {
    setMap(map);
    setMaps(maps);

    // https://developers.google.com/maps/documentation/javascript/geocoding
    setGeocoder(new maps.Geocoder());
  };

  const onClickSearch = () => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        console.log(results);

        moveCenter({ lat, lng });
      }
    });
  };

  return (
    <>
      <CheckBox onChangeCheckBox={onChangeCheckBox} name="TrafficLayer" />
      <CheckBox onChangeCheckBox={onChangeCheckBox} name="TransitLayer" />
      <div>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <button type="button" onClick={onClickSearch}>
          Search
        </button>
      </div>

      <div style={{ height: "800px", width: "800px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          center={onClickCoordinate}
          defaultZoom={15}
          onClick={setLatLng}
          layerTypes={layerTypes}
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
    </>
  );
}
