import React from 'react'
import {
  GoogleMap,
  useGoogleMap,
  useJsApiLoader,
  StreetViewPanorama
} from "@react-google-maps/api";

import * as THREE from 'three'
import {
    useLoader,
    useFrame,
    useThree,
    Canvas,
} from '@react-three/fiber'

import {PerspectiveCamera} from '@react-three/drei'
console.log(google)
const apiOptions = {
  apiKey: 'YOUR API KEY',
  version: "beta",
  map_ids: ["YOUR MAP ID"]
};

const mapOptions = {
  "tilt": 0,
  "heading": 0,
  "zoom": 18,
  "center": { lat: 35.6594945, lng: 139.6999859 },
  "mapId": "YOUR MAP ID"
}

const APIkey = "AIzaSyBo6m4C52hgW-eRz-UKKh_szXUN6gXHFw"

const center = {
  lat: 37.5247596,
  lng: -122.2583719
};

const style = { height: "600px", width: "400px" }

const max = {width: "100%", height: "100%"}

export default function () {
    return (
      <GoogleMap key={APIkey} center={center} mapContainerStyle={max}>
        <GoogleMapCanvas>
            <mesh>
              <boxGeometry args={[100,100,100]}/>
              <meshBasicMaterial />
            </mesh>
        </GoogleMapCanvas>
        {/*
        <StreetViewPanorama
            position={center as any}
            visible
            linksControl
            addressControl
            motionTracking
            enableCloseButton
            motionTrackingControl
        />
        */}
      </GoogleMap>
    )
}

function GoogleMapCanvas (props: any) {
    const map = useGoogleMap()
    React.useEffect(() => void console.log(map.gl))
    return (
        <Canvas style={max} gl={map.gl}>
          <GoogleMapCamera map={map}/>
          {props.children}
        </Canvas>
    )
}

function GoogleMapCamera (props: any) {
    const {map} = props
    const ref = React.useRef(null as any)
    useFrame(() => {
        const matrix = map.coordinateTransformer?.fromLatLngAltitude(mapOptions.center, 120)
        if (matrix)
            ref.current.projectionMatrix = new THREE.Matrix4().fromArray(matrix)
    })
    return (
        <PerspectiveCamera makeDefault ref={ref} {...props}/>
    )
}
// const view = React.useMemo(() => {
//     const webglOverlayView = new map.WebglOverlayView()
//     webglOverlayView.onDraw = () => {
//         webglOverlayView.requestRedraw();
//     }
//     return webglOverlayView
// }, [map])

// ref
// export default function () {
//     return (
//       <GoogleMap
//         key={APIkey}
//         center={center}>
//         <div style={style}>
//           <StreetViewPanorama
//             position={center as any}
//             visible
//             linksControl
//             addressControl
//             motionTracking
//             enableCloseButton
//             motionTrackingControl
//           />
//         </div>
//       </GoogleMap>
//     );
// }
