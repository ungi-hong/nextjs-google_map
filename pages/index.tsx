import type { NextPage } from "next";
import { useState } from "react";
import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";
import { SearchContent } from "components/index";

interface LatLng {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "400px",
  height: "400px",
};

const TopPage: NextPage = () => {
  // const [layerTypes, setLayerTypes] = useState<string[]>([]);
  const [latLng, setLatLng] = useState<LatLng>({
    lat: 35.7022589,
    lng: 139.7744733,
  });
  const [googleMap, setGoogleMap] = useState<google.maps.Map>(null);
  const [address, setAddress] = useState("");

  const onLoadGoogleMap = (map: google.maps.Map) => {
    setGoogleMap(map);
  };

  const onClickMap = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setLatLng({ lat, lng });

    googleMap.panTo({ lat, lng });
  };

  const onClickSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setLatLng({ lat, lng });
        googleMap.panTo({ lat, lng });
      }
    });
  };

  return (
    <>
      <SearchContent onClickSearch={onClickSearch} setAddress={setAddress} />
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: 35.7022589,
            lng: 139.7744733,
          }}
          zoom={17}
          onClick={onClickMap}
          onLoad={onLoadGoogleMap}
        >
          <Marker position={latLng} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default TopPage;
