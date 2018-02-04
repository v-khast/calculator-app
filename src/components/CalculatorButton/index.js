import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";


class CalculatorButton extends Component {

    static defaultProps = {
        disabled: false
    };

    render() {
        const { content, onPress, onLongPress, style, disabled } = this.props;
        return (
            <TouchableOpacity style={style} onPress={onPress} onLongPress={onLongPress} disabled={disabled} >
                <Text style={styles.text}>{content}</Text>
            </TouchableOpacity>
        )
    }

}

export default CalculatorButton;