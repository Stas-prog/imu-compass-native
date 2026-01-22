import { useEffect } from "react";
import { Text, View } from "react-native";
import { updateFusion } from "./core/fusion/madgwick";
import { imuState, initSensors } from "./core/sensors/readSensors";

export default function HomeScreen() {
  useEffect(() => {
    initSensors();

    let last = Date.now();

    const loop = () => {
      const now = Date.now();
      const dt = (now - last) / 1000;
      last = now;

      updateFusion(dt);

      console.log("QUAT:", imuState.quaternion);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>IMU Native Core Running...</Text>
    </View>
  );
}
