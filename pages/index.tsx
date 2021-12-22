import { useState } from "react";
import GoogleMapReact from "google-map-react";

interface OnCLickCoordinate {
  lat: number;
  lng: number;
}

interface SetLatLng {
  x: number;
  y: number;
  lat: number;
  lng: number;
}

export default function Create() {
  const [onClickCoordinate, setOnClickCoordinate] = useState<OnCLickCoordinate>(
    { lat: 35.7022589, lng: 139.7744733 }
  );

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const setLatLng = ({ x, y, lat, lng }: SetLatLng) => {
    setOnClickCoordinate({ lat, lng });
  };

  return (
    <div style={{ height: "300px", width: "300px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        center={onClickCoordinate}
        defaultZoom={16}
        onClick={setLatLng}
      />
    </div>
  );
}
