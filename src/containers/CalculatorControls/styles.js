import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    controls: {
        flex: 1,
        backgroundColor: "#2c434a",
        padding: ".25%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative"
    },
    box: {
        justifyContent: "center",
        alignItems: "center",
        width: "24.5%",
        margin: ".25%"
    },
    double: {
        width: "49.5%"
    },
    darkGreen: {
        backgroundColor: "#00635a"
    },
    green: {
        backgroundColor: "#008a71"
    }
});

export default styles;
