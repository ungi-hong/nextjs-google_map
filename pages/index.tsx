import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { CheckBox } from "components/index";

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
  const [layerTypes, setLayerTypes] = useState<string[]>([]);

  const setLatLng = ({ x, y, lat, lng }: SetLatLng) =>
    setOnClickCoordinate({ lat, lng });

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

  return (
    <>
      <CheckBox onChangeCheckBox={onChangeCheckBox} name="TrafficLayer" />
      <CheckBox onChangeCheckBox={onChangeCheckBox} name="TransitLayer" />

      <div style={{ height: "800px", width: "800px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
          center={onClickCoordinate}
          defaultZoom={18}
          onClick={setLatLng}
          layerTypes={layerTypes}
        />
      </div>
    </>
  );
}
