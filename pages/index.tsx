import GoogleMapReact from "google-map-react";

export default function Create() {
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const setLatLng = ({ x, y, lat, lng, event }) => {
    console.log(x, y, lat, lng, event);
    console.log(lng);
  };

  return (
    <div style={{ height: "300px", width: "300px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={defaultLatLng}
        defaultZoom={16}
        onClick={setLatLng}
      />
    </div>
  );
}
